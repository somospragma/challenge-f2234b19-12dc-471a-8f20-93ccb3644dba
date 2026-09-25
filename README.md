# Implementación de almacenamiento de datos en navegadores

El candidato debe implementar un sistema de almacenamiento de datos que utilice Local Storage, Session Storage, Cookies e IndexedDB en un entorno de desarrollo Frontend con React. El sistema debe ser capaz de guardar, recuperar y eliminar datos en cada uno de estos mecanismos de almacenamiento. Los datos a almacenar incluyen información de usuario, preferencias de la aplicación y datos de sesión. El sistema debe manejar correctamente la persistencia de datos, la caducidad de las cookies y la gestión de la sesión del usuario.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Guardado de la data en los diferentes navegadores |
| **Nivel** | senior-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y generará un ZIP listo para usar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y generará un archivo ZIP descargable. Descárgalo y extráelo en la carpeta donde quieras trabajar.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no genera el ZIP automáticamente al terminar el análisis, escríbele: "genera el ZIP ahora".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Configuración del entorno y almacenamiento básico

**Objetivo:** Configurar el entorno de desarrollo y crear una funcionalidad básica de almacenamiento de datos usando Local Storage.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Configurar un proyecto React.
- Implementar una funcionalidad que guarde y recupere datos de usuario en Local Storage.

**Entregable:** Proyecto React con funcionalidad de almacenamiento en Local Storage.

<details>
<summary>Pistas de conocimiento</summary>

- Considera la estructura de los datos a almacenar.
- Piensa en cómo manejar la persistencia de datos entre sesiones.

</details>

### Fase 2: Ampliación del almacenamiento con Session Storage y Cookies

**Objetivo:** Ampliar la funcionalidad para incluir el almacenamiento de datos en Session Storage y Cookies.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Implementar funcionalidades para guardar y recuperar datos en Session Storage y Cookies.
- Manejar la caducidad de las Cookies.

**Entregable:** Proyecto React con funcionalidades de almacenamiento en Local Storage, Session Storage y Cookies.

<details>
<summary>Pistas de conocimiento</summary>

- Considera las diferencias entre Local Storage y Session Storage.
- Piensa en cómo manejar la caducidad de las Cookies.

</details>

### Fase 3: Integración de IndexedDB y gestión de datos complejos

**Objetivo:** Integrar IndexedDB para el almacenamiento de datos complejos y gestionar la interacción entre los diferentes mecanismos de almacenamiento.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Implementar funcionalidad para guardar y recuperar datos complejos en IndexedDB.
- Gestionar la interacción entre Local Storage, Session Storage, Cookies e IndexedDB.

**Entregable:** Proyecto React con funcionalidades de almacenamiento en Local Storage, Session Storage, Cookies e IndexedDB, y gestión de la interacción entre ellos.

<details>
<summary>Pistas de conocimiento</summary>

- Considera la estructura de los datos complejos que vas a almacenar en IndexedDB.
- Piensa en cómo gestionar la interacción entre los diferentes mecanismos de almacenamiento.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es Local Storage y cómo se diferencia de Session Storage y Cookies?
- **paraQueSirve**: ¿Para qué sirve IndexedDB en comparación con Local Storage y Session Storage?
- **comoSeUsa**: ¿Cómo se usa Cookies para almacenar datos con caducidad?
- **erroresComunes**: ¿Cuáles son los errores comunes al manejar el almacenamiento de datos en navegadores?
- **queDecisionesImplica**: ¿Qué decisiones implica la elección entre Local Storage, Session Storage, Cookies e IndexedDB para el almacenamiento de datos?

## Criterios de Evaluacion

- Implementación correcta de almacenamiento en Local Storage.
- Implementación correcta de almacenamiento en Session Storage.
- Implementación correcta de almacenamiento en Cookies con manejo de caducidad.
- Implementación correcta de almacenamiento en IndexedDB para datos complejos.
- Gestión correcta de la interacción entre los diferentes mecanismos de almacenamiento.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT). Devuelve un ZIP con el proyecto. Sirve si no tenes un agente en el IDE.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
