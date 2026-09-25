import { useState, useEffect, useCallback, useRef } from 'react';
import type { StorageMechanism, StorageOptions, StorageResult, StorageService, StorageHookResult, StorageError } from '../types/storageTypes';
import { localStorageService } from '../services/localStorageService';
import { sessionStorageService } from '../services/sessionStorageService';
import { cookieService } from '../services/cookieService';
import { indexedDBService } from '../services/indexedDBService';

const services: Record<StorageMechanism, StorageService> = {
  localStorage: localStorageService,
  sessionStorage: sessionStorageService,
  cookie: cookieService,
  indexedDB: indexedDBService,
};

interface UseStorageConfig {
  mechanism?: StorageMechanism;
  defaultValue?: unknown;
  options?: StorageOptions;
  syncAcrossTabs?: boolean;
  autoRefresh?: boolean;
}

function getService(mechanism: StorageMechanism): StorageService {
  const service = services[mechanism];
  if (!service) {
    throw new Error(`Mecanismo de almacenamiento no soportado: ${mechanism}`);
  }
  return service;
}

function createStorageError(code: string, message: string, mechanism?: StorageMechanism): StorageError {
  return { code, message, mechanism };
}

export function useStorage<T>(key: string, config: UseStorageConfig = {}): StorageHookResult<T> {
  const {
    mechanism = 'localStorage',
    defaultValue,
    options = {},
    syncAcrossTabs = false,
    autoRefresh = false,
  } = config;

  const [data, setDataState] = useState<T | null>(() => {
    if (defaultValue !== undefined) return defaultValue as T;
    return null;
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<StorageError | null>(null);
  const serviceRef = useRef<StorageService>(getService(mechanism));
  const keyRef = useRef(key);
  const optionsRef = useRef(options);

  keyRef.current = key;
  optionsRef.current = options;

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result: StorageResult<T> = await serviceRef.current.get<T>(keyRef.current);

      if (result.success) {
        setDataState(result.data ?? null);
      } else if (result.error) {
        setError(result.error);
        if (defaultValue !== undefined) {
          setDataState(defaultValue as T);
        }
      }
    } catch (err) {
      const error = createStorageError(
        'LOAD_ERROR',
        err instanceof Error ? err.message : 'Error desconocido al cargar datos',
        mechanism
      );
      setError(error);
      if (defaultValue !== undefined) {
        setDataState(defaultValue as T);
      }
    } finally {
      setIsLoading(false);
    }
  }, [defaultValue, mechanism]);

  const setData = useCallback(async (value: T | ((prev: T | null) => T)) => {
    setError(null);

    try {
      const finalValue = typeof value === 'function'
        ? (value as (prev: T | null) => T)(data)
        : value;

      const result: StorageResult = await serviceRef.current.set(
        keyRef.current,
        finalValue,
        optionsRef.current
      );

      if (result.success) {
        setDataState(finalValue);
      } else if (result.error) {
        setError(result.error);
      }
    } catch (err) {
      const error = createStorageError(
        'SET_ERROR',
        err instanceof Error ? err.message : 'Error desconocido al guardar datos',
        mechanism
      );
      setError(error);
    }
  }, [data, mechanism]);

  const removeData = useCallback(async () => {
    setError(null);

    try {
      const result: StorageResult = await serviceRef.current.remove(keyRef.current);

      if (result.success) {
        setDataState(null);
      } else if (result.error) {
        setError(result.error);
      }
    } catch (err) {
      const error = createStorageError(
        'REMOVE_ERROR',
        err instanceof Error ? err.message : 'Error desconocido al eliminar datos',
        mechanism
      );
      setError(error);
    }
  }, [mechanism]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (!syncAcrossTabs || mechanism !== 'localStorage') return;

    const handleStorage = (event: StorageEvent) => {
      if (event.key === keyRef.current) {
        if (event.newValue) {
          try {
            const parsed = JSON.parse(event.newValue);
            setDataState(parsed);
          } catch {
            setDataState(event.newValue as T);
          }
        } else {
          setDataState(null);
        }
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [syncAcrossTabs, mechanism]);

  useEffect(() => {
    if (!autoRefresh || mechanism !== 'indexedDB') return;

    const intervalId = setInterval(loadData, 5000);
    return () => clearInterval(intervalId);
  }, [autoRefresh, loadData, mechanism]);

  return {
    data,
    isLoading,
    error,
    setData,
    removeData,
    refresh: loadData,
  };
}

export function useMultipleStorage<T extends Record<string, unknown>>(
  keys: (keyof T)[],
  config: UseStorageConfig = {}
): { [K in keyof T]: StorageHookResult<T[K]> } {
  const result = {} as { [K in keyof T]: StorageHookResult<T[K]> };

  keys.forEach((key) => {
    result[key] = useStorage<T[keyof T]>(key as string, config);
  });

  return result;
}

export function useStorageSync(
  keys: string[],
  mechanism: StorageMechanism = 'localStorage'
): { sync: () => Promise<void>; isSyncing: boolean } {
  const [isSyncing, setIsSyncing] = useState(false);
  const service = getService(mechanism);

  const sync = useCallback(async () => {
    setIsSyncing(true);

    try {
      const allKeysResult = await service.keys();

      if (!allKeysResult.success || !allKeysResult.data) {
        setIsSyncing(false);
        return;
      }

      const keysToSync = keys.filter(k => allKeysResult.data!.includes(k));

      await Promise.all(
        keysToSync.map(async (key) => {
          const valueResult = await service.get(key);
          if (valueResult.success && valueResult.data !== undefined) {
            const otherMechanism = mechanism === 'localStorage' ? 'sessionStorage' : 'localStorage';
            const otherService = getService(otherMechanism);
            await otherService.set(key, valueResult.data);
          }
        })
      );
    } finally {
      setIsSyncing(false);
    }
  }, [keys, mechanism, service]);

  return { sync, isSyncing };
}

export function useClearExpired(mechanism: StorageMechanism = 'indexedDB'): {
  clear: () => Promise<number>;
  isClearing: boolean;
} {
  const [isClearing, setIsClearing] = useState(false);
  const service = getService(mechanism);

  const clear = useCallback(async (): Promise<number> => {
    setIsClearing(true);

    try {
      if (mechanism === 'indexedDB' && 'clearExpired' in service) {
        const result = await (service as { clearExpired: () => Promise<StorageResult<number>> }).clearExpired();
        return result.success ? result.data ?? 0 : 0;
      }
      return 0;
    } finally {
      setIsClearing(false);
    }
  }, [mechanism, service]);

  return { clear, isClearing };
}

export default useStorage;