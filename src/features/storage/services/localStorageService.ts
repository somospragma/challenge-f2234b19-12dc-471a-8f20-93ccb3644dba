import { StorageService } from './storageTypes';

export class LocalStorageService implements StorageService {
  private prefix: string;

  constructor(prefix: string = 'app_') {
    this.prefix = prefix;
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  save<T>(key: string, value: T): boolean {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(this.getKey(key), serialized);
      return true;
    } catch (error) {
      console.error(`[LocalStorage] Error saving key "${key}":`, error);
      return false;
    }
  }

  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(this.getKey(key));
      if (item === null) {
        return null;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`[LocalStorage] Error getting key "${key}":`, error);
      return null;
    }
  }

  remove(key: string): boolean {
    try {
      localStorage.removeItem(this.getKey(key));
      return true;
    } catch (error) {
      console.error(`[LocalStorage] Error removing key "${key}":`, error);
      return false;
    }
  }

  clear(): boolean {
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.prefix)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
      return true;
    } catch (error) {
      console.error('[LocalStorage] Error clearing storage:', error);
      return false;
    }
  }

  hasKey(key: string): boolean {
    return localStorage.getItem(this.getKey(key)) !== null;
  }

  getAllKeys(): string[] {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.prefix)) {
        keys.push(key.replace(this.prefix, ''));
      }
    }
    return keys;
  }

  getSize(): number {
    let size = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key);
        if (value) {
          size += key.length + value.length;
        }
      }
    }
    return size;
  }
}

export const localStorageService = new LocalStorageService();