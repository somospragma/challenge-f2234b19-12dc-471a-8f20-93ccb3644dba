import React, { useState, useCallback, useEffect } from 'react';
import { StorageService } from './types/storageTypes';
import { localStorageService } from './services/localStorageService';
import { sessionStorageService } from './services/sessionStorageService';
import { cookieService } from './services/cookieService';
import { indexedDBService } from './services/indexedDBService';
import { useStorage } from './hooks/useStorage';

interface StorageManagerProps {
  onError?: (error: Error) => void;
  onDataChange?: (key: string, value: unknown) => void;
}

export const StorageManager: React.FC<StorageManagerProps> = ({ onError, onDataChange }) => {
  const [activeStorage, setActiveStorage] = useState<'local' | 'session' | 'cookie' | 'indexedDB'>('local');
  const [storedKeys, setStoredKeys] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { getItem, setItem, removeItem, clear } = useStorage(activeStorage);

  const getService = useCallback((): StorageService => {
    switch (activeStorage) {
      case 'local':
        return localStorageService;
      case 'session':
        return sessionStorageService;
      case 'cookie':
        return cookieService;
      case 'indexedDB':
        return indexedDBService;
      default:
        return localStorageService;
    }
  }, [activeStorage]);

  const loadKeys = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const service = getService();
      if (activeStorage === 'indexedDB') {
        const keys = await indexedDBService.getAllKeys();
        setStoredKeys(keys);
      } else {
        const keys = service.getAllKeys ? service.getAllKeys() : [];
        setStoredKeys(Array.isArray(keys) ? keys : []);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido al cargar claves';
      setError(errorMessage);
      onError?.(err instanceof Error ? err : new Error(errorMessage));
    } finally {
      setIsLoading(false);
    }
  }, [activeStorage, getService, onError]);

  useEffect(() => {
    loadKeys();
  }, [loadKeys]);

  const handleSetItem = useCallback(async (key: string, value: unknown): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const service = getService();
      const success = await service.setItem(key, value);
      if (success) {
        onDataChange?.(key, value);
        await loadKeys();
      }
      return success;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al guardar datos';
      setError(errorMessage);
      onError?.(err instanceof Error ? err : new Error(errorMessage));
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [getService, loadKeys, onError, onDataChange]);

  const handleGetItem = useCallback(async (key: string): Promise<unknown> => {
    setIsLoading(true);
    setError(null);
    try {
      const service = getService();
      const value = await service.getItem(key);
      return value;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al recuperar datos';
      setError(errorMessage);
      onError?.(err instanceof Error ? err : new Error(errorMessage));
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [getService, onError]);

  const handleRemoveItem = useCallback(async (key: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const service = getService();
      const success = await service.removeItem(key);
      if (success) {
        await loadKeys();
      }
      return success;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar datos';
      setError(errorMessage);
      onError?.(err instanceof Error ? err : new Error(errorMessage));
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [getService, loadKeys, onError]);

  const handleClear = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const service = getService();
      const success = await service.clear();
      if (success) {
        setStoredKeys([]);
      }
      return success;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al limpiar almacenamiento';
      setError(errorMessage);
      onError?.(err instanceof Error ? err : new Error(errorMessage));
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [getService, onError]);

  const switchStorage = useCallback((storage: 'local' | 'session' | 'cookie' | 'indexedDB') => {
    setActiveStorage(storage);
    setError(null);
  }, []);

  return {
    activeStorage,
    storedKeys,
    isLoading,
    error,
    setItem: handleSetItem,
    getItem: handleGetItem,
    removeItem: handleRemoveItem,
    clear: handleClear,
    switchStorage,
    refreshKeys: loadKeys,
  };
};

export type { StorageManagerProps };