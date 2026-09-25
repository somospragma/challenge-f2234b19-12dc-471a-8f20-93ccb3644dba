import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useStorage } from '../hooks/useStorage';

const createLocalStorageMock = () => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: vi.fn((key: string) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
    get length() { return Object.keys(store).length; },
    key: vi.fn((i: number) => Object.keys(store)[i] || null),
  };
};

describe('useStorage Hook', () => {
  let localStorageMock: ReturnType<typeof createLocalStorageMock>;

  beforeEach(() => {
    localStorageMock = createLocalStorageMock();
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    localStorageMock.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('inicialización', () => {
    it('debe inicializar con valor por defecto cuando storage está vacío', () => {
      const { result } = renderHook(() => 
        useStorage('testKey', 'defaultValue', 'localStorage')
      );
      expect(result.current[0]).toBe('defaultValue');
    });

    it('debe inicializar con valor del storage cuando existe', () => {
      localStorageMock.getItem.mockReturnValueOnce('"storedValue"');
      const { result } = renderHook(() => 
        useStorage('testKey', 'defaultValue', 'localStorage')
      );
      expect(result.current[0]).toBe('storedValue');
    });

    it('debe aceptar diferentes tipos de datos', () => {
      localStorageMock.getItem.mockReturnValueOnce('{"name":"test"}');
      const { result: objectResult } = renderHook(() => 
        useStorage('objectKey', { name: 'default' }, 'localStorage')
      );
      expect(objectResult.current[0]).toEqual({ name: 'test' });
    });
  });

  describe('setValue', () => {
    it('debe actualizar el valor en storage', async () => {
      const { result } = renderHook(() => 
        useStorage('updateKey', 'initial', 'localStorage')
      );
      
      act(() => {
        result.current[1]('updated');
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'updateKey',
        '"updated"'
      );
    });

    it('debe actualizar el estado correctamente', async () => {
      const { result } = renderHook(() => 
        useStorage('stateKey', 'initial', 'localStorage')
      );
      
      act(() => {
        result.current[1]('newValue');
      });

      await waitFor(() => {
        expect(result.current[0]).toBe('newValue');
      });
    });

    it('debe manejar objetos correctamente', async () => {
      const { result } = renderHook(() => 
        useStorage('objectKey', { a: 1 }, 'localStorage')
      );
      
      act(() => {
        result.current[1]({ b: 2 });
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'objectKey',
        '{"b":2}'
      );
    });

    it('debe manejar arrays correctamente', async () => {
      const { result } = renderHook(() => 
        useStorage('arrayKey', [], 'localStorage')
      );
      
      act(() => {
        result.current[1]([1, 2, 3]);
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'arrayKey',
        '[1,2,3]'
      );
    });
  });

  describe('removeValue', () => {
    it('debe eliminar el valor del storage', () => {
      const { result } = renderHook(() => 
        useStorage('removeKey', 'value', 'localStorage')
      );
      
      act(() => {
        result.current[2]();
      });

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('removeKey');
    });

    it('debe restablecer el valor por defecto tras eliminar', async () => {
      const { result } = renderHook(() => 
        useStorage('resetKey', 'default', 'localStorage')
      );
      
      act(() => {
        result.current[1]('stored');
      });

      act(() => {
        result.current[2]();
      });

      await waitFor(() => {
        expect(result.current[0]).toBe('default');
      });
    });
  });

  describe('mecanismos de almacenamiento', () => {
    it('debe usar localStorage por defecto', () => {
      renderHook(() => useStorage('key', 'value'));
      expect(localStorageMock.getItem).toHaveBeenCalled();
    });

    it('debe usar sessionStorage cuando se especifica', () => {
      const sessionStorageMock = createLocalStorageMock();
      Object.defineProperty(window, 'sessionStorage', { value: sessionStorageMock });
      
      renderHook(() => useStorage('key', 'value', 'sessionStorage'));
      expect(sessionStorageMock.getItem).toHaveBeenCalled();
    });
  });

  describe('manejo de errores', () => {
    it('debe manejar errores de parseo JSON', () => {
      localStorageMock.getItem.mockReturnValueOnce('invalid-json');
      const { result } = renderHook(() => 
        useStorage('corruptKey', 'default', 'localStorage')
      );
      expect(result.current[0]).toBe('default');
    });

    it('debe manejar errores de quota excedida', async () => {
      localStorageMock.setItem.mockImplementationOnce(() => {
        throw new Error('QuotaExceededError');
      });

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const { result } = renderHook(() => 
        useStorage('quotaKey', 'value', 'localStorage')
      );

      act(() => {
        result.current[1]('newValue');
      });

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('sincronización entre componentes', () => {
    it('debe compartir estado entre múltiples instancias', async () => {
      const { result: result1 } = renderHook(() => 
        useStorage('sharedKey', 'initial', 'localStorage')
      );
      
      const { result: result2 } = renderHook(() => 
        useStorage('sharedKey', 'initial', 'localStorage')
      );

      act(() => {
        result1.current[1]('updatedFromFirst');
      });

      await waitFor(() => {
        expect(result2.current[0]).toBe('updatedFromFirst');
      });
    });
  });

  describe('tipado', () => {
    it('debe mantener el tipo correcto con generic', () => {
      const { result } = renderHook(() => 
        useStorage<number>('numberKey', 0, 'localStorage')
      );
      
      act(() => {
        result.current[1](42);
      });

      expect(result.current[0]).toBe(42);
    });

    it('debe manejar tipos opcionales correctamente', () => {
      const { result } = renderHook(() => 
        useStorage<string | null>('nullableKey', null, 'localStorage')
      );
      
      expect(result.current[0]).toBeNull();

      act(() => {
        result.current[1]('value');
      });

      expect(result.current[0]).toBe('value');
    });
  });
});