# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener un ZIP con el proyecto completo y arrancable.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `src/features/storage/__tests__/cookieService.test.ts` — `CookieService.save`: Se invoca `save` sobre `CookieService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/features/storage/__tests__/cookieService.test.ts` — `CookieService.get`: Se invoca `get` sobre `CookieService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/features/storage/__tests__/cookieService.test.ts` — `CookieService.getAll`: Se invoca `getAll` sobre `CookieService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/features/storage/__tests__/indexedDBService.test.ts` — `IndexedDBService.init`: Se invoca `init` sobre `IndexedDBService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/features/storage/__tests__/indexedDBService.test.ts` — `IndexedDBService.save`: Se invoca `save` sobre `IndexedDBService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/features/storage/__tests__/indexedDBService.test.ts` — `IndexedDBService.get`: Se invoca `get` sobre `IndexedDBService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/features/storage/__tests__/indexedDBService.test.ts` — `IndexedDBService.getAll`: Se invoca `getAll` sobre `IndexedDBService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/features/storage/__tests__/indexedDBService.test.ts` — `IndexedDBService.query`: Se invoca `query` sobre `IndexedDBService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `package.json` — `typescript@5.7.0-dev.20240807`: typescript declara la version 5.7.0-dev.20240807, pero el registry de npm respondio que esa version no existe. Es una version inventada: reemplazala por una version publicada real, o si no se conoce con certeza, usa el mecanismo centralizado del ecosistema (BOM/parent/platform/version catalog) y no declares una version individual.

## Como saber que terminaste

