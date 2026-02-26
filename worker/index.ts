const SUPPORTED_LOCALES = ['en', 'es'] as const

type Env = {
  ASSETS: Fetcher
}

function inferLocaleFromRequest(request: Request): (typeof SUPPORTED_LOCALES)[number] {
  const acceptLanguage = request.headers.get('accept-language')?.toLowerCase() ?? ''
  return acceptLanguage.startsWith('es') || acceptLanguage.includes(',es') ? 'es' : 'en'
}

function isAssetPath(pathname: string) {
  return pathname.startsWith('/assets/') || pathname.includes('.')
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url)
    const pathname = url.pathname

    if (pathname === '/') {
      const locale = inferLocaleFromRequest(request)
      return Response.redirect(`${url.origin}/${locale}/`, 302)
    }

    const [, maybeLocale] = pathname.split('/')
    const hasLocalePrefix = (SUPPORTED_LOCALES as readonly string[]).includes(maybeLocale)

    if (hasLocalePrefix && !isAssetPath(pathname)) {
      const localePath = pathname === `/${maybeLocale}` ? `/${maybeLocale}/` : pathname
      if (localePath !== pathname) {
        return Response.redirect(`${url.origin}${localePath}${url.search}`, 301)
      }

      return env.ASSETS.fetch(new Request(`${url.origin}/index.html`, request))
    }

    return env.ASSETS.fetch(request)
  },
}
