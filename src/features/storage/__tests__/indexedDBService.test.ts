import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { IndexedDBService } from '../services/indexedDBService';

const DB_NAME = 'testStorageDB';
const STORE_NAME = 'testStore';
const DB_VERSION = 1;

describe('IndexedDBService', () => {
  let dbService: IndexedDBService;

  beforeEach(async () => {
    dbService = new IndexedDBService(DB_NAME, DB_VERSION);
    await dbService.init();
    await dbService.clear(STORE_NAME);
  });

  afterEach(async () => {
    await dbService.close();
    const databases = await indexedDB.databases();
    for (const db of databases) {
      if (db.name === DB_NAME) {
        indexedDB.deleteDatabase(DB_NAME);
      }
    }
  });

  describe('init', () => {
    it('debe inicializar la base de datos correctamente', async () => {
      expect(dbService['db']).toBeDefined();
    });

    it('debe crear la base de datos con la versión especificada', async () => {
      const databases = await indexedDB.databases();
      const db = databases.find(d => d.name === DB_NAME);
      expect(db?.version).toBe(DB_VERSION);
    });
  });

  describe('save', () => {
    it('debe guardar un objeto simple', async () => {
      const data = { id: '1', name: 'Test Item', value: 100 };
      await dbService.save(STORE_NAME, data);
      const result = await dbService.get(STORE_NAME, '1');
      expect(result).toEqual(data);
    });

    it('debe guardar un objeto anidado', async () => {
      const data = {
        id: '2',
        user: { name: 'John', email: 'john@test.com' },
        preferences: { theme: 'dark', notifications: true }
      };
      await dbService.save(STORE_NAME, data);
      const result = await dbService.get(STORE_NAME, '2');
      expect(result).toEqual(data);
    });

    it('debe guardar un array', async () => {
      const data = { id: '3', items: [1, 2, 3, 4, 5] };
      await dbService.save(STORE_NAME, data);
      const result = await dbService.get(STORE_NAME, '3');
      expect(result).toEqual(data);
    });

    it('debe sobrescribir un objeto existente', async () => {
      await dbService.save(STORE_NAME, { id: '4', value: 'original' });
      await dbService.save(STORE_NAME, { id: '4', value: 'updated' });
      const result = await dbService.get(STORE_NAME, '4');
      expect(result?.value).toBe('updated');
    });

    it('debe manejar objetos con fechas', async () => {
      const now = new Date();
      const data = { id: '5', createdAt: now, name: 'Date Test' };
      await dbService.save(STORE_NAME, data);
      const result = await dbService.get(STORE_NAME, '5');
      expect(result?.createdAt).toBeInstanceOf(Date);
    });
  });

  describe('get', () => {
    it('debe recuperar un objeto existente', async () => {
      const data = { id: '10', name: 'Retrieve Test' };
      await dbService.save(STORE_NAME, data);
      const result = await dbService.get(STORE_NAME, '10');
      expect(result).toEqual(data);
    });

    it('debe retornar null para id inexistente', async () => {
      const result = await dbService.get(STORE_NAME, 'nonExistent');
      expect(result).toBeNull();
    });
  });

  describe('getAll', () => {
    it('debe retornar todos los objetos del store', async () => {
      await dbService.save(STORE_NAME, { id: 'a', value: 1 });
      await dbService.save(STORE_NAME, { id: 'b', value: 2 });
      await dbService.save(STORE_NAME, { id: 'c', value: 3 });
      const results = await dbService.getAll(STORE_NAME);
      expect(results).toHaveLength(3);
    });

    it('debe retornar array vacío si no hay datos', async () => {
      const results = await dbService.getAll(STORE_NAME);
      expect(results).toEqual([]);
    });

    it('debe mantener el orden de inserción', async () => {
      await dbService.save(STORE_NAME, { id: '1', order: 1 });
      await dbService.save(STORE_NAME, { id: '2', order: 2 });
      await dbService.save(STORE_NAME, { id: '3', order: 3 });
      const results = await dbService.getAll(STORE_NAME);
      expect(results[0]?.order).toBe(1);
      expect(results[1]?.order).toBe(2);
      expect(results[2]?.order).toBe(3);
    });
  });

  describe('remove', () => {
    it('debe eliminar un objeto existente', async () => {
      await dbService.save(STORE_NAME, { id: '20', name: 'To Remove' });
      await dbService.remove(STORE_NAME, '20');
      const result = await dbService.get(STORE_NAME, '20');
      expect(result).toBeNull();
    });

    it('debe manejar eliminación de id inexistente sin error', async () => {
      await expect(dbService.remove(STORE_NAME, 'nonExistent')).resolves.not.toThrow();
    });
  });

  describe('clear', () => {
    it('debe eliminar todos los objetos del store', async () => {
      await dbService.save(STORE_NAME, { id: '1', data: 'a' });
      await dbService.save(STORE_NAME, { id: '2', data: 'b' });
      await dbService.save(STORE_NAME, { id: '3', data: 'c' });
      await dbService.clear(STORE_NAME);
      const results = await dbService.getAll(STORE_NAME);
      expect(results).toHaveLength(0);
    });
  });

  describe('query', () => {
    beforeEach(async () => {
      await dbService.save(STORE_NAME, { id: '1', category: 'A', score: 90 });
      await dbService.save(STORE_NAME, { id: '2', category: 'B', score: 75 });
      await dbService.save(STORE_NAME, { id: '3', category: 'A', score: 85 });
      await dbService.save(STORE_NAME, { id: '4', category: 'C', score: 95 });
    });

    it('debe filtrar por índice', async () => {
      const results = await dbService.query(STORE_NAME, 'category', 'A');
      expect(results).toHaveLength(2);
      results.forEach(item => {
        expect(item.category).toBe('A');
      });
    });

    it('debe retornar array vacío cuando no hay coincidencias', async () => {
      const results = await dbService.query(STORE_NAME, 'category', 'NonExistent');
      expect(results).toEqual([]);
    });
  });
});