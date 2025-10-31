# Docx Unpacker Webapp

![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?logo=tailwindcss&logoColor=white)
![i18n](https://img.shields.io/badge/i18n-21%20locales-9cf)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)
![CI Ready](https://img.shields.io/badge/CI-ready-yellow)

Auf Englisch lesen: `README.md` | Auf Portugiesisch lesen: `README-pt-br.md`

Web-Tool mit Next.js erstellt, um `.docx`-Dateien direkt im Browser zu öffnen, zu inspizieren und deren Inhalt zu extrahieren. Erkunden Sie die interne Struktur (XML und Medien), betrachten Sie Bilder, erhalten Sie eine einfache Textvorschau und laden Sie alles als `.zip` herunter. Die Anwendung ist mehrsprachig, SEO-optimiert und bereit für die Bereitstellung.

## Inhaltsverzeichnis
- Überblick
- Funktionen
- Technologie-Stack
- Architektur
- Screenshots
- Erste Schritte
- Verwendung
- Internationalisierung (i18n)
- SEO & Sitemap
- Projektstruktur
- Roadmap
- Tests & Qualität
- Beitragen
- Verhaltenskodex
- Sicherheit
- Lizenz
- Wartung
- Danksagungen
- Support & FAQ

## Überblick
- Framework: `Next.js 15` (App Router) mit TypeScript.
- UI: `Tailwind CSS`, `shadcn/ui`-Komponenten und `lucide-react`-Icons.
- Entpackung: `JSZip` zum Lesen von `.docx` (ZIP mit XML und Medien).
- Mehrsprachig: 20+ Locales mit automatischer Erkennung über Middleware.
- SEO: Metadaten pro Locale, Open Graph, Twitter, FAQ in JSON-LD, Sitemap und `robots.txt`.
- Nützliche Skripte: `dev`, `build`, `start`, `lint`, `typecheck` und optionale AI (Genkit) Dev-Befehle.

## Funktionen
- `.docx`-Upload via Drag-and-Drop oder Dateiauswahl.
- Navigierbarer Baum der internen `.docx`-Dateien.
- Direktes Rendern von Bildern.
- Einfache Textvorschau von `word/document.xml` (naive Extraktion über `w:t`-Tags).
- "Raw XML"-Tab zur Inspektion von formatiertem XML.
- Download aller extrahierten Dateien als `.zip`.
- Reset zum Neubeginn.
- Sprachwechsel über Auswahl.

## Technologie-Stack
- `Next.js 15`, `React`, `TypeScript`
- `Tailwind CSS`, `shadcn/ui`, `lucide-react`
- `JSZip`
- i18n mit `negotiator`, `@formatjs/intl-localematcher`
- SEO integriert mit Routen pro Locale

## Architektur
- Routen pro Locale: `src/app/[locale]`.
- Hauptseite: `src/app/[locale]/page.tsx` komponiert Layout, Entpack-Komponente und FAQ.
- Hauptkomponente: `src/components/docx-unpacker.tsx`
  - Orchestriert Upload (`FileUpload`), serverseitige Entpackung (`unpackDocx`) und Anzeige (`FileTree`/`FileViewer`).
  - Implementiert `.zip`-Download auf dem Client mit `JSZip`.
  - Zustand: Laden, Fehler, entpackter Inhalt und ausgewählte Datei.
- Server Action: `src/app/actions.ts`
  - `unpackDocx(fileBuffer)` verwendet `JSZip.loadAsync`.
  - Erstellt `UnpackedFile`-Baum (Verzeichnisse/Dateien) unter Beibehaltung der Pfade.
  - Grundlegende MIME-Erkennung in `getMimeType` (png, jpg/jpeg, gif, svg, xml/rels); Unbekannte als Text.
  - Text/XML als `string` gelesen; Bilder als `base64`.
- Typen: `src/lib/types.ts` (`UnpackedFile`).
- Hilfsprogramme: `src/lib/utils.ts` (`cn`).

## Screenshots
> Fügen Sie echte Screenshots hinzu, wenn verfügbar.

![Placeholder](https://placehold.co/1200x650/png?text=Docx+Unpacker+Preview)

## Erste Schritte
Voraussetzungen:
- Node.js 18+ und npm.

Installation:
```
npm install
```

Entwicklung (Port `9002`):
```
npm run dev
```

Produktions-Build:
```
npm run build
```

Produktionsstart:
```
npm run start
```

Nützliche Skripte:
- `npm run lint` — Linting.
- `npm run typecheck` — Typprüfung.
- `npm run genkit:dev` / `npm run genkit:watch` — Genkit Dev-Umgebung (optional).

## Verwendung
- Besuchen Sie eine Locale-Route (`/en`, `/pt`, `/es`, etc.). Middleware leitet automatisch von `/` weiter.
- Laden Sie eine `.docx` via Drag-and-Drop hoch oder klicken Sie auf "Dateien durchsuchen".
- Warten Sie auf die Verarbeitung; bei Fehlern klicken Sie auf "Erneut versuchen".
- Verwenden Sie den Dateibaum links zur Navigation.
- Klicken Sie auf eine Datei zur Anzeige:
  - Bilder: direkt gerendert.
  - `word/document.xml`: einfache Textvorschau (Tabs "Vorschau"/"Raw XML").
  - Andere XML/Text: formatiertes "Raw XML".
- "Alles herunterladen (.zip)" lädt den gesamten extrahierten Inhalt herunter.
- "Neu beginnen" setzt den Zustand für einen neuen Upload zurück.

## Internationalisierung (i18n)
- Config: `i18n-config.ts` definiert Standard-Locale und unterstützte Liste.
- Wörterbücher: `dictionaries/*.json` mit Metadaten, UI und FAQ pro Locale.
- Laden: `get-dictionary.ts` importiert das Wörterbuch dynamisch.
- Middleware: `middleware.ts` erkennt Benutzersprache und leitet zu `/{locale}` weiter.
- Sprachauswahl: `src/components/language-switcher.tsx` ändert das Locale-Segment der URL.
- Textrichtung & Schriften: `src/app/[locale]/layout.tsx` setzt `dir` und locale-spezifische Schriften.

## SEO & Sitemap
- Metadaten pro Locale: `src/app/[locale]/layout.tsx` komponiert `title`, `description`, `keywords`, Open Graph und Twitter.
- FAQ JSON-LD: in den `head` des aktuellen Locale-Wörterbuchs eingefügt.
- Sitemap: `src/app/sitemap.ts` generiert Einträge pro Locale; aktualisieren Sie `URL` mit Ihrer Domain.
- Robots: `public/robots.txt` referenziert die Sitemap; passen Sie die Domain an.
- Remote-Bilder: `next.config.ts` erlaubt `placehold.co`, `images.unsplash.com`, `picsum.photos`.

## Projektstruktur
```
docx-unpacker-webapp/
├── dictionaries/          # Metadaten und Strings pro Locale (JSON)
├── src/
│   ├── app/
│   │   ├── [locale]/      # Route pro Locale (Layout, Seite)
│   │   ├── actions.ts     # Server Action zum Entpacken von .docx
│   │   └── sitemap.ts     # Sitemap pro Locale
│   ├── components/
│   │   ├── docx-unpacker.tsx  # Haupt-Upload/Anzeige-Flow
│   │   ├── file-upload.tsx     # Upload (Drag & Drop)
│   │   ├── file-tree.tsx       # Dateibaum
│   │   └── file-viewer.tsx     # Viewer und Tabs
│   ├── get-dictionary.ts   # Wörterbuch-Loader (dynamischer Import)
│   └── lib/
│       ├── types.ts        # UnpackedFile Interface
│       └── utils.ts        # cn Hilfsprogramm
├── i18n-config.ts          # Locale-Konfiguration
├── middleware.ts           # Leitet zur am besten passenden Locale weiter
├── next.config.ts          # Next.js Config (Bilder, lint/ts)
├── public/robots.txt       # Robots + Sitemap-Referenz
├── tailwind.config.ts      # Theme und locale-spezifische Schriften
└── package.json            # Abhängigkeiten und Skripte
```

## Roadmap
- Erweiterte Textvorschau (Stil und Formatierung beibehalten).
- Breitere MIME-Unterstützung (Audio, Video, Schriften, etc.).
- Selektiver Export und Unterordner-Downloads.
- Performance-Verbesserungen für große Dokumente.
- Barrierefreiheit (ARIA, Tastaturnavigation).
- PWA / Offline-Unterstützung.
- Unit- und Integrationstests.

## Tests & Qualität
- Lint: `npm run lint`
- Typen: `npm run typecheck`
- Formatierung: folgen Sie dem Projektstil (Tailwind + TypeScript).
- Vermeiden Sie unrelated Änderungen; halten Sie PRs fokussiert und klein.

## Beitragen
- Forken Sie und erstellen Sie einen beschreibenden Branch für Ihr Feature/Fix.
- Stellen Sie sicher, dass Lint und Typecheck vor dem Öffnen einer PR bestehen.
- Beschreiben Sie Problem und Lösung klar in der PR.
- Übersetzungen: fügen Sie Einträge in `dictionaries/*.json` nach dem Schema hinzu.
- Muster: halten Sie Benennung, Stil und Organisation konsistent.

## Verhaltenskodex
- Erwägen Sie die Übernahme von [Contributor Covenant](https://www.contributor-covenant.org/) (fügen Sie `CODE_OF_CONDUCT.md` hinzu).

## Sicherheit
- Um Schwachstellen zu melden, öffnen Sie ein Issue mit dem Label `security` oder fügen Sie `SECURITY.md` mit Kontaktanweisungen hinzu.

## Lizenz
- Definieren Sie die Projektlizenz (z.B. MIT oder Apache-2.0). Fügen Sie `LICENSE` im Root und ein entsprechendes Badge hinzu.

## Wartung
- Maintainer: fügen Sie Namen/Kontakte hier hinzu.
- Vorschläge sind über Issues willkommen.

## Danksagungen
- Next.js, Tailwind CSS und shadcn/ui Communities.
- Mitwirkende und alle, die Bugs/Ideen melden.

## Support & FAQ
- Häufig gestellte Fragen sind in der App-UI verfügbar (FAQ pro Locale).
- Für Support öffnen Sie ein Issue mit Details zu Umgebung und Reproduktionsschritten.

---

Benötigen Sie Anpassungen an Inhalt, Locales oder Integrationen? Bearbeiten Sie `dictionaries/`, `sitemap.ts`, `robots.txt` und verwandte Komponenten wie oben beschrieben. Aktualisieren Sie die Domain in den SEO-Abschnitten beim Veröffentlichen.
## 📸 Screenshots

![Screenshot 1](docs/screen-shot-1.png)
![Screenshot 2](docs/screen-shot-2.png)