```bash
npm install && npm run build
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología React, Senior

### Brecha de conocimiento
Aplica de manera conciente el guardado de la data en los diferentes navegadores usando Local storage, Session storage, Cookies, indexedDB, BD

### Misión / candidato
Candidato con experiencia en desarrollo Frontend con React

### Reto
- Tema: Guardado de la data en los diferentes navegadores
- Seniority: senior-l2
- Tipo: practical
- Título: Implementación de almacenamiento de datos en navegadores
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración del entorno y almacenamiento básico — objetivo: Configurar el entorno de desarrollo y crear una funcionalidad básica de almacenamiento de datos usando Local Storage. — entregable (NO resolver): Proyecto React con funcionalidad de almacenamiento en Local Storage.
- Fase 2: Ampliación del almacenamiento con Session Storage y Cookies — objetivo: Ampliar la funcionalidad para incluir el almacenamiento de datos en Session Storage y Cookies. — entregable (NO resolver): Proyecto React con funcionalidades de almacenamiento en Local Storage, Session Storage y Cookies.
- Fase 3: Integración de IndexedDB y gestión de datos complejos — objetivo: Integrar IndexedDB para el almacenamiento de datos complejos y gestionar la interacción entre los diferentes mecanismos de almacenamiento. — entregable (NO resolver): Proyecto React con funcionalidades de almacenamiento en Local Storage, Session Storage, Cookies e IndexedDB, y gestión de la interacción entre ellos.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (ZIP).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Exportación en ZIP
Empaqueta todos los archivos en un único archivo ZIP descargable respetando exactamente
la estructura de rutas indicada por los marcadores.
El ZIP debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: El ZIP debe estar listo para descargar al finalizar. No preguntes si el usuario
quiere generarlo. Simplemente genera el archivo y proporciona el enlace de descarga; No debes desplegar en el chat el resumen de lo que arreglaste al Zip, solo entregalo.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del enlace de descarga del ZIP
No preguntes si el usuario quiere el ZIP: simplemente generalo siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: package.json ===
{
  "name": "browser-storage-manager",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:watch": "vitest watch",
    "lint": "eslint . --ext ts,tsx",
    "format": "prettier --write ."
  },
  "dependencies": {
    "react": "19.0.0-rc.0",
    "react-dom": "19.0.0-rc.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "typescript": "5.7.0-dev.20240807",
    "vite": "^5.3.1",
    "vitest": "^1.6.0",
    "@testing-library/react": "^15.0.7",
    "@testing-library/jest-dom": "^6.4.6",
    "jsdom": "^24.1.0",
    "eslint": "^8.57.0",
    "eslint-plugin-react": "^7.34.2",
    "eslint-plugin-react-hooks": "^4.6.2",
    "eslint-plugin-react-refresh": "^0.4.7",
    "prettier": "^3.3.2"
  },
  "eslintConfig": {
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended"
    ],
    "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "rules": {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off"
    },
    "settings": {
      "react": {
        "version": "detect"
      }
    }
  },
  "prettier": {
    "semi": true,
    "singleQuote": false,
    "tabWidth": 2,
    "trailingComma": "es5"
  }
}

// === ARCHIVO: vite.config.ts ===
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// Configuración de Vite para el proyecto React con TypeScript
// Incluye soporte para JSX, alias de rutas y configuración de testing
// para integración con Vitest

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: 'react',
      babel: {
        presets: ['@babel/preset-typescript'],
        plugins: [['@babel/plugin-transform-typescript', { isTSX: true }]]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
      '@shared': fileURLToPath(new URL('./src/shared', import.meta.url))
    }
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/**/*.test.tsx', 'src/setupTests.ts']
    }
  }
});

// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "jsx": "react-jsx",
    "moduleResolution": "node",
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@features/*": ["src/features/*"],
      "@shared/*": ["src/shared/*"]
    },
    "types": ["vite/client", "vitest/globals"]
  },
  "include": ["src/**/*.ts", "src/**/*.tsx"],
  "exclude": ["node_modules"]
}

// === ARCHIVO: src/main.tsx ===
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './index.css';

// Entry point de la aplicación React
// Configura el modo estricto y monta la aplicación en el DOM
// Maneja errores durante el renderizado para evitar quiebre de la UI

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('No se encontró el elemento root en el DOM');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Configuración global de manejo de errores
window.addEventListener('error', (event) => {
  console.error('Error global:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled rejection:', event.reason);
});

// Registra servicio de logging para errores no capturados
if (import.meta.env.MODE === 'development') {
  import('@shared/utils/logger').then(({ logger }) => {
    logger.init();
  });
}

// === ARCHIVO: src/app/App.tsx ===
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StorageManager from '@features/storage/StorageManager';
import StorageDisplay from '@shared/components/StorageDisplay';
import './App.css';

// Componente principal de la aplicación
// Define la estructura base con rutas y provee el contexto necesario
// para la gestión de almacenamiento

type UserData = {
  id: string;
  name: string;
  preferences: {
    theme: string;
    language: string;
  };
};

const App: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    id: '',
    name: '',
    preferences: {
      theme: 'light',
      language: 'es'
    }
  });
  const [sessionData, setSessionData] = useState<string>('');
  const [complexData, setComplexData] = useState<{ id: string; data: unknown }[]>([]);

  const handleUserDataChange = (data: UserData) => {
    setUserData(data);
  };

  const handleSessionDataChange = (data: string) => {
    setSessionData(data);
  };

  const handleComplexDataChange = (data: { id: string; data: unknown }[]) => {
    setComplexData(data);
  };

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Gestor de Almacenamiento en Navegador</h1>
        </header>
        <main className="app-main">
          <Routes>
            <Route
              path="/"
              element=
                <StorageManager
                  userData={userData}
                  onUserDataChange={handleUserDataChange}
                  sessionData={sessionData}
                  onSessionDataChange={handleSessionDataChange}
                  complexData={complexData}
                  onComplexDataChange={handleComplexDataChange}
                />
            />
            <Route
              path="/display"
              element=
                <StorageDisplay
                  userData={userData}
                  sessionData={sessionData}
                  complexData={complexData}
                />
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;

// === ARCHIVO: index.html ===
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Aplicación para gestionar datos en Local Storage, Session Storage, Cookies e IndexedDB" />
    <meta name="theme-color" content="#2563eb" />
    <meta name="keywords" content="browser storage, localStorage, sessionStorage, cookies, indexedDB, React" />
    <title>Browser Storage Manager</title>
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <style>
      *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      html {
        font-size: 16px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Microsoft YaHei", sans-serif;
        background-color: #f8fafc;
        color: #1e293b;
        min-height: 100vh;
        line-height: 1.5;
      }
      
      #root {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }
      
      .app-loading {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }
      
      .app-loading-spinner {
        width: 48px;
        height: 48px;
        border: 4px solid rgba(255, 255, 255, 0.25);
        border-top-color: #ffffff;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      @media (prefers-reduced-motion: reduce) {
        .app-loading-spinner {
          animation: none;
          border-top-color: #ffffff;
        }
      }
    </style>
  </head>
  <body>
    <div id="root">
      <div class="app-loading">
        <div class="app-loading-spinner" role="status" aria-label="Cargando aplicación"></div>
      </div>
    </div>
    <script type="module" src="/src/main.tsx"></script>
    <noscript>
      <div style="padding: 2rem; text-align: center; font-family: sans-serif;">
        <h1>JavaScript requerido</h1>
        <p>Por favor, habilite JavaScript en su navegador para usar esta aplicación.</p>
      </div>
    </noscript>
  </body>
</html>

// === ARCHIVO: src/features/storage/services/localStorageService.ts ===
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

// === ARCHIVO: src/features/storage/services/sessionStorageService.ts ===
import { StorageService } from './storageTypes';

export class SessionStorageService implements StorageService {
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
      sessionStorage.setItem(this.getKey(key), serialized);
      return true;
    } catch (error) {
      console.error(`[SessionStorage] Error saving key "${key}":`, error);
      return false;
    }
  }

  get<T>(key: string): T | null {
    try {
      const item = sessionStorage.getItem(this.getKey(key));
      if (item === null) {
        return null;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`[SessionStorage] Error getting key "${key}":`, error);
      return null;
    }
  }

  remove(key: string): boolean {
    try {
      sessionStorage.removeItem(this.getKey(key));
      return true;
    } catch (error) {
      console.error(`[SessionStorage] Error removing key "${key}":`, error);
      return false;
    }
  }

  clear(): boolean {
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key && key.startsWith(this.prefix)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => sessionStorage.removeItem(key));
      return true;
    } catch (error) {
      console.error('[SessionStorage] Error clearing storage:', error);
      return false;
    }
  }

  hasKey(key: string): boolean {
    return sessionStorage.getItem(this.getKey(key)) !== null;
  }

  getAllKeys(): string[] {
    const keys: string[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && key.startsWith(this.prefix)) {
        keys.push(key.replace(this.prefix, ''));
      }
    }
    return keys;
  }

  getSize(): number {
    let size = 0;
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key) {
        const value = sessionStorage.getItem(key);
        if (value) {
          size += key.length + value.length;
        }
      }
    }
    return size;
  }
}

export const sessionStorageService = new SessionStorageService();

// === ARCHIVO: src/features/storage/services/cookieService.ts ===
import { CookieOptions, CookieService as ICookieService } from './storageTypes';

export class CookieService implements ICookieService {
  private defaultOptions: CookieOptions;

  constructor() {
    this.defaultOptions = {
      path: '/',
      sameSite: 'Lax',
      secure: false,
      httpOnly: false
    };
  }

  private getCookie(name: string): string | null {
    if (typeof document === 'undefined') {
      console.warn('[Cookie] Document not available');
      return null;
    }
    const cookies = document.cookie.split(';');
    const prefix = name.startsWith('app_') ? '' : 'app_';
    const targetName = `${prefix}${name}`;
    
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split('=');
      if (cookieName === targetName) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }

  private setCookie(name: string, value: string, options: CookieOptions): void {
    if (typeof document === 'undefined') {
      console.warn('[Cookie] Document not available');
      return;
    }
    
    const prefix = name.startsWith('app_') ? '' : 'app_';
    const cookieName = `${prefix}${name}`;
    let cookieString = `${encodeURIComponent(cookieName)}=${encodeURIComponent(value)}`;

    if (options.expires) {
      const expiryDate = new Date();
      if (typeof options.expires === 'number') {
        expiryDate.setTime(expiryDate.getTime() + options.expires * 24 * 60 * 60 * 1000);
      } else {
        expiryDate.setTime(options.expires.getTime());
      }
      cookieString += `; expires=${expiryDate.toUTCString()}`;
    }

    if (options.path) {
      cookieString += `; path=${options.path}`;
    }

    if (options.domain) {
      cookieString += `; domain=${options.domain}`;
    }

    if (options.secure) {
      cookieString += '; secure';
    }

    if (options.sameSite) {
      cookieString += `; samesite=${options.sameSite}`;
    }

    document.cookie = cookieString;
  }

  private deleteCookie(name: string, options: Partial<CookieOptions> = {}): void {
    const deleteOptions: CookieOptions = {
      ...this.defaultOptions,
      ...options,
      expires: new Date(0)
    };
    this.setCookie(name, '', deleteOptions);
  }

  save<T>(key: string, value: T, options?: CookieOptions): boolean {
    try {
      const serialized = typeof value === 'string' ? value : JSON.stringify(value);
      const mergedOptions = { ...this.defaultOptions, ...options };
      this.setCookie(key, serialized, mergedOptions);
      return true;
    } catch (error) {
      console.error(`[Cookie] Error saving key "${key}":`, error);
      return false;
    }
  }

  get<T>(key: string): T | null {
    try {
      const value = this.getCookie(key);
      if (value === null) {
        return null;
      }
      try {
        return JSON.parse(value) as T;
      } catch {
        return value as unknown as T;
      }
    } catch (error) {
      console.error(`[Cookie] Error getting key "${key}":`, error);
      return null;
    }
  }

  remove(key: string, options?: Partial<CookieOptions>): boolean {
    try {
      this.deleteCookie(key, options);
      return true;
    } catch (error) {
      console.error(`[Cookie] Error removing key "${key}":`, error);
      return false;
    }
  }

  clear(): boolean {
    try {
      if (typeof document === 'undefined') {
        return false;
      }
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
        const [cookieName] = cookie.trim().split('=');
        if (cookieName.startsWith('app_')) {
          this.deleteCookie(cookieName.replace('app_', ''));
        }
      }
      return true;
    } catch (error) {
      console.error('[Cookie] Error clearing cookies:', error);
      return false;
    }
  }

  hasKey(key: string): boolean {
    return this.getCookie(key) !== null;
  }

  getAllKeys(): string[] {
    if (typeof document === 'undefined') {
      return [];
    }
    const cookies = document.cookie.split(';');
    const keys: string[] = [];
    
    for (const cookie of cookies) {
      const [cookieName] = cookie.trim().split('=');
      if (cookieName.startsWith('app_')) {
        keys.push(cookieName.replace('app_', ''));
      }
    }
    
    return keys;
  }

  isExpired(key: string): boolean {
    try {
      const value = this.getCookie(key);
      if (value === null) {
        return true;
      }
      const cookies = document.cookie.split(';');
      const prefix = key.startsWith('app_') ? '' : 'app_';
      const targetName = `${prefix}${key}`;
      
      for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === targetName) {
          const cookieParts = cookie.split(';');
          for (const part of cookieParts) {
            const [partName, partValue] = part.trim().split('=');
            if (partName.toLowerCase() === 'expires') {
              const expiryDate = new Date(partValue);
              return expiryDate.getTime() <= Date.now();
            }
          }
          return false;
        }
      }
      return true;
    } catch {
      return true;
    }
  }
}

export const cookieService = new CookieService();

// === ARCHIVO: src/features/storage/types/storageTypes.ts ===
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

// === ARCHIVO: src/features/storage/services/indexedDBService.ts ===
import type {
  StorageService,
  StorageResult,
  StorageOptions,
  StorageError,
  IndexedDBConfig,
  TransactionBounds,
  QueryOptions,
} from '../types/storageTypes';

const DEFAULT_CONFIG: IndexedDBConfig = {
  databaseName: 'BrowserStorageManager',
  version: 1,
  stores: [
    { name: 'userData', keyPath: 'id', indexes: [{ name: 'email', keyPath: 'email', unique: true }] },
    { name: 'appPreferences', keyPath: 'key' },
    { name: 'sessionData', keyPath: 'sessionId' },
    { name: 'cache', keyPath: 'key', indexes: [{ name: 'expiresAt', keyPath: 'expiresAt' }] },
  ],
};

class IndexedDBService implements StorageService {
  private db: IDBDatabase | null = null;
  private config: IndexedDBConfig;
  private initPromise: Promise<IDBDatabase> | null = null;

  constructor(config: Partial<IndexedDBConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.initialize();
  }

  private initialize(): void {
    if (this.initPromise) return;

    this.initPromise = new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        reject(new Error('IndexedDB no está disponible en este entorno'));
        return;
      }

      const request = window.indexedDB.open(this.config.databaseName, this.config.version);

      request.onerror = () => {
        reject(new Error(`Error al abrir IndexedDB: ${request.error?.message}`));
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        this.config.stores.forEach((storeConfig) => {
          if (!db.objectStoreNames.contains(storeConfig.name)) {
            const store = db.createObjectStore(storeConfig.name, { keyPath: storeConfig.keyPath });

            storeConfig.indexes?.forEach((index) => {
              store.createIndex(index.name, index.keyPath, {
                unique: index.unique ?? false,
                multiEntry: index.multiEntry ?? false,
              });
            });
          }
        });
      };
    });
  }

  private async getDatabase(): Promise<IDBDatabase> {
    if (this.db) return this.db;
    return this.initPromise!;
  }

  private createError(code: string, message: string): StorageError {
    return { code, message, mechanism: 'indexedDB' };
  }

  private wrapTransaction<T>(bounds: TransactionBounds, operation: (store: IDBObjectStore) => IDBRequest<T>): Promise<StorageResult<T>> {
    return new Promise(async (resolve) => {
      try {
        const db = await this.getDatabase();
        const transaction = db.transaction(bounds.storeName, bounds.mode);
        const store = transaction.objectStore(bounds.storeName);
        const request = operation(store);

        request.onsuccess = () => {
          resolve({ success: true, data: request.result });
        };

        request.onerror = () => {
          resolve({
            success: false,
            error: this.createError('TRANSACTION_ERROR', request.error?.message ?? 'Error en la transacción'),
          });
        };
      } catch (err) {
        resolve({
          success: false,
          error: this.createError('INIT_ERROR', err instanceof Error ? err.message : 'Error desconocido'),
        });
      }
    });
  }

  async get<T>(key: string): Promise<StorageResult<T>> {
    return this.wrapTransaction<T>(
      { storeName: 'cache', mode: 'readonly' },
      (store) => store.get(key)
    );
  }

  async set<T>(key: string, value: T, options?: StorageOptions): Promise<StorageResult> {
    const now = Date.now();
    const item = {
      key,
      value,
      timestamp: now,
      expiresAt: options?.expiresIn ? now + options.expiresIn : undefined,
    };

    return this.wrapTransaction(
      { storeName: 'cache', mode: 'readwrite' },
      (store) => store.put(item)
    );
  }

  async remove(key: string): Promise<StorageResult> {
    return this.wrapTransaction(
      { storeName: 'cache', mode: 'readwrite' },
      (store) => store.delete(key)
    );
  }

  async clear(): Promise<StorageResult> {
    return this.wrapTransaction(
      { storeName: 'cache', mode: 'readwrite' },
      (store) => store.clear()
    );
  }

  async keys(): Promise<StorageResult<string[]>> {
    return this.wrapTransaction<string[]>(
      { storeName: 'cache', mode: 'readonly' },
      (store) => store.getAllKeys()
    );
  }

  async query<T>(storeName: string, options: QueryOptions = {}): Promise<StorageResult<T[]>> {
    return new Promise(async (resolve) => {
      try {
        const db = await this.getDatabase();
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);

        let request: IDBRequest<T[]>;

        if (options.indexName && options.range) {
          const index = store.index(options.indexName);
          request = index.getAll(options.range, options.limit);
        } else {
          request = store.getAll();
        }

        request.onsuccess = () => {
          resolve({ success: true, data: request.result });
        };

        request.onerror = () => {
          resolve({
            success: false,
            error: this.createError('QUERY_ERROR', request.error?.message ?? 'Error al consultar'),
          });
        };
      } catch (err) {
        resolve({
          success: false,
          error: this.createError('QUERY_ERROR', err instanceof Error ? err.message : 'Error desconocido'),
        });
      }
    });
  }

  async put<T>(storeName: string, key: string | IDBValidKey, value: T): Promise<StorageResult> {
    return this.wrapTransaction(
      { storeName, mode: 'readwrite' },
      (store) => store.put({ ...value, [storeName === 'userData' ? 'id' : 'key']: key } as IDBValidKey)
    );
  }

  async delete(storeName: string, key: string | IDBValidKey): Promise<StorageResult> {
    return this.wrapTransaction(
      { storeName, mode: 'readwrite' },
      (store) => store.delete(key)
    );
  }

  async getByStore<T>(storeName: string, key: string | IDBValidKey): Promise<StorageResult<T>> {
    return this.wrapTransaction<T>(
      { storeName, mode: 'readonly' },
      (store) => store.get(key)
    );
  }

  async getAllFromStore<T>(storeName: string): Promise<StorageResult<T[]>> {
    return this.wrapTransaction<T[]>(
      { storeName, mode: 'readonly' },
      (store) => store.getAll()
    );
  }

  async clearExpired(): Promise<StorageResult<number>> {
    return new Promise(async (resolve) => {
      try {
        const db = await this.getDatabase();
        const transaction = db.transaction('cache', 'readwrite');
        const store = transaction.objectStore('cache');
        const index = store.index('expiresAt');
        const now = Date.now();
        const range = IDBKeyRange.upperBound(now);
        const request = index.getAllKeys(range);

        request.onsuccess = () => {
          const expiredKeys = request.result;
          let deletedCount = 0;

          expiredKeys.forEach((key) => {
            const deleteRequest = store.delete(key);
            deleteRequest.onsuccess = () => {
              deletedCount++;
            };
          });

          resolve({ success: true, data: deletedCount });
        };

        request.onerror = () => {
          resolve({
            success: false,
            error: this.createError('CLEAR_EXPIRED_ERROR', request.error?.message ?? 'Error al limpiar'),
          });
        };
      } catch (err) {
        resolve({
          success: false,
          error: this.createError('CLEAR_EXPIRED_ERROR', err instanceof Error ? err.message : 'Error desconocido'),
        });
      }
    });
  }

  async close(): Promise<void> {
    if (this.db) {
      this.db.close();
      this.db = null;
      this.initPromise = null;
    }
  }
}

export const indexedDBService = new IndexedDBService();
export default IndexedDBService;

// === ARCHIVO: src/features/storage/hooks/useStorage.ts ===
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

// === ARCHIVO: src/features/storage/StorageManager.tsx ===
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

// === ARCHIVO: src/features/storage/__tests__/localStorageService.test.ts ===
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

// === ARCHIVO: src/features/storage/__tests__/sessionStorageService.test.ts ===
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

// === ARCHIVO: src/features/storage/__tests__/cookieService.test.ts ===
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

// === ARCHIVO: src/features/storage/__tests__/indexedDBService.test.ts ===
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

// === ARCHIVO: src/features/storage/__tests__/useStorage.test.ts ===
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

// === ARCHIVO: src/shared/utils/storageUtils.ts ===
import { StorageData, StorageError, StorageOperation } from '@features/storage/types/storageTypes';

const DEFAULT_ENCODING = 'utf-8';
const MAX_STORAGE_SIZE = 5 * 1024 * 1024;

export function serializeData<T>(data: T): string {
  try {
    return JSON.stringify(data);
  } catch (error) {
    throw new Error(`Error al serializar datos: ${error instanceof Error ? error.message : 'Error desconocido'}`);
  }
}

export function deserializeData<T>(data: string): T {
  try {
    return JSON.parse(data) as T;
  } catch (error) {
    throw new Error(`Error al deserializar datos: ${error instanceof Error ? error.message : 'Error desconocido'}`);
  }
}

export function safeStringify(obj: unknown): string {
  const seen = new WeakSet();
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return '[Circular]';
      }
      seen.add(value);
    }
    return value;
  });
}

export function createStorageError(
  operation: StorageOperation,
  message: string,
  cause?: Error
): StorageError {
  const error = new Error(message) as StorageError;
  error.operation = operation;
  error.cause = cause;
  error.timestamp = new Date();
  return error;
}

export function handleStorageError(
  error: unknown,
  operation: StorageOperation,
  fallbackValue?: unknown
): { success: false; error: StorageError } | { success: true; data: typeof fallbackValue } {
  if (error instanceof Error) {
    const storageError = createStorageError(operation, error.message, error);
    console.error(`[Storage] Error en operación ${operation}:`, storageError);
    return { success: false, error: storageError };
  }
  const unknownError = createStorageOperationError(operation, String(error));
  return { success: false, error: unknownError };
}

function createStorageOperationError(operation: StorageOperation, message: string): StorageError {
  const error = new Error(message) as StorageError;
  error.operation = operation;
  error.timestamp = new Date();
  return error;
}

export function validateStorageData(data: unknown): data is StorageData {
  if (typeof data !== 'object' || data === null) {
    return false;
  }
  const record = data as Record<string, unknown>;
  return Object.keys(record).every(key => {
    const value = record[key];
    return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
  });
}

export function estimateStorageUsage(data: string): number {
  return new Blob([data]).size;
}

export function isStorageAvailable(type: 'localStorage' | 'sessionStorage' | 'indexedDB'): boolean {
  try {
    const storage = window[type];
    const testKey = '__storage_test__';
    storage.setItem(testKey, 'test');
    storage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

export function getStorageQuota(): { used: number; available: number; percentage: number } {
  if (navigator.storage && navigator.storage.estimate) {
    return navigator.storage.estimate().then(estimate => {
      const usage = estimate.usage || 0;
      const quota = estimate.quota || MAX_STORAGE_SIZE;
      return {
        used: usage,
        available: quota - usage,
        percentage: Math.round((usage / quota) * 100)
      };
    }).catch(() => ({
      used: 0,
      available: MAX_STORAGE_SIZE,
      percentage: 0
    })) as unknown as { used: number; available: number; percentage: number };
  }
  return {
    used: 0,
    available: MAX_STORAGE_SIZE,
    percentage: 0
  };
}

export function encodeCookieValue(value: string): string {
  return encodeURIComponent(value);
}

export function decodeCookieValue(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function parseCookieString(cookieString: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!cookieString || typeof cookieString !== 'string') {
    return cookies;
  }
  cookieString.split(';').forEach(cookie => {
    const [name, ...rest] = cookie.split('=');
    if (name && rest.length > 0) {
      cookies[name.trim()] = rest.join('=').trim();
    }
  });
  return cookies;
}

export function generateStorageKey(namespace: string, key: string): string {
  return `${namespace}:${key}`;
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return function (...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return function (...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

export function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const execute = async () => {
      try {
        const result = await operation();
        resolve(result);
      } catch (error) {
        attempts++;
        if (attempts >= maxRetries) {
          reject(error);
        } else {
          setTimeout(execute, delay * attempts);
        }
      }
    };
    execute();
  });
}

export function createStorageValidator<T>(schema: Record<keyof T, (value: unknown) => boolean>) {
  return (data: unknown): data is T => {
    if (typeof data !== 'object' || data === null) {
      return false;
    }
    const record = data as Record<string, unknown>;
    return Object.keys(schema).every(key => schema[key as keyof T](record[key]));
  };
}

export const STORAGE_CONSTANTS = {
  MAX_SIZE: MAX_STORAGE_SIZE,
  DEFAULT_PREFIX: 'app',
  ENCODING: DEFAULT_ENCODING,
  EXPIRY_FORMAT: 'expires=',
  COOKIE_SEPARATOR: '; ',
  KEY_VALUE_SEPARATOR: '='
} as const;

// === ARCHIVO: src/shared/components/StorageDisplay.tsx ===
import React from 'react';
import { StorageData, StorageType } from '@features/storage/types/storageTypes';

interface StorageDisplayProps {
  localStorageData: StorageData;
  sessionStorageData: StorageData;
  cookieData: StorageData;
  indexedDBData: StorageData;
  activeStorage: StorageType;
  onSelectStorage: (type: StorageType) => void;
  isLoading?: boolean;
  error?: string | null;
}

interface StorageCardProps {
  title: string;
  type: StorageType;
  data: StorageData;
  isActive: boolean;
  itemCount: number;
  onSelect: (type: StorageType) => void;
}

const StorageCard: React.FC<StorageCardProps> = ({
  title,
  type,
  data,
  isActive,
  itemCount,
  onSelect
}) => {
  const handleClick = () => {
    onSelect(type);
  };

  const dataKeys = Object.keys(data);
  const hasData = dataKeys.length > 0;

  return (
    <div
      className={`storage-card ${isActive ? 'active' : ''}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-pressed={isActive}
      aria-label={`Almacenamiento ${title}`}
    >
      <div className="storage-card-header">
        <h3 className="storage-card-title">{title}</h3>
        <span className="storage-badge" aria-label={`${itemCount} elementos`}>
          {itemCount}
        </span>
      </div>
      <div className="storage-card-body">
        {hasData ? (
          <ul className="storage-list" aria-label="Claves almacenadas">
            {dataKeys.slice(0, 5).map((key) => (
              <li key={key} className="storage-item">
                <span className="storage-key">{key}</span>
                <span className="storage-value">
                  {typeof data[key] === 'string' && data[key].length > 20
                    ? `${data[key].substring(0, 20)}...`
                    : String(data[key])}
                </span>
              </li>
            ))}
            {dataKeys.length > 5 && (
              <li className="storage-more">
                +{dataKeys.length - 5} más
              </li>
            )}
          </ul>
        ) : (
          <p className="storage-empty">Sin datos</p>
        )}
      </div>
      <div className="storage-card-footer">
        <span className={`status-indicator ${hasData ? 'has-data' : 'empty'}`}>
          {hasData ? 'Datos guardados' : 'Vacío'}
        </span>
      </div>
    </div>
  );
};

