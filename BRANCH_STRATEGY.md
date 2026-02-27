# Branch Strategy

## Default branch
- `main` is the production branch and deployment source for Cloudflare Workers.

## Expected flow
1. Create feature/fix branches from `main`
2. Open PR to `main`
3. CI must pass before merge
4. Merge with squash by default for clean history

## Protection baseline (target)
- Require pull request before merge
- Require CI checks to pass
- Restrict force-pushes and deletion on `main`

> Note: Until org branch protection rules are applied in repo settings, this is documented policy.
