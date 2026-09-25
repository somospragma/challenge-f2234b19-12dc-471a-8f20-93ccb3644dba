import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { CookieService } from '../services/cookieService';

describe('CookieService', () => {
  let cookieService: CookieService;

  beforeEach(() => {
    cookieService = new CookieService();
    document.cookie = '';
  });

  afterEach(() => {
    const cookies = document.cookie.split(';');
    cookies.forEach(cookie => {
      const cookieName = cookie.split('=')[0].trim();
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    });
  });

  describe('save', () => {
    it('debe guardar una cookie básica sin caducidad', () => {
      cookieService.save('testCookie', 'testValue');
      expect(document.cookie).toContain('testCookie=testValue');
    });

    it('debe guardar una cookie con caducidad en días', () => {
      cookieService.save('persistentCookie', 'value', { days: 7 });
      const cookieMatch = document.cookie.match(/persistentCookie=value/);
      expect(cookieMatch).not.toBeNull();
    });

    it('debe guardar una cookie con opciones adicionales', () => {
      cookieService.save('secureCookie', 'secureValue', { 
        days: 1, 
        secure: true, 
        sameSite: 'Strict' 
      });
      expect(document.cookie).toContain('secureCookie=secureValue');
    });

    it('debe actualizar una cookie existente', () => {
      cookieService.save('existingCookie', 'oldValue');
      cookieService.save('existingCookie', 'newValue');
      expect(document.cookie).toContain('existingCookie=newValue');
      expect(document.cookie).not.toContain('existingCookie=oldValue');
    });

    it('debe guardar valores con caracteres especiales', () => {
      const specialValue = 'value=with;specialchars';
      cookieService.save('specialCookie', specialValue);
      expect(document.cookie).toContain('specialCookie=');
    });
  });

  describe('get', () => {
    it('debe recuperar una cookie existente', () => {
      document.cookie = 'existingCookie=existingValue';
      const result = cookieService.get('existingCookie');
      expect(result).toBe('existingValue');
    });

    it('debe retornar null para cookie inexistente', () => {
      const result = cookieService.get('nonExistentCookie');
      expect(result).toBeNull();
    });

    it('debe retornar null para cookie expirada', () => {
      document.cookie = 'expiredCookie=someValue; expires=Thu, 01 Jan 1970 00:00:00 UTC';
      const result = cookieService.get('expiredCookie');
      expect(result).toBeNull();
    });

    it('debe manejar múltiples cookies y retornar la correcta', () => {
      document.cookie = 'cookie1=value1';
      document.cookie = 'cookie2=value2';
      document.cookie = 'cookie3=value3';
      expect(cookieService.get('cookie2')).toBe('value2');
      expect(cookieService.get('cookie1')).toBe('value1');
    });
  });

  describe('remove', () => {
    it('debe eliminar una cookie existente', () => {
      document.cookie = 'toRemove=testValue';
      cookieService.remove('toRemove');
      expect(cookieService.get('toRemove')).toBeNull();
    });

    it('debe eliminar una cookie con opciones específicas', () => {
      document.cookie = 'secureCookie=secureValue; path=/; secure; SameSite=Strict';
      cookieService.remove('secureCookie', { secure: true, sameSite: 'Strict' });
      expect(cookieService.get('secureCookie')).toBeNull();
    });

    it('no debe lanzar error al eliminar cookie inexistente', () => {
      expect(() => cookieService.remove('nonExistent')).not.toThrow();
    });
  });

  describe('getAll', () => {
    it('debe retornar todas las cookies como objeto', () => {
      document.cookie = 'cookieA=valueA';
      document.cookie = 'cookieB=valueB';
      const cookies = cookieService.getAll();
      expect(cookies).toHaveProperty('cookieA', 'valueA');
      expect(cookies).toHaveProperty('cookieB', 'valueB');
    });

    it('debe retornar objeto vacío cuando no hay cookies', () => {
      const cookies = cookieService.getAll();
      expect(Object.keys(cookies).length).toBe(0);
    });

    it('debe decodificar valores codificados', () => {
      document.cookie = 'encodedCookie=' + encodeURIComponent('value with spaces');
      const cookies = cookieService.getAll();
      expect(cookies['encodedCookie']).toBe('value with spaces');
    });
  });

  describe('clear', () => {
    it('debe eliminar todas las cookies', () => {
      document.cookie = 'cookie1=value1';
      document.cookie = 'cookie2=value2';
      document.cookie = 'cookie3=value3';
      cookieService.clear();
      const cookies = cookieService.getAll();
      expect(Object.keys(cookies).length).toBe(0);
    });
  });
});