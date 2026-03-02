# Contributing

Contributions to DojOps Docs are welcome! This is the documentation site for the [DojOps](https://github.com/dojops/dojops) ecosystem, built with [Nextra](https://nextra.site/).

## Development Setup

```bash
git clone https://github.com/dojops/dojops-doc.git
cd dojops-doc
npm install
npm run dev   # Start dev server with hot reload
```

## Available Commands

```bash
npm run dev           # Next.js dev server
npm run build         # Production build
npm run format        # Prettier write
npm run format:check  # Prettier check
```

## Content Structure

All documentation lives in `content/` as MDX files. Navigation is controlled by `_meta.js` files in each directory.

```
content/
├── getting-started/   # Installation, Quick Start, Configuration, Providers
├── usage/             # CLI Reference, API Reference, Web Dashboard
├── architecture/      # System Design, Security Model
├── components/        # Agents, Tools, Tool Spec, Scanning, Executor, Planner
└── community/         # Contributing, Troubleshooting
```

## Writing Guidelines

- Use MDX for all content files
- Keep code examples accurate and tested
- Cross-reference related pages with relative links
- Update `_meta.js` when adding new pages

## Commit Convention

This repo uses [Conventional Commits](https://www.conventionalcommits.org/). Husky enforces this on every commit.

```
docs: add API token management guide
fix: correct CLI command example
style: format MDX tables
```

## PR Checklist

- [ ] Formatting is correct (`npm run format:check`)
- [ ] Build succeeds (`npm run build`)
- [ ] Links are valid and point to correct pages
- [ ] Code examples are accurate
