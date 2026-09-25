# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Implementación de almacenamiento de datos en navegadores**.

| | |
|---|---|
| Tema | Guardado de la data en los diferentes navegadores |
| Nivel | senior-l2 |
| Chapter | Frontend |
| Especialidad | React |
| Stack | TypeScript 5.7 / React 19 |
| Patron arquitectonico | patrón contenedor/presentacional con servicios especializados por mecanismo de almacenamiento |
| Tiempo estimado | 8 horas |

## Receta del stack

Esqueleto obligatorio:

- `package.json, vite.config.ts y tsconfig.json en la raiz`
- `src/main.tsx como entry point`
- `src/app con el arbol de rutas`
- `src/features con componentes contenedores y sus hooks`
- `src/shared con componentes presentacionales`
- `src/services con los clientes HTTP`

Trampas conocidas:

- No inventes versiones de npm: una version inexistente hace fallar `npm install` con ETARGET. `@types/react-router-dom` ya no se publica para v6+, React Router trae sus tipos.
- El `package.json` tiene que ser JSON valido y UNICO: nada despues de la llave de cierre.

Dependencias:

- react 19.0.0-rc.0
- react-dom 19.0.0-rc.0
- @types/react n/a
- @types/react-dom n/a
- typescript 5.7.0-dev.20240807
- vite 5.3.1
- @vitejs/plugin-react 4.3.1
- vitest 1.6.0
- @testing-library/react 15.0.7
- @testing-library/jest-dom 6.4.6
- jsdom 24.1.0

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Corre `npm install && npm run build` y mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `npm install && npm run build` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Configuración del entorno y almacenamiento básico**: Proyecto React con funcionalidad de almacenamiento en Local Storage.
- **Fase 2 — Ampliación del almacenamiento con Session Storage y Cookies**: Proyecto React con funcionalidades de almacenamiento en Local Storage, Session Storage y Cookies.
- **Fase 3 — Integración de IndexedDB y gestión de datos complejos**: Proyecto React con funcionalidades de almacenamiento en Local Storage, Session Storage, Cookies e IndexedDB, y gestión de la interacción entre ellos.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Lo que falta y tenes que completar

### 1. Referencias colgando (9)

Salieron de un analisis estatico del codigo que SI esta en el repo. Cada una rompe la compilacion:

- [ ] `src/features/storage/__tests__/cookieService.test.ts` — `CookieService.save`
      Se invoca `save` sobre `CookieService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/features/storage/__tests__/cookieService.test.ts` — `CookieService.get`
      Se invoca `get` sobre `CookieService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/features/storage/__tests__/cookieService.test.ts` — `CookieService.getAll`
      Se invoca `getAll` sobre `CookieService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/features/storage/__tests__/indexedDBService.test.ts` — `IndexedDBService.init`
      Se invoca `init` sobre `IndexedDBService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/features/storage/__tests__/indexedDBService.test.ts` — `IndexedDBService.save`
      Se invoca `save` sobre `IndexedDBService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/features/storage/__tests__/indexedDBService.test.ts` — `IndexedDBService.get`
      Se invoca `get` sobre `IndexedDBService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/features/storage/__tests__/indexedDBService.test.ts` — `IndexedDBService.getAll`
      Se invoca `getAll` sobre `IndexedDBService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/features/storage/__tests__/indexedDBService.test.ts` — `IndexedDBService.query`
      Se invoca `query` sobre `IndexedDBService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `package.json` — `typescript@5.7.0-dev.20240807`
      typescript declara la version 5.7.0-dev.20240807, pero el registry de npm respondio que esa version no existe. Es una version inventada: reemplazala por una version publicada real, o si no se conoce con certeza, usa el mecanismo centralizado del ecosistema (BOM/parent/platform/version catalog) y no declares una version individual.

### Presentes (20)

- `package.json`
- `vite.config.ts`
- `tsconfig.json`
- `src/main.tsx`
- `src/app/App.tsx`
- `index.html`
- `src/features/storage/services/localStorageService.ts`
- `src/features/storage/services/sessionStorageService.ts`
- `src/features/storage/services/cookieService.ts`
- `src/features/storage/types/storageTypes.ts`
- `src/features/storage/services/indexedDBService.ts`
- `src/features/storage/hooks/useStorage.ts`
- `src/features/storage/StorageManager.tsx`
- `src/features/storage/__tests__/localStorageService.test.ts`
- `src/features/storage/__tests__/sessionStorageService.test.ts`
- `src/features/storage/__tests__/cookieService.test.ts`
- `src/features/storage/__tests__/indexedDBService.test.ts`
- `src/features/storage/__tests__/useStorage.test.ts`
- `src/shared/utils/storageUtils.ts`
- `src/shared/components/StorageDisplay.tsx`

### Capas del patron declarado

Cada una tiene que existir como directorio real con al menos un archivo. Codigo plano en la raiz no satisface el patron.

- `src`
- `src/app`
- `src/features`
- `src/features/storage`
- `src/features/storage/services`
- `src/features/storage/hooks`
- `src/features/storage/types`
- `src/shared`
- `src/shared/components`
- `src/shared/utils`

## Verificacion

```bash
npm install && npm run build
```

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- El patron es **patrón contenedor/presentacional con servicios especializados por mecanismo de almacenamiento**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Perfil: Chapter Frontend, Especialidad Desarrollador, Tecnología React, Senior
- Brecha que el reto ataca: Aplica de manera conciente el guardado de la data en los diferentes navegadores usando Local storage, Session storage, Cookies, indexedDB, BD
- Mision: Candidato con experiencia en desarrollo Frontend con React

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
