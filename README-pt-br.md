# Docx Unpacker Webapp

![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?logo=tailwindcss&logoColor=white)
![i18n](https://img.shields.io/badge/i18n-21%20locales-9cf)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)
![CI Ready](https://img.shields.io/badge/CI-ready-yellow)

Leia isso em inglês: `README.md`

Ferramenta web em Next.js para abrir, inspecionar e extrair conteúdo de arquivos `.docx` direto no navegador. Explore a estrutura interna (XML e mídia), visualize imagens, obtenha um preview simples do texto e baixe tudo em `.zip`. O app é multilíngue, otimizado para SEO e pronto para deploy.

## Sumário
- Visão Geral
- Recursos
- Stack Técnica
- Arquitetura
- Screenshots
- Começando
- Uso
- Internacionalização (i18n)
- SEO & Sitemap
- Estrutura do Projeto
- Roadmap
- Testes & Qualidade
- Contribuição
- Código de Conduta
- Segurança
- Licença
- Manutenção
- Agradecimentos
- Suporte & FAQ

## Visão Geral
- Framework: `Next.js 15` (App Router) com TypeScript.
- UI: `Tailwind CSS`, componentes `shadcn/ui` e ícones `lucide-react`.
- Descompactação: `JSZip` para ler `.docx` (ZIP com XML e mídia).
- Multilíngue: 20+ idiomas com detecção automática via middleware.
- SEO: metadados por idioma, Open Graph, Twitter, FAQ em JSON-LD, `sitemap` e `robots.txt`.
- Scripts úteis: `dev`, `build`, `start`, `lint`, `typecheck` e comandos opcionais de AI (Genkit).

## Recursos
- Upload de `.docx` por arrastar/soltar ou seletor de arquivo.
- Árvore navegável dos arquivos internos do `.docx`.
- Visualização direta de imagens.
- Preview simples do texto em `word/document.xml` (extração ingênua via tags `w:t`).
- Aba “Raw XML” para inspeção do XML formatado.
- Download de todos os arquivos extraídos como `.zip`.
- Reset do estado para começar novamente.
- Alternância de idioma via seletor.

## Stack Técnica
- `Next.js 15`, `React`, `TypeScript`
- `Tailwind CSS`, `shadcn/ui`, `lucide-react`
- `JSZip`
- i18n com `negotiator`, `@formatjs/intl-localematcher`
- SEO integrado nas rotas por idioma

## Arquitetura
- Rotas por idioma: `src/app/[locale]`.
- Página principal: `src/app/[locale]/page.tsx` integra o layout, o componente de unpack e o FAQ.
- Componente core: `src/components/docx-unpacker.tsx`
  - Orquestra upload (`FileUpload`), descompactação (ação de servidor `unpackDocx`) e visualização (`FileTree`/`FileViewer`).
  - Implementa download `.zip` no cliente com `JSZip`.
  - Estado: loading, erro, conteúdo descompactado e arquivo selecionado.
- Ação de servidor: `src/app/actions.ts`
  - `unpackDocx(fileBuffer)` usa `JSZip.loadAsync`.
  - Constrói a árvore `UnpackedFile` (diretórios/arquivos) preservando caminhos.
  - MIME básico em `getMimeType` (png, jpg/jpeg, gif, svg, xml/rels); desconhecidos como texto.
  - Texto/XML lido como `string`; imagens como `base64`.
- Tipos: `src/lib/types.ts` (`UnpackedFile`).
- Utilitários: `src/lib/utils.ts` (`cn`).

## Screenshots
> Adicione capturas reais aqui quando disponíveis.

![Placeholder](https://placehold.co/1200x650/png?text=Docx+Unpacker+Preview)

## Começando
Pré-requisitos:
- Node.js 18+ e npm.

Instalação:
```
npm install
```

Ambiente de desenvolvimento (porta `9002`):
```
npm run dev
```

Build de produção:
```
npm run build
```

Start de produção:
```
npm run start
```

Scripts úteis:
- `npm run lint` — Linting.
- `npm run typecheck` — Checagem de tipos.
- `npm run genkit:dev` / `npm run genkit:watch` — Ambiente de dev do Genkit (opcional).

## Uso
- Acesse uma rota com idioma (`/en`, `/pt`, `/es`, etc.). O middleware redireciona automaticamente se você acessar `/`.
- Faça upload de um `.docx` por arrastar/soltar ou clique em “Browse Files”.
- Aguarde o processamento; em erro, use “Try Again”.
- Use a árvore à esquerda para navegar entre arquivos e diretórios.
- Clique em um arquivo para visualizar:
  - Imagens: renderizadas diretamente.
  - `word/document.xml`: preview simples do texto (tabs “Preview”/“Raw XML”).
  - Outros XML/texto: exibição “Raw XML” com formatação.
- “Download All (.zip)” baixa todo o conteúdo extraído.
- “Start Over” limpa o estado para novo upload.

## Internacionalização (i18n)
- Configuração: `i18n-config.ts` define o idioma padrão e a lista de suportados.
- Dicionários: `dictionaries/*.json` com metadados, UI e FAQ por idioma.
- Carregamento: `get-dictionary.ts` importa dinamicamente o dicionário.
- Middleware: `middleware.ts` detecta idioma do usuário e redireciona para `/{locale}`.
- Seletor de idioma: `src/components/language-switcher.tsx` troca o segmento de idioma na URL.
- Direção de texto e fontes: `src/app/[locale]/layout.tsx` ajusta `dir` e fonte por idioma.

## SEO & Sitemap
- Metadados por idioma: `src/app/[locale]/layout.tsx` compõe `title`, `description`, `keywords`, Open Graph e Twitter.
- FAQ em JSON-LD: injectado no `head` a partir do dicionário atual.
- Sitemap: `src/app/sitemap.ts` gera entradas por idioma; atualize `URL` com o domínio.
- Robots: `public/robots.txt` referencia o sitemap; ajuste o domínio.
- Imagens remotas: `next.config.ts` permite `placehold.co`, `images.unsplash.com`, `picsum.photos`.

## Estrutura do Projeto
```
docx-unpacker-webapp/
├── dictionaries/          # Textos e metadados por idioma (JSON)
├── src/
│   ├── app/
│   │   ├── [locale]/      # Rota por idioma (layout, page)
│   │   ├── actions.ts     # Ação de servidor para descompactar .docx
│   │   └── sitemap.ts     # Sitemap por idioma
│   ├── components/
│   │   ├── docx-unpacker.tsx  # Fluxo principal de upload/visualização
│   │   ├── file-upload.tsx     # Upload (drag & drop)
│   │   ├── file-tree.tsx       # Árvore de arquivos
│   │   └── file-viewer.tsx     # Visualização e tabs
│   ├── get-dictionary.ts   # Loader de dicionário (import dinâmico)
│   └── lib/
│       ├── types.ts        # Interface UnpackedFile
│       └── utils.ts        # Utilitário cn
├── i18n-config.ts          # Configuração de idiomas
├── middleware.ts           # Redireciona para idioma adequado
├── next.config.ts          # Configurações Next.js (imagens, lint/ts)
├── public/robots.txt       # Robots + referência ao sitemap
├── tailwind.config.ts      # Tema e fontes por idioma
└── package.json            # Dependências e scripts
```

## Roadmap
- Preview avançado de texto (preservar estilo e formatação).
- Suporte de MIME mais amplo (audio, vídeo, fontes, etc.).
- Exportações seletivas e download de subpastas.
- Melhorias de performance para documentos grandes.
- Acessibilidade (ARIA, navegação por teclado).
- PWA / suporte offline.
- Testes de unidade e integração.

## Testes & Qualidade
- Lint: `npm run lint`
- Tipos: `npm run typecheck`
- Formatação: seguir estilo do projeto (Tailwind + TypeScript).
- Evite mudanças não relacionadas; mantenha alterações focadas e pequenas.

## Contribuição
- Faça um fork e crie um branch descritivo para sua feature/fix.
- Garanta lint e typecheck verdes antes de abrir PR.
- Descreva claramente o problema e a solução no PR.
- Traduções: adicione novas entradas em `dictionaries/*.json` seguindo a estrutura.
- Padrões: mantenha nomeação, estilo e organização existentes.

## Código de Conduta
- Recomenda-se adotar o [Contributor Covenant](https://www.contributor-covenant.org/) (adicione `CODE_OF_CONDUCT.md`).

## Segurança
- Para reportar vulnerabilidades, crie uma issue com a tag `security` ou adicione `SECURITY.md` com instruções de contato.

## Licença
- Defina a licença do projeto (ex.: MIT ou Apache-2.0). Recomendado adicionar `LICENSE` na raiz e um badge correspondente.

## Manutenção
- Mantenedores: adicione nomes/contatos aqui.
- Sugestões de melhoria são bem-vindas via issues.

## Agradecimentos
- Comunidade Next.js, Tailwind CSS e shadcn/ui.
- Contribuidores e quem reporta bugs/ideias.

## Suporte & FAQ
- Dúvidas frequentes estão disponíveis na UI da aplicação (FAQ por idioma).
- Para suporte, abra uma issue descrevendo o ambiente e passos para reproduzir.

---

Precisa ajustar conteúdo, idiomas ou integrações? Edite `dictionaries/`, `sitemap.ts`, `robots.txt` e os componentes conforme descrito acima. Atualize o domínio nas seções de SEO quando publicar.