import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { sessionStorageService } from '../services/sessionStorageService';

const TEST_KEY = 'session_test_key';
const TEST_VALUE = { sessionId: 'abc123', user: 'testUser', timestamp: Date.now() };

describe('sessionStorageService', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    sessionStorage.clear();
    vi.restoreAllMocks();
  });

  describe('setItem', () => {
    it('debería guardar un valor string en sessionStorage', async () => {
      const result = await sessionStorageService.setItem(TEST_KEY, 'session string');
      expect(result).toBe(true);
      expect(sessionStorage.getItem(TEST_KEY)).toBe('"session string"');
    });

    it('debería guardar un objeto JSON en sessionStorage', async () => {
      const result = await sessionStorageService.setItem(TEST_KEY, TEST_VALUE);
      expect(result).toBe(true);
      const stored = sessionStorage.getItem(TEST_KEY);
      expect(stored).toBe(JSON.stringify(TEST_VALUE));
    });

    it('debería guardar un número en sessionStorage', async () => {
      const result = await sessionStorageService.setItem(TEST_KEY, 100);
      expect(result).toBe(true);
      expect(sessionStorage.getItem(TEST_KEY)).toBe('100');
    });

    it('debería guardar un boolean en sessionStorage', async () => {
      const result = await sessionStorageService.setItem(TEST_KEY, false);
      expect(result).toBe(true);
      expect(sessionStorage.getItem(TEST_KEY)).toBe('false');
    });

    it('debería guardar null correctamente', async () => {
      const result = await sessionStorageService.setItem(TEST_KEY, null);
      expect(result).toBe(true);
      expect(sessionStorage.getItem(TEST_KEY)).toBe('null');
    });

    it('debería guardar undefined correctamente', async () => {
      const result = await sessionStorageService.setItem(TEST_KEY, undefined);
      expect(result).toBe(true);
      expect(sessionStorage.getItem(TEST_KEY)).toBeUndefined();
    });

    it('debería sobrescribir un valor existente', async () => {
      await sessionStorageService.setItem(TEST_KEY, 'original');
      const result = await sessionStorageService.setItem(TEST_KEY, 'updated');
      expect(result).toBe(true);
      expect(sessionStorage.getItem(TEST_KEY)).toBe('"updated"');
    });
  });

  describe('getItem', () => {
    it('debería recuperar un valor string guardado', async () => {
      await sessionStorageService.setItem(TEST_KEY, 'retrieved value');
      const result = await sessionStorageService.getItem(TEST_KEY);
      expect(result).toBe('retrieved value');
    });

    it('debería recuperar un objeto JSON guardado', async () => {
      await sessionStorageService.setItem(TEST_KEY, TEST_VALUE);
      const result = await sessionStorageService.getItem(TEST_KEY);
      expect(result).toEqual(TEST_VALUE);
    });

    it('debería retornar null para una clave inexistente', async () => {
      const result = await sessionStorageService.getItem('nonexistent_key');
      expect(result).toBeNull();
    });

    it('debería manejar datos corruptos gracefully', async () => {
      sessionStorage.setItem(TEST_KEY, '{broken json');
      const result = await sessionStorageService.getItem(TEST_KEY);
      expect(result).toBeNull();
    });

    it('debería manejar valores primitivos guardados directamente', async () => {
      sessionStorage.setItem(TEST_KEY, 'plain string');
      const result = await sessionStorageService.getItem(TEST_KEY);
      expect(result).toBe('plain string');
    });
  });

  describe('removeItem', () => {
    it('debería eliminar un valor existente', async () => {
      await sessionStorageService.setItem(TEST_KEY, 'temporary data');
      const result = await sessionStorageService.removeItem(TEST_KEY);
      expect(result).toBe(true);
      expect(sessionStorage.getItem(TEST_KEY)).toBeNull();
    });

    it('debería retornar true al intentar eliminar una clave inexistente', async () => {
      const result = await sessionStorageService.removeItem('nonexistent');
      expect(result).toBe(true);
    });
  });

  describe('clear', () => {
    it('debería limpiar todos los elementos del sessionStorage', async () => {
      await sessionStorageService.setItem('session1', 'data1');
      await sessionStorageService.setItem('session2', 'data2');
      await sessionStorageService.setItem('session3', 'data3');
      const result = await sessionStorageService.clear();
      expect(result).toBe(true);
      expect(sessionStorage.length).toBe(0);
    });

    it('debería retornar true incluso si no hay elementos', async () => {
      const result = await sessionStorageService.clear();
      expect(result).toBe(true);
    });
  });

  describe('getAllKeys', () => {
    it('debería retornar todas las claves almacenadas', async () => {
      await sessionStorageService.setItem('keyA', 'valueA');
      await sessionStorageService.setItem('keyB', 'valueB');
      const keys = sessionStorageService.getAllKeys();
      expect(keys).toContain('keyA');
      expect(keys).toContain('keyB');
    });

    it('debería retornar array vacío si no hay elementos', async () => {
      const keys = sessionStorageService.getAllKeys();
      expect(keys).toEqual([]);
    });
  });

  describe('hasItem', () => {
    it('debería retornar true para una clave existente', async () => {
      await sessionStorageService.setItem(TEST_KEY, 'value');
      const result = await sessionStorageService.hasItem(TEST_KEY);
      expect(result).toBe(true);
    });

    it('debería retornar false para una clave inexistente', async () => {
      const result = await sessionStorageService.hasItem('nonexistent');
      expect(result).toBe(false);
    });
  });

  describe('persistencia', () => {
    it('los datos deberían persistir en la misma pestaña', async () => {
      await sessionStorageService.setItem(TEST_KEY, 'persistent data');
      const result = await sessionStorageService.getItem(TEST_KEY);
      expect(result).toBe('persistent data');
    });
  });
} )