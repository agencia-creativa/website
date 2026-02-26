# website

Canonical website repository for `agencia-creativa`.

## Stack
- Runtime preference: Bun
- Language: TypeScript
- Framework: React + Vite

## Commands
```bash
bun install
bun run dev
bun run build
```

## Deployment
GitHub Actions deploys `dist/` to Cloudflare Workers (`agencia-creativa-website`) on push to `main`.

### Required GitHub Actions secrets / vars
- `CLOUDFLARE_API_TOKEN` (Secret: Cloudflare API token with Workers deploy permissions)
- `CLOUDFLARE_ACCOUNT_ID` (Variable preferred, Secret fallback: Cloudflare account ID)

Workflow file: `.github/workflows/deploy-workers.yml`
Wrangler config: `wrangler.toml`

## Governance
- Code ownership: `CODEOWNERS`
- Branch strategy: `BRANCH_STRATEGY.md`

