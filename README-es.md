# Docx Unpacker Webapp

![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?logo=tailwindcss&logoColor=white)
![i18n](https://img.shields.io/badge/i18n-21%20locales-9cf)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)
![CI Ready](https://img.shields.io/badge/CI-ready-yellow)

Leer en inglés: `README.md` | Leer en portugués: `README-pt-br.md`

Herramienta web construida con Next.js para abrir, inspeccionar y extraer el contenido de archivos `.docx` directamente en el navegador. Explora la estructura interna (XML y medios), visualiza imágenes, obtén una vista previa de texto simple y descarga todo como `.zip`. La aplicación es multiidioma, optimizada para SEO y lista para despliegue.

## Índice
- Visión General
- Funcionalidades
- Stack Tecnológico
- Arquitectura
- Capturas de Pantalla
- Primeros Pasos
- Uso
- Internacionalización (i18n)
- SEO & Sitemap
- Estructura del Proyecto
- Hoja de Ruta
- Pruebas & Calidad
- Contribuyendo
- Código de Conducta
- Seguridad
- Licencia
- Mantenimiento
- Agradecimientos
- Soporte & FAQ

## Visión General
- Framework: `Next.js 15` (App Router) con TypeScript.
- UI: `Tailwind CSS`, componentes `shadcn/ui` e iconos `lucide-react`.
- Descompresión: `JSZip` para leer `.docx` (ZIP con XML y medios).
- Multiidioma: 20+ locales con detección automática vía middleware.
- SEO: metadata por locale, Open Graph, Twitter, FAQ en JSON-LD, sitemap y `robots.txt`.
- Scripts útiles: `dev`, `build`, `start`, `lint`, `typecheck` y comandos opcionales de AI (Genkit).

## Funcionalidades
- Subida de `.docx` vía arrastrar-y-soltar o selector de archivos.
- Árbol navegable de archivos internos del `.docx`.
- Renderizado directo de imágenes.
- Vista previa de texto simple del `word/document.xml` (extracción ingenua vía etiquetas `w:t`).
- Pestaña "XML Crudo" para inspeccionar XML formateado.
- Descarga de todos los archivos extraídos como `.zip`.
- Reset para empezar de nuevo.
- Cambio de idioma vía selector.

## Stack Tecnológico
- `Next.js 15`, `React`, `TypeScript`
- `Tailwind CSS`, `shadcn/ui`, `lucide-react`
- `JSZip`
- i18n con `negotiator`, `@formatjs/intl-localematcher`
- SEO integrado con rutas por locale

## Arquitectura
- Rutas por locale: `src/app/[locale]`.
- Página principal: `src/app/[locale]/page.tsx` compone layout, componente de descompresión y FAQ.
- Componente principal: `src/components/docx-unpacker.tsx`
  - Orquesta subida (`FileUpload`), descompresión server-side (`unpackDocx`) y visualización (`FileTree`/`FileViewer`).
  - Implementa descarga `.zip` en el cliente con `JSZip`.
  - Estado: carga, error, contenido descomprimido y archivo seleccionado.
- Server action: `src/app/actions.ts`
  - `unpackDocx(fileBuffer)` usa `JSZip.loadAsync`.
  - Construye árbol `UnpackedFile` (directorios/archivos) preservando rutas.
  - Detección básica de MIME en `getMimeType` (png, jpg/jpeg, gif, svg, xml/rels); desconocidos como texto.
  - Texto/XML leído como `string`; imágenes como `base64`.
- Tipos: `src/lib/types.ts` (`UnpackedFile`).
- Utilidades: `src/lib/utils.ts` (`cn`).

## Capturas de Pantalla
> Añade capturas reales cuando estén disponibles.

![Placeholder](https://placehold.co/1200x650/png?text=Docx+Unpacker+Preview)

## Primeros Pasos
Prerrequisitos:
- Node.js 18+ y npm.

Instalación:
```
npm install
```

Desarrollo (puerto `9002`):
```
npm run dev
```

Build de producción:
```
npm run build
```

Inicio de producción:
```
npm run start
```

Scripts útiles:
- `npm run lint` — linting.
- `npm run typecheck` — verificación de tipos.
- `npm run genkit:dev` / `npm run genkit:watch` — entorno dev Genkit (opcional).

## Uso
- Visita una ruta de locale (`/en`, `/pt`, `/es`, etc.). El middleware redirige automáticamente desde `/`.
- Sube un `.docx` vía arrastrar-y-soltar o haz clic en "Buscar Archivos".
- Espera el procesamiento; en caso de error, haz clic en "Intentar de Nuevo".
- Usa el árbol de archivos a la izquierda para navegar.
- Haz clic en un archivo para visualizar:
  - Imágenes: renderizadas directamente.
  - `word/document.xml`: vista previa de texto simple (pestañas "Vista Previa"/"XML Crudo").
  - Otros XML/texto: "XML Crudo" formateado.
- "Descargar Todo (.zip)" descarga todo el contenido extraído.
- "Empezar de Nuevo" resetea el estado para una nueva subida.

## Internacionalización (i18n)
- Config: `i18n-config.ts` define locale por defecto y lista soportada.
- Diccionarios: `dictionaries/*.json` con metadata, UI y FAQ por locale.
- Carga: `get-dictionary.ts` importa dinámicamente el diccionario.
- Middleware: `middleware.ts` detecta idioma del usuario y redirige a `/{locale}`.
- Selector de idioma: `src/components/language-switcher.tsx` cambia el segmento locale de la URL.
- Dirección del texto & fuentes: `src/app/[locale]/layout.tsx` define `dir` y fuentes específicas por locale.

## SEO & Sitemap
- Metadata por locale: `src/app/[locale]/layout.tsx` compone `title`, `description`, `keywords`, Open Graph y Twitter.
- FAQ JSON-LD: inyectado en el `head` del diccionario del locale actual.
- Sitemap: `src/app/sitemap.ts` genera entradas por locale; actualiza `URL` con tu dominio.
- Robots: `public/robots.txt` referencia el sitemap; ajusta el dominio.
- Imágenes remotas: `next.config.ts` permite `placehold.co`, `images.unsplash.com`, `picsum.photos`.

## Estructura del Proyecto
```
docx-unpacker-webapp/
├── dictionaries/          # Metadata y strings por locale (JSON)
├── src/
│   ├── app/
│   │   ├── [locale]/      # Ruta por locale (layout, page)
│   │   ├── actions.ts     # Server action para descomprimir .docx
│   │   └── sitemap.ts     # Sitemap por locale
│   ├── components/
│   │   ├── docx-unpacker.tsx  # Flujo principal subida/visualización
│   │   ├── file-upload.tsx     # Subida (arrastrar & soltar)
│   │   ├── file-tree.tsx       # Árbol de archivos
│   │   └── file-viewer.tsx     # Visualizador y pestañas
│   ├── get-dictionary.ts   # Cargador de diccionario (import dinámico)
│   └── lib/
│       ├── types.ts        # Interfaz UnpackedFile
│       └── utils.ts        # Utilidad cn
├── i18n-config.ts          # Configuración de locale
├── middleware.ts           # Redirige a locale mejor coincidente
├── next.config.ts          # Config Next.js (imágenes, lint/ts)
├── public/robots.txt       # Robots + referencia sitemap
├── tailwind.config.ts      # Tema y fuentes específicas por locale
└── package.json            # Dependencias y scripts
```

## Hoja de Ruta
- Vista previa de texto avanzada (preservar estilo y formato).
- Soporte MIME más amplio (audio, video, fuentes, etc.).
- Exportación selectiva y descargas de subcarpetas.
- Mejoras de rendimiento para documentos grandes.
- Accesibilidad (ARIA, navegación por teclado).
- PWA / soporte offline.
- Pruebas unitarias y de integración.

## Pruebas & Calidad
- Lint: `npm run lint`
- Tipos: `npm run typecheck`
- Formato: sigue el estilo del proyecto (Tailwind + TypeScript).
- Evita cambios no relacionados; mantén PRs enfocados y pequeños.

## Contribuyendo
- Haz fork y crea una rama descriptiva para tu funcionalidad/corrección.
- Asegúrate de que lint y typecheck pasen antes de abrir un PR.
- Describe claramente el problema y solución en el PR.
- Traducciones: añade entradas en `dictionaries/*.json` siguiendo el esquema.
- Patrones: mantén nomenclatura, estilo y organización consistentes.

## Código de Conducta
- Considera adoptar [Contributor Covenant](https://www.contributor-covenant.org/) (añade `CODE_OF_CONDUCT.md`).

## Seguridad
- Para reportar vulnerabilidades, abre una issue con la etiqueta `security` o añade `SECURITY.md` con instrucciones de contacto.

## Licencia
- Define la licencia del proyecto (ej: MIT o Apache-2.0). Añade `LICENSE` en la raíz y un badge correspondiente.

## Mantenimiento
- Mantenedores: añade nombres/contactos aquí.
- Las sugerencias son bienvenidas vía issues.

## Agradecimientos
- Comunidades Next.js, Tailwind CSS y shadcn/ui.
- Contribuidores y todos los que reportan bugs/ideas.

## Soporte & FAQ
- Las preguntas frecuentes están disponibles en la UI de la app (FAQ por locale).
- Para soporte, abre una issue detallando entorno y pasos de reproducción.

---

¿Necesitas ajustes en contenido, locales o integraciones? Edita `dictionaries/`, `sitemap.ts`, `robots.txt` y componentes relacionados como se describe arriba. Actualiza el dominio en las secciones SEO al publicar.
## 📸 Screenshots

![Screenshot 1](docs/screen-shot-1.png)
![Screenshot 2](docs/screen-shot-2.png)
