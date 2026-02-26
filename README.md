# website

Canonical website repository for `chicle-studio`.

## Core Stack Standard (Authoritative)
- Cloudflare
- TypeScript
- React
- Figma
- PostHog
- Notion
- Google Services

## Local Build Runtime
- Runtime preference: Bun
- Tooling: Vite

## Commands
```bash
bun install
bun run dev
bun run build
```

## Deployment
GitHub Actions deploys `dist/` to Cloudflare Workers (`chiclestudio-website`) on push to `main`.

### Required GitHub Actions secrets / vars
- `CLOUDFLARE_API_TOKEN` (Secret: Cloudflare API token with Workers deploy permissions)
- `CLOUDFLARE_ACCOUNT_ID` (Variable preferred, Secret fallback: Cloudflare account ID)

Workflow file: `.github/workflows/deploy-workers.yml`
Wrangler config: `wrangler.toml`

## Governance
- Code ownership: `CODEOWNERS`
- Branch strategy: `BRANCH_STRATEGY.md`

