# Docx Unpacker Webapp

![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?logo=tailwindcss&logoColor=white)
![i18n](https://img.shields.io/badge/i18n-21%20locales-9cf)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)
![CI Ready](https://img.shields.io/badge/CI-ready-yellow)

Read this in Portuguese: `README-pt-br.md`

Web tool built with Next.js to open, inspect, and extract the contents of `.docx` files directly in the browser. Explore internal structure (XML and media), view images, get a simple text preview, and download everything as `.zip`. The app is multilingual, SEO-optimized, and deployment-ready.

## Table of Contents
- Overview
- Features
- Tech Stack
- Architecture
- Screenshots
- Getting Started
- Usage
- Internationalization (i18n)
- SEO & Sitemap
- Project Structure
- Roadmap
- Tests & Quality
- Contributing
- Code of Conduct
- Security
- License
- Maintenance
- Acknowledgements
- Support & FAQ

## Overview
- Framework: `Next.js 15` (App Router) with TypeScript.
- UI: `Tailwind CSS`, `shadcn/ui` components, and `lucide-react` icons.
- Unpacking: `JSZip` to read `.docx` (ZIP with XML and media).
- Multilingual: 20+ locales with automatic detection via middleware.
- SEO: per-locale metadata, Open Graph, Twitter, FAQ in JSON-LD, sitemap, and `robots.txt`.
- Useful scripts: `dev`, `build`, `start`, `lint`, `typecheck`, and optional AI (Genkit) dev commands.

## Features
- `.docx` upload via drag-and-drop or file picker.
- Navigable tree of internal `.docx` files.
- Direct image rendering.
- Simple text preview from `word/document.xml` (naive extraction via `w:t` tags).
- “Raw XML” tab to inspect formatted XML.
- Download all extracted files as `.zip`.
- Reset to start over.
- Language switching via selector.

## Tech Stack
- `Next.js 15`, `React`, `TypeScript`
- `Tailwind CSS`, `shadcn/ui`, `lucide-react`
- `JSZip`
- i18n with `negotiator`, `@formatjs/intl-localematcher`
- SEO integrated per-locale routes

## Architecture
- Per-locale routes: `src/app/[locale]`.
- Main page: `src/app/[locale]/page.tsx` composes layout, unpack component, and FAQ.
- Core component: `src/components/docx-unpacker.tsx`
  - Orchestrates upload (`FileUpload`), server-side unpack (`unpackDocx`), and viewing (`FileTree`/`FileViewer`).
  - Implements `.zip` download on the client with `JSZip`.
  - State: loading, error, unpacked content, and selected file.
- Server action: `src/app/actions.ts`
  - `unpackDocx(fileBuffer)` uses `JSZip.loadAsync`.
  - Builds `UnpackedFile` tree (directories/files) preserving paths.
  - Basic MIME detection in `getMimeType` (png, jpg/jpeg, gif, svg, xml/rels); unknowns as text.
  - Text/XML read as `string`; images as `base64`.
- Types: `src/lib/types.ts` (`UnpackedFile`).
- Utilities: `src/lib/utils.ts` (`cn`).

## Screenshots
> Add real screenshots when available.

![Placeholder](https://placehold.co/1200x650/png?text=Docx+Unpacker+Preview)

## Getting Started
Prerequisites:
- Node.js 18+ and npm.

Install:
```
npm install
```

Development (port `9002`):
```
npm run dev
```

Production build:
```
npm run build
```

Production start:
```
npm run start
```

Helpful scripts:
- `npm run lint` — linting.
- `npm run typecheck` — type checking.
- `npm run genkit:dev` / `npm run genkit:watch` — Genkit dev environment (optional).

## Usage
- Visit a locale route (`/en`, `/pt`, `/es`, etc.). Middleware auto-redirects from `/`.
- Upload a `.docx` via drag-and-drop or click “Browse Files”.
- Wait for processing; on error, click “Try Again”.
- Use the left file tree to navigate.
- Click a file to view:
  - Images: rendered directly.
  - `word/document.xml`: simple text preview (tabs “Preview”/“Raw XML”).
  - Other XML/text: formatted “Raw XML”.
- “Download All (.zip)” downloads all extracted content.
- “Start Over” resets state for a new upload.

## Internationalization (i18n)
- Config: `i18n-config.ts` defines default locale and supported list.
- Dictionaries: `dictionaries/*.json` with metadata, UI, and FAQ per-locale.
- Loading: `get-dictionary.ts` dynamically imports the dictionary.
- Middleware: `middleware.ts` detects user language and redirects to `/{locale}`.
- Language switcher: `src/components/language-switcher.tsx` changes the URL locale segment.
- Text direction & fonts: `src/app/[locale]/layout.tsx` sets `dir` and locale-specific fonts.

## SEO & Sitemap
- Per-locale metadata: `src/app/[locale]/layout.tsx` composes `title`, `description`, `keywords`, Open Graph, and Twitter.
- FAQ JSON-LD: injected into `head` from the current locale dictionary.
- Sitemap: `src/app/sitemap.ts` generates per-locale entries; update `URL` with your domain.
- Robots: `public/robots.txt` references the sitemap; adjust domain.
- Remote images: `next.config.ts` allows `placehold.co`, `images.unsplash.com`, `picsum.photos`.

## Project Structure
```
docx-unpacker-webapp/
├── dictionaries/          # Per-locale metadata and strings (JSON)
├── src/
│   ├── app/
│   │   ├── [locale]/      # Per-locale route (layout, page)
│   │   ├── actions.ts     # Server action to unpack .docx
│   │   └── sitemap.ts     # Per-locale sitemap
│   ├── components/
│   │   ├── docx-unpacker.tsx  # Main upload/view flow
│   │   ├── file-upload.tsx     # Upload (drag & drop)
│   │   ├── file-tree.tsx       # File tree
│   │   └── file-viewer.tsx     # Viewer and tabs
│   ├── get-dictionary.ts   # Dictionary loader (dynamic import)
│   └── lib/
│       ├── types.ts        # UnpackedFile interface
│       └── utils.ts        # cn utility
├── i18n-config.ts          # Locale configuration
├── middleware.ts           # Redirects to best-matched locale
├── next.config.ts          # Next.js config (images, lint/ts)
├── public/robots.txt       # Robots + sitemap reference
├── tailwind.config.ts      # Theme and locale-specific fonts
└── package.json            # Dependencies and scripts
```

## Roadmap
- Advanced text preview (preserve styling and formatting).
- Broader MIME support (audio, video, fonts, etc.).
- Selective export and subfolder downloads.
- Performance improvements for large documents.
- Accessibility (ARIA, keyboard navigation).
- PWA / offline support.
- Unit and integration tests.

## Tests & Quality
- Lint: `npm run lint`
- Types: `npm run typecheck`
- Formatting: follow project style (Tailwind + TypeScript).
- Avoid unrelated changes; keep PRs focused and small.

## Contributing
- Fork and create a descriptive branch for your feature/fix.
- Ensure lint and typecheck pass before opening a PR.
- Clearly describe the problem and solution in the PR.
- Translations: add entries to `dictionaries/*.json` following the schema.
- Patterns: keep naming, style, and organization consistent.

## Code of Conduct
- Consider adopting [Contributor Covenant](https://www.contributor-covenant.org/) (add `CODE_OF_CONDUCT.md`).

## Security
- To report vulnerabilities, open an issue with the `security` label or add `SECURITY.md` with contact instructions.

## License
- Define the project license (e.g., MIT or Apache-2.0). Add `LICENSE` at the root and a matching badge.

## Maintenance
- Maintainers: add names/contacts here.
- Suggestions are welcome via issues.

## Acknowledgements
- Next.js, Tailwind CSS, and shadcn/ui communities.
- Contributors and everyone reporting bugs/ideas.

## Support & FAQ
- Frequently asked questions are available in the app UI (per-locale FAQ).
- For support, open an issue detailing environment and repro steps.

---

Need adjustments to content, locales, or integrations? Edit `dictionaries/`, `sitemap.ts`, `robots.txt`, and related components as described above. Update domain in the SEO sections when publishing.