const StorageDisplay: React.FC<StorageDisplayProps> = ({
  localStorageData,
  sessionStorageData,
  cookieData,
  indexedDBData,
  activeStorage,
  onSelectStorage,
  isLoading = false,
  error = null
}) => {
  const storageTypes = [
    { type: 'localStorage' as StorageType, title: 'Local Storage', data: localStorageData },
    { type: 'sessionStorage' as StorageType, title: 'Session Storage', data: sessionStorageData },
    { type: 'cookies' as StorageType, title: 'Cookies', data: cookieData },
    { type: 'indexedDB' as StorageType, title: 'IndexedDB', data: indexedDBData }
  ];

  const getItemCount = (data: StorageData): number => {
    return Object.keys(data).length;
  };

  if (isLoading) {
    return (
      <div className="storage-display loading" role="status" aria-live="polite">
        <div className="loading-spinner" aria-label="Cargando datos de almacenamiento"></div>
        <p>Cargando datos de almacenamiento...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="storage-display error" role="alert">
        <p className="error-message">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="storage-display" role="region" aria-label="Visualización de almacenamiento">
      <h2 className="storage-display-title">Almacenamiento del Navegador</h2>
      <div className="storage-grid" role="list" aria-label="Tipos de almacenamiento disponibles">
        {storageTypes.map(({ type, title, data }) => (
          <StorageCard
            key={type}
            title={title}
            type={type}
            data={data}
            isActive={activeStorage === type}
            itemCount={getItemCount(data)}
            onSelect={onSelectStorage}
          />
        ))}
      </div>
      <div className="storage-info" aria-live="polite">
        <p>
          Almacenamiento activo: <strong>{storageTypes.find(s => s.type === activeStorage)?.title}</strong>
        </p>
      </div>
    </div>
  );
};

export default StorageDisplay;
```
