# Cloudflare Workers custom domain binding — `chiclestudio.com`

## Target
- Worker service: `chiclestudio-website`
- Production hostnames:
  - `chiclestudio.com`
  - `www.chiclestudio.com` (redirect to apex or vice versa; pick one canonical)
- Canonical URL in site metadata: `https://chiclestudio.com/`

## DNS + binding steps (Cloudflare)
1. Ensure `chiclestudio.com` zone is active in the same Cloudflare account as Workers.
2. In **Workers & Pages → chiclestudio-website → Settings → Domains & Routes**:
   - Add custom domain `chiclestudio.com`
   - Add custom domain `www.chiclestudio.com`
3. Cloudflare will auto-create/validate DNS records for the worker binding.
4. Set one canonical host redirect rule (recommended):
   - `www.chiclestudio.com/*` → `https://chiclestudio.com/$1` (301)
5. SSL/TLS mode: `Full (strict)`.
6. Confirm edge cert issuance is complete before cutover announcement.

## Deploy target notes
- `wrangler.toml` worker name updated to `chiclestudio-website`.
- If CI uses explicit worker name flags/secrets, align them with `chiclestudio-website`.
- First production deploy after binding should be followed by:
  - `https://chiclestudio.com/` returns `200`
  - canonical/og:url point to `https://chiclestudio.com/`
  - `robots.txt` sitemap URL and `sitemap.xml` host both resolve.

## Rollback
- Keep previous worker deployment available on `workers.dev` during first 24h.
- If cutover issues appear, temporarily remove custom domain bindings and serve fallback host while fixes are applied.
