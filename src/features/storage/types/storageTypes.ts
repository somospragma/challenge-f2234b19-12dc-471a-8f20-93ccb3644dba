export interface UserData {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  role: 'admin' | 'user' | 'guest';
  createdAt: string;
  lastLoginAt: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notificationsEnabled: boolean;
  newsletterSubscribed: boolean;
}

export interface AppPreferences {
  sidebarCollapsed: boolean;
  viewMode: 'grid' | 'list';
  itemsPerPage: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  filters: Record<string, unknown>;
  recentSearches: string[];
  bookmarks: string[];
}

export interface SessionData {
  sessionId: string;
  userId: string;
  token: string;
  expiresAt: number;
  ipAddress?: string;
  userAgent?: string;
  lastActivityAt: string;
}

export interface CachedData<T = unknown> {
  key: string;
  value: T;
  timestamp: number;
  expiresAt?: number;
}

export interface StorageItem<T = unknown> {
  key: string;
  value: T;
  metadata?: {
    createdAt: number;
    updatedAt: number;
    expiresAt?: number;
  };
}

export type StorageMechanism = 'localStorage' | 'sessionStorage' | 'cookie' | 'indexedDB';

export interface StorageOptions {
  encrypt?: boolean;
  compress?: boolean;
  expiresIn?: number;
  namespace?: string;
}

export interface StorageResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: StorageError;
}

export interface StorageError {
  code: string;
  message: string;
  mechanism?: StorageMechanism;
}

export interface IndexedDBConfig {
  databaseName: string;
  version: number;
  stores: IndexedDBStore[];
}

export interface IndexedDBStore {
  name: string;
  keyPath: string;
  indexes?: IndexedDBIndex[];
}

export interface IndexedDBIndex {
  name: string;
  keyPath: string;
  unique?: boolean;
  multiEntry?: boolean;
}

export interface TransactionBounds {
  storeName: string;
  mode: IDBTransactionMode;
}

export interface QueryOptions {
  indexName?: string;
  range?: IDBValidKey | IDBKeyRange;
  direction?: IDBCursorDirection;
  limit?: number;
}

export interface StorageService {
  get<T>(key: string): Promise<StorageResult<T>>;
  set<T>(key: string, value: T, options?: StorageOptions): Promise<StorageResult>;
  remove(key: string): Promise<StorageResult>;
  clear(): Promise<StorageResult>;
  keys(): Promise<StorageResult<string[]>>;
}

export interface StorageHookResult<T> {
  data: T | null;
  isLoading: boolean;
  error: StorageError | null;
  setData: (value: T | ((prev: T | null) => T)) => Promise<void>;
  removeData: () => Promise<void>;
  refresh: () => Promise<void>;
}