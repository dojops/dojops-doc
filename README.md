<p align="center">
  <img src="public/icon.png" alt="DojOps Docs" width="80" />
</p>

<h1 align="center">DojOps documentation</h1>

<p align="center">
  Docs site for <a href="https://github.com/dojops/dojops">DojOps</a>. Built with Next.js and Nextra.
</p>

<p align="center">
  <strong>Live:</strong> <a href="https://docs.dojops.ai">docs.dojops.ai</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/next.js-15.1-000?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/nextra-4.2-000?style=flat-square" alt="Nextra" />
  <img src="https://img.shields.io/badge/typescript-5.7-3178c6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License" />
</p>

## Stack

- Next.js 15.1 (App Router, standalone output)
- Nextra 4.2 + nextra-theme-docs (MDX documentation framework)
- React 19 + TypeScript 5.7

## Content

18 MDX pages in 6 sections:

```
content/
├── index.mdx                      # Introduction
├── getting-started/
│   ├── installation.mdx           # Prerequisites, npm/curl/Docker install
│   ├── quickstart.mdx             # First run, basic workflow
│   ├── configuration.mdx          # Providers, env vars, profiles
│   └── providers.mdx              # Add, remove, switch LLM providers
├── usage/
│   ├── cli.mdx                    # CLI command reference
│   ├── api.mdx                    # 19 REST endpoints with examples
│   └── dashboard.mdx              # Web dashboard overview
├── architecture/
│   ├── overview.mdx               # System design, package layers, data flow
│   └── security-model.mdx         # Defense-in-depth, trust boundaries
├── components/
│   ├── agents.mdx                 # 17 built-in agents + custom agents
│   ├── tools.mdx                  # 18 DevOps skills + custom skill system
│   ├── tool-spec-v1.mdx           # Frozen v1 tool contract
│   ├── security-scanning.mdx      # 10 scanners, modes, remediation
│   ├── execution-engine.mdx       # SafeExecutor, policies, audit logging
│   └── planner.mdx                # Task decomposition, topological execution
└── community/
    ├── contributing.mdx            # Dev setup, commit conventions, PR checklist
    └── troubleshooting.mdx         # FAQ, common issues, debugging
```

Navigation is controlled by `_meta.js` files in each directory.

## Theme

Configured in `app/layout.tsx`. DojOps logo in the navbar with a GitHub project link. Dismissible banner linking to [dojops.ai](https://dojops.ai). Sidebar collapses at the first level by default. Edit links point back to this repo on GitHub.

## Development

Requires Node.js >= 20.

```bash
git clone https://github.com/dojops/dojops-doc.git
cd dojops-doc
npm install
npm run dev
```

### Commands

```bash
npm run dev            # Dev server with hot reload (http://localhost:3000)
npm run build          # Production build (standalone)
npm run start          # Start production server
npm run format         # Prettier write
npm run format:check   # Prettier check
```

### Adding a page

1. Create an MDX file in the appropriate `content/` subdirectory
2. Add it to the corresponding `_meta.js` file
3. Use relative links for cross-references

## Routing

Dynamic catch-all route at `app/[[...mdxPath]]/page.tsx`. Every MDX file in `content/` gets a URL automatically:

- `/` → `content/index.mdx`
- `/getting-started/installation` → `content/getting-started/installation.mdx`
- `/components/tools` → `content/components/tools.mdx`

Static params are generated at build time via Nextra's `generateStaticParamsFor()`.

## Docker

```bash
docker build -t dojops-doc .
docker run -p 3000:3000 dojops-doc
```

Multi-stage build (node:20-slim): deps → builder → runner. Non-root user (`nextjs:1001`), standalone output, port 3000.

## Related repos

| Repo                                                      | What it is                                        |
| --------------------------------------------------------- | ------------------------------------------------- |
| [dojops/dojops](https://github.com/dojops/dojops)         | Main monorepo — CLI, API, all @dojops/\* packages |
| [dojops/dojops.ai](https://github.com/dojops/dojops.ai)   | Marketing website                                 |
| [dojops/dojops-hub](https://github.com/dojops/dojops-hub) | Skill marketplace                                 |

## License

MIT
