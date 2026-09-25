import type {
  StorageService,
  StorageResult,
  StorageOptions,
  StorageError,
  IndexedDBConfig,
  TransactionBounds,
  QueryOptions,
} from '../types/storageTypes';

const DEFAULT_CONFIG: IndexedDBConfig = {
  databaseName: 'BrowserStorageManager',
  version: 1,
  stores: [
    { name: 'userData', keyPath: 'id', indexes: [{ name: 'email', keyPath: 'email', unique: true }] },
    { name: 'appPreferences', keyPath: 'key' },
    { name: 'sessionData', keyPath: 'sessionId' },
    { name: 'cache', keyPath: 'key', indexes: [{ name: 'expiresAt', keyPath: 'expiresAt' }] },
  ],
};

class IndexedDBService implements StorageService {
  private db: IDBDatabase | null = null;
  private config: IndexedDBConfig;
  private initPromise: Promise<IDBDatabase> | null = null;

  constructor(config: Partial<IndexedDBConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.initialize();
  }

  private initialize(): void {
    if (this.initPromise) return;

    this.initPromise = new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        reject(new Error('IndexedDB no está disponible en este entorno'));
        return;
      }

      const request = window.indexedDB.open(this.config.databaseName, this.config.version);

      request.onerror = () => {
        reject(new Error(`Error al abrir IndexedDB: ${request.error?.message}`));
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        this.config.stores.forEach((storeConfig) => {
          if (!db.objectStoreNames.contains(storeConfig.name)) {
            const store = db.createObjectStore(storeConfig.name, { keyPath: storeConfig.keyPath });

            storeConfig.indexes?.forEach((index) => {
              store.createIndex(index.name, index.keyPath, {
                unique: index.unique ?? false,
                multiEntry: index.multiEntry ?? false,
              });
            });
          }
        });
      };
    });
  }

  private async getDatabase(): Promise<IDBDatabase> {
    if (this.db) return this.db;
    return this.initPromise!;
  }

  private createError(code: string, message: string): StorageError {
    return { code, message, mechanism: 'indexedDB' };
  }

  private wrapTransaction<T>(bounds: TransactionBounds, operation: (store: IDBObjectStore) => IDBRequest<T>): Promise<StorageResult<T>> {
    return new Promise(async (resolve) => {
      try {
        const db = await this.getDatabase();
        const transaction = db.transaction(bounds.storeName, bounds.mode);
        const store = transaction.objectStore(bounds.storeName);
        const request = operation(store);

        request.onsuccess = () => {
          resolve({ success: true, data: request.result });
        };

        request.onerror = () => {
          resolve({
            success: false,
            error: this.createError('TRANSACTION_ERROR', request.error?.message ?? 'Error en la transacción'),
          });
        };
      } catch (err) {
        resolve({
          success: false,
          error: this.createError('INIT_ERROR', err instanceof Error ? err.message : 'Error desconocido'),
        });
      }
    });
  }

  async get<T>(key: string): Promise<StorageResult<T>> {
    return this.wrapTransaction<T>(
      { storeName: 'cache', mode: 'readonly' },
      (store) => store.get(key)
    );
  }

  async set<T>(key: string, value: T, options?: StorageOptions): Promise<StorageResult> {
    const now = Date.now();
    const item = {
      key,
      value,
      timestamp: now,
      expiresAt: options?.expiresIn ? now + options.expiresIn : undefined,
    };

    return this.wrapTransaction(
      { storeName: 'cache', mode: 'readwrite' },
      (store) => store.put(item)
    );
  }

  async remove(key: string): Promise<StorageResult> {
    return this.wrapTransaction(
      { storeName: 'cache', mode: 'readwrite' },
      (store) => store.delete(key)
    );
  }

  async clear(): Promise<StorageResult> {
    return this.wrapTransaction(
      { storeName: 'cache', mode: 'readwrite' },
      (store) => store.clear()
    );
  }

  async keys(): Promise<StorageResult<string[]>> {
    return this.wrapTransaction<string[]>(
      { storeName: 'cache', mode: 'readonly' },
      (store) => store.getAllKeys()
    );
  }

  async query<T>(storeName: string, options: QueryOptions = {}): Promise<StorageResult<T[]>> {
    return new Promise(async (resolve) => {
      try {
        const db = await this.getDatabase();
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);

        let request: IDBRequest<T[]>;

        if (options.indexName && options.range) {
          const index = store.index(options.indexName);
          request = index.getAll(options.range, options.limit);
        } else {
          request = store.getAll();
        }

        request.onsuccess = () => {
          resolve({ success: true, data: request.result });
        };

        request.onerror = () => {
          resolve({
            success: false,
            error: this.createError('QUERY_ERROR', request.error?.message ?? 'Error al consultar'),
          });
        };
      } catch (err) {
        resolve({
          success: false,
          error: this.createError('QUERY_ERROR', err instanceof Error ? err.message : 'Error desconocido'),
        });
      }
    });
  }

  async put<T>(storeName: string, key: string | IDBValidKey, value: T): Promise<StorageResult> {
    return this.wrapTransaction(
      { storeName, mode: 'readwrite' },
      (store) => store.put({ ...value, [storeName === 'userData' ? 'id' : 'key']: key } as IDBValidKey)
    );
  }

  async delete(storeName: string, key: string | IDBValidKey): Promise<StorageResult> {
    return this.wrapTransaction(
      { storeName, mode: 'readwrite' },
      (store) => store.delete(key)
    );
  }

  async getByStore<T>(storeName: string, key: string | IDBValidKey): Promise<StorageResult<T>> {
    return this.wrapTransaction<T>(
      { storeName, mode: 'readonly' },
      (store) => store.get(key)
    );
  }

  async getAllFromStore<T>(storeName: string): Promise<StorageResult<T[]>> {
    return this.wrapTransaction<T[]>(
      { storeName, mode: 'readonly' },
      (store) => store.getAll()
    );
  }

  async clearExpired(): Promise<StorageResult<number>> {
    return new Promise(async (resolve) => {
      try {
        const db = await this.getDatabase();
        const transaction = db.transaction('cache', 'readwrite');
        const store = transaction.objectStore('cache');
        const index = store.index('expiresAt');
        const now = Date.now();
        const range = IDBKeyRange.upperBound(now);
        const request = index.getAllKeys(range);

        request.onsuccess = () => {
          const expiredKeys = request.result;
          let deletedCount = 0;

          expiredKeys.forEach((key) => {
            const deleteRequest = store.delete(key);
            deleteRequest.onsuccess = () => {
              deletedCount++;
            };
          });

          resolve({ success: true, data: deletedCount });
        };

        request.onerror = () => {
          resolve({
            success: false,
            error: this.createError('CLEAR_EXPIRED_ERROR', request.error?.message ?? 'Error al limpiar'),
          });
        };
      } catch (err) {
        resolve({
          success: false,
          error: this.createError('CLEAR_EXPIRED_ERROR', err instanceof Error ? err.message : 'Error desconocido'),
        });
      }
    });
  }

  async close(): Promise<void> {
    if (this.db) {
      this.db.close();
      this.db = null;
      this.initPromise = null;
    }
  }
}

export const indexedDBService = new IndexedDBService();
export default IndexedDBService;