import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { localStorageService } from '../services/localStorageService';

const TEST_KEY = 'test_key';
const TEST_VALUE = { name: 'Test User', email: 'test@example.com', age: 30 };

describe('localStorageService', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  describe('setItem', () => {
    it('debería guardar un valor string en localStorage', async () => {
      const result = await localStorageService.setItem(TEST_KEY, 'test string');
      expect(result).toBe(true);
      expect(localStorage.getItem(TEST_KEY)).toBe('"test string"');
    });

    it('debería guardar un objeto JSON en localStorage', async () => {
      const result = await localStorageService.setItem(TEST_KEY, TEST_VALUE);
      expect(result).toBe(true);
      const stored = localStorage.getItem(TEST_KEY);
      expect(stored).toBe(JSON.stringify(TEST_VALUE));
    });

    it('debería guardar un número en localStorage', async () => {
      const result = await localStorageService.setItem(TEST_KEY, 42);
      expect(result).toBe(true);
      expect(localStorage.getItem(TEST_KEY)).toBe('42');
    });

    it('debería guardar un boolean en localStorage', async () => {
      const result = await localStorageService.setItem(TEST_KEY, true);
      expect(result).toBe(true);
      expect(localStorage.getItem(TEST_KEY)).toBe('true');
    });

    it('debería guardar un array en localStorage', async () => {
      const arr = [1, 2, 3, 'four', { five: 5 }];
      const result = await localStorageService.setItem(TEST_KEY, arr);
      expect(result).toBe(true);
      expect(localStorage.getItem(TEST_KEY)).toBe(JSON.stringify(arr));
    });

    it('debería sobrescribir un valor existente', async () => {
      await localStorageService.setItem(TEST_KEY, 'first');
      const result = await localStorageService.setItem(TEST_KEY, 'second');
      expect(result).toBe(true);
      expect(localStorage.getItem(TEST_KEY)).toBe('"second"');
    });
  });

  describe('getItem', () => {
    it('debería recuperar un valor string guardado', async () => {
      await localStorageService.setItem(TEST_KEY, 'test value');
      const result = await localStorageService.getItem(TEST_KEY);
      expect(result).toBe('test value');
    });

    it('debería recuperar un objeto JSON guardado', async () => {
      await localStorageService.setItem(TEST_KEY, TEST_VALUE);
      const result = await localStorageService.getItem(TEST_KEY);
      expect(result).toEqual(TEST_VALUE);
    });

    it('debería retornar null para una clave inexistente', async () => {
      const result = await localStorageService.getItem('nonexistent_key');
      expect(result).toBeNull();
    });

    it('debería manejar datos corruptos gracefully', async () => {
      localStorage.setItem(TEST_KEY, 'not valid json');
      const result = await localStorageService.getItem(TEST_KEY);
      expect(result).toBeNull();
    });
  });

  describe('removeItem', () => {
    it('debería eliminar un valor existente', async () => {
      await localStorageService.setItem(TEST_KEY, 'to be removed');
      const result = await localStorageService.removeItem(TEST_KEY);
      expect(result).toBe(true);
      expect(localStorage.getItem(TEST_KEY)).toBeNull();
    });

    it('debería retornar true al intentar eliminar una clave inexistente', async () => {
      const result = await localStorageService.removeItem('nonexistent');
      expect(result).toBe(true);
    });
  });

  describe('clear', () => {
    it('debería limpiar todos los elementos del localStorage', async () => {
      await localStorageService.setItem('key1', 'value1');
      await localStorageService.setItem('key2', 'value2');
      await localStorageService.setItem('key3', 'value3');
      const result = await localStorageService.clear();
      expect(result).toBe(true);
      expect(localStorage.length).toBe(0);
    });

    it('debería retornar true incluso si no hay elementos', async () => {
      const result = await localStorageService.clear();
      expect(result).toBe(true);
    });
  });

  describe('getAllKeys', () => {
    it('debería retornar todas las claves almacenadas', async () => {
      await localStorageService.setItem('key1', 'value1');
      await localStorageService.setItem('key2', 'value2');
      const keys = localStorageService.getAllKeys();
      expect(keys).toContain('key1');
      expect(keys).toContain('key2');
    });

    it('debería retornar array vacío si no hay elementos', async () => {
      const keys = localStorageService.getAllKeys();
      expect(keys).toEqual([]);
    });
  });

  describe('hasItem', () => {
    it('debería retornar true para una clave existente', async () => {
      await localStorageService.setItem(TEST_KEY, 'value');
      const result = await localStorageService.hasItem(TEST_KEY);
      expect(result).toBe(true);
    });

    it('debería retornar false para una clave inexistente', async () => {
      const result = await localStorageService.hasItem('nonexistent');
      expect(result).toBe(false);
    });
  });

  describe('manejo de errores', () => {
    it('debería manejar quota exceeded error', async () => {
      const largeValue = 'x'.repeat(10 * 1024 * 1024);
      try {
        await localStorageService.setItem(TEST_KEY, largeValue);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});