import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { SUPPORTED_LOCALES, contentByLocale, type CaseStudy, type Locale } from './i18n/content'
import './styles.css'

const SITE_ORIGIN = 'https://chiclestudio.com'

type RouteKey = 'home' | 'work' | 'project' | 'services' | 'about' | 'contact'

type RouteMatch = {
  locale: Locale
  route: RouteKey
  projectId?: string
}

const PATHS: Record<Locale, Record<Exclude<RouteKey, 'project'>, string>> = {
  en: {
    home: '/en/',
    work: '/en/work',
    services: '/en/services',
    about: '/en/about',
    contact: '/en/contact',
  },
  es: {
    home: '/es/',
    work: '/es/trabajos',
    services: '/es/servicios',
    about: '/es/nosotros',
    contact: '/es/contacto',
  },
}

const PROJECT_SLUGS: Record<Locale, Record<string, string>> = {
  en: { tolo: 'tolo', cretia: 'cretia', fucesa: 'fucesa' },
  es: { tolo: 'tolo', cretia: 'cretia', fucesa: 'fucesa' },
}

const PROJECT_VISUAL_LABEL: Record<string, string> = {
  fucesa: 'fucesa.com',
  cretia: 'cretia.app',
  tolo: 'tolo.cafe',
}

function inferLocaleFromNavigator(): Locale {
  const navLang = typeof navigator !== 'undefined' ? navigator.language.toLowerCase() : 'en'
  return navLang.startsWith('es') ? 'es' : 'en'
}

function normalizePath(pathname: string): string {
  return pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
}

function parseRoute(pathname: string): RouteMatch {
  const normalized = normalizePath(pathname)
  const parts = normalized.split('/').filter(Boolean)

  if (parts.length === 0) return { locale: inferLocaleFromNavigator(), route: 'home' }

  const maybeLocale = parts[0]
  const locale: Locale = (SUPPORTED_LOCALES as readonly string[]).includes(maybeLocale) ? (maybeLocale as Locale) : inferLocaleFromNavigator()
  const section = parts[1]

  if (!section) return { locale, route: 'home' }

  if (locale === 'en') {
    if (section === 'work') {
      const slug = parts[2]
      if (!slug) return { locale, route: 'work' }
      const projectId = Object.entries(PROJECT_SLUGS.en).find(([, value]) => value === slug)?.[0]
      return projectId ? { locale, route: 'project', projectId } : { locale, route: 'work' }
    }
    if (section === 'services') return { locale, route: 'services' }
    if (section === 'about') return { locale, route: 'about' }
    if (section === 'contact') return { locale, route: 'contact' }
  }

  if (locale === 'es') {
    if (section === 'trabajos') {
      const slug = parts[2]
      if (!slug) return { locale, route: 'work' }
      const projectId = Object.entries(PROJECT_SLUGS.es).find(([, value]) => value === slug)?.[0]
      return projectId ? { locale, route: 'project', projectId } : { locale, route: 'work' }
    }
    if (section === 'servicios') return { locale, route: 'services' }
    if (section === 'nosotros') return { locale, route: 'about' }
    if (section === 'contacto') return { locale, route: 'contact' }
  }

  return { locale, route: 'home' }
}

function buildPath(locale: Locale, route: Exclude<RouteKey, 'project'>): string {
  return PATHS[locale][route]
}

function buildProjectPath(locale: Locale, projectId: string): string {
  const base = locale === 'es' ? '/es/trabajos' : '/en/work'
  return `${base}/${PROJECT_SLUGS[locale][projectId]}`
}

function buildEquivalentPath(locale: Locale, match: RouteMatch): string {
  if (match.route === 'project' && match.projectId) return buildProjectPath(locale, match.projectId)
  return buildPath(locale, match.route === 'project' ? 'work' : match.route)
}

function upsertHeadLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`
  let el = document.head.querySelector<HTMLLinkElement>(selector)
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    if (hreflang) el.hreflang = hreflang
    document.head.appendChild(el)
  }
  el.href = href
}

function upsertMeta(name: string, content: string, property = false) {
  const key = property ? 'property' : 'name'
  const selector = `meta[${key}="${name}"]`
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(key, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertJsonLd(id: string, payload: object) {
  let el = document.head.querySelector<HTMLScriptElement>(`script[type="application/ld+json"][data-id="${id}"]`)
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.dataset.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(payload)
}

function pageTitle(route: RouteKey, locale: Locale, project?: CaseStudy): string {
  const base = locale === 'es' ? 'Chicle Studio' : 'Chicle Studio'
  if (route === 'work') return locale === 'es' ? `${base} — Casos de estudio` : `${base} — Case studies`
  if (route === 'project' && project) return `${project.brand} — ${base}`
  if (route === 'services') return locale === 'es' ? `${base} — Servicios` : `${base} — Services`
  if (route === 'about') return locale === 'es' ? `${base} — Nosotros` : `${base} — About`
  if (route === 'contact') return locale === 'es' ? `${base} — Contacto` : `${base} — Contact`
  return contentByLocale[locale].seo.title
}

function pageDescription(route: RouteKey, locale: Locale, project?: CaseStudy): string {
  if (route === 'project' && project) return project.approach
  if (route === 'services') {
    return locale === 'es'
      ? 'Servicios de dirección de marca, SEO técnico y performance engineering para marcas ambiciosas.'
      : 'Brand direction, technical SEO, and performance engineering services for ambitious brands.'
  }
  if (route === 'about') {
    return locale === 'es'
      ? 'Conoce el enfoque editorial y el modelo operativo de Chicle Studio.'
      : 'Learn about Chicle Studio editorial direction and operating model.'
  }
  if (route === 'contact') {
    return locale === 'es' ? 'Comparte tu brief y calendario para lanzar con precisión.' : 'Share your brief and timeline to launch with precision.'
  }
  return contentByLocale[locale].seo.description
}

function applySeo(match: RouteMatch, project?: CaseStudy) {
  const { locale, route } = match
  const title = pageTitle(route, locale, project)
  const description = pageDescription(route, locale, project)
  const canonicalPath = buildEquivalentPath(locale, match)
  const alternateLocale: Locale = locale === 'en' ? 'es' : 'en'
  const alternatePath = buildEquivalentPath(alternateLocale, match)
  const canonical = `${SITE_ORIGIN}${canonicalPath}`

  document.title = title
  document.documentElement.lang = locale

  upsertHeadLink('canonical', canonical)
  upsertHeadLink('alternate', `${SITE_ORIGIN}${canonicalPath}`, locale)
  upsertHeadLink('alternate', `${SITE_ORIGIN}${alternatePath}`, alternateLocale)
  upsertHeadLink('alternate', `${SITE_ORIGIN}${buildPath('en', 'home')}`, 'x-default')

  upsertMeta('description', description)
  upsertMeta('og:title', title, true)
  upsertMeta('og:description', description, true)
  upsertMeta('og:type', route === 'project' ? 'article' : 'website', true)
  upsertMeta('og:locale', locale === 'es' ? 'es_MX' : 'en_US', true)
  upsertMeta('og:url', canonical, true)
  upsertMeta('twitter:card', 'summary_large_image')
  upsertMeta('twitter:title', title)
  upsertMeta('twitter:description', description)

  upsertJsonLd('org', {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Chicle Studio',
    url: SITE_ORIGIN,
    logo: `${SITE_ORIGIN}/og-cover.svg`,
  })

  upsertJsonLd('webpage', {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    inLanguage: locale,
    url: canonical,
  })

  if (route === 'services') {
    upsertJsonLd('services', {
      '@context': 'https://schema.org',
      '@type': 'Service',
      provider: { '@type': 'Organization', name: 'Chicle Studio' },
      serviceType: locale === 'es' ? 'Dirección de marca, SEO técnico e ingeniería de performance' : 'Brand direction, technical SEO and performance engineering',
      areaServed: 'MX',
      url: canonical,
    })
  }

  if (route === 'project' && project) {
    upsertJsonLd('project', {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: `${project.brand} case study`,
      inLanguage: locale,
      description: project.challenge,
      about: project.services,
      image: `${SITE_ORIGIN}${project.visual}`,
      url: canonical,
    })
  }
}

function useRevealAnimation() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))

    if (!reducedMotion) {
      document.body.classList.add('motion-on')
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              observer.unobserve(entry.target)
            }
          }
        },
        { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
      )

      revealElements.forEach((el, index) => {
        if (index < 3) el.classList.add('is-visible')
        observer.observe(el)
      })

      const revealFailSafe = window.setTimeout(() => {
        revealElements.forEach((el) => el.classList.add('is-visible'))
      }, 900)

      return () => {
        observer.disconnect()
        window.clearTimeout(revealFailSafe)
        document.body.classList.remove('motion-on')
      }
    }

    revealElements.forEach((el) => el.classList.add('is-visible'))
    return undefined
  }, [])
}

function App() {
  if (window.location.pathname === '/') {
    const redirectedLocale = inferLocaleFromNavigator()
    window.location.replace(buildPath(redirectedLocale, 'home'))
    return null
  }

  const match = parseRoute(window.location.pathname)
  const { locale, route, projectId } = match
  const t = contentByLocale[locale]
  const alternateLocale: Locale = locale === 'en' ? 'es' : 'en'
  const project = projectId ? t.work.caseStudies.find((item) => item.id === projectId) : undefined

  useEffect(() => {
    applySeo(match, project)
  }, [locale, route, projectId])

  useRevealAnimation()

  const navItems = [
    { label: locale === 'es' ? 'Inicio' : 'Home', href: buildPath(locale, 'home') },
    { label: locale === 'es' ? 'Casos' : 'Work', href: buildPath(locale, 'work') },
    { label: locale === 'es' ? 'Servicios' : 'Services', href: buildPath(locale, 'services') },
    { label: locale === 'es' ? 'Nosotros' : 'About', href: buildPath(locale, 'about') },
    { label: locale === 'es' ? 'Contacto' : 'Contact', href: buildPath(locale, 'contact') },
  ]

  return (
    <>
      <a className="skip-link" href="#main-content">
        {t.skipToContent}
      </a>

      <header className="site-header" aria-label="Top navigation">
        <div className="container nav-shell">
          <a className="brand" href={buildPath(locale, 'home')} aria-label={t.nav.brandAriaLabel}>
            Chicle Studio
          </a>
          <nav className="main-nav" aria-label="Primary">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className="nav-cta" href={route === 'project' && projectId ? buildProjectPath(alternateLocale, projectId) : buildPath(alternateLocale, route === 'project' ? 'work' : route)}>
            {locale === 'es' ? 'EN' : 'ES'}
          </a>
        </div>
      </header>

      <main id="main-content">
        {route === 'home' && <HomePage locale={locale} />}
        {route === 'work' && <WorkPage locale={locale} />}
        {route === 'project' && project && <ProjectPage locale={locale} project={project} />}
        {route === 'services' && <ServicesPage locale={locale} />}
        {route === 'about' && <AboutPage locale={locale} />}
        {route === 'contact' && <ContactPage locale={locale} />}
      </main>

      <footer className="site-footer">
        <div className="container footer-shell">
          <p>
            © {new Date().getFullYear()} {t.footer.text}
          </p>
          <a href={buildPath(locale, 'home')}>{t.footer.backToTop}</a>
        </div>
      </footer>
    </>
  )
}

function HomePage({ locale }: { locale: Locale }) {
  const t = contentByLocale[locale]
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero-layout">
          <div className="hero-copy-shell" data-reveal>
            <p className="eyebrow">{t.hero.eyebrow}</p>
            <h1 id="hero-title">
              <span className="display-line">{t.hero.titleLines[0]}</span>
              <span className="display-line">{t.hero.titleLines[1]}</span>
              <span className="display-line">{t.hero.titleLines[2]}</span>
            </h1>
            <p className="hero-copy">{t.hero.body}</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href={buildPath(locale, 'contact')}>
                {t.hero.primaryCta}
              </a>
              <a className="btn btn-ghost" href={buildPath(locale, 'work')}>
                {t.hero.secondaryCta}
              </a>
            </div>
          </div>
          <aside className="hero-visual" aria-label="Studio highlights" data-reveal>
            <div className="hero-tile hero-tile-brand"><span>CHICLE</span><strong>studio</strong></div>
            <div className="hero-tile hero-tile-gradient" />
            <div className="hero-tile hero-tile-dark"><span>Editorial web systems</span><strong>2026</strong></div>
            <div className="hero-tile hero-tile-electric" />
            <a className="hero-ticket" href={buildPath(locale, 'work')}>{locale === 'es' ? 'Ver casos' : 'View cases'}</a>
          </aside>
          <div className="hero-kpis" aria-label="Performance highlights" data-reveal>
            {t.hero.kpis.map((kpi) => (
              <article key={kpi.label}><strong>{kpi.value}</strong><span>{kpi.label}</span></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-transition-a" aria-label="Explore Chicle Studio">
        <div className="container service-grid">
          <a className="surface-card" href={buildPath(locale, 'services')} data-reveal>
            <h3>{locale === 'es' ? 'Servicios' : 'Services'}</h3>
            <p>{locale === 'es' ? 'Dirección de marca, SEO técnico y performance.' : 'Brand direction, technical SEO, and performance delivery.'}</p>
          </a>
          <a className="surface-card" href={buildPath(locale, 'work')} data-reveal>
            <h3>{locale === 'es' ? 'Casos de estudio' : 'Case studies'}</h3>
            <p>{locale === 'es' ? 'Resultados reales para FUCESA, Cretia y TOLO.' : 'Real outcomes for FUCESA, Cretia, and TOLO.'}</p>
          </a>
          <a className="surface-card" href={buildPath(locale, 'about')} data-reveal>
            <h3>{locale === 'es' ? 'Nuestra forma de trabajar' : 'How we work'}</h3>
            <p>{locale === 'es' ? 'Proceso editorial + ejecución técnica para conversión.' : 'Editorial process + technical execution for conversion.'}</p>
          </a>
        </div>
      </section>
    </>
  )
}

function WorkPage({ locale }: { locale: Locale }) {
  const t = contentByLocale[locale]
  return (
    <section className="section section-transition-b" aria-labelledby="work-title">
      <div className="container">
        <div className="section-head" data-reveal>
          <div>
            <p className="eyebrow">{t.work.eyebrow}</p>
            <h2 id="work-title">{t.work.title}</h2>
          </div>
        </div>
        <div className="case-grid">
          {t.work.caseStudies.map((item, index) => (
            <article key={item.id} className="case-card" data-reveal style={{ transitionDelay: `${index * 70}ms` }}>
              <figure className="case-visual-wrap">
                <img src={item.visual} loading="lazy" width="800" height="1200" alt={`${item.brand} website screenshot`} />
                <figcaption>{PROJECT_VISUAL_LABEL[item.id]}</figcaption>
              </figure>
              <div className="case-content">
                <p className="case-meta"><span>{item.brand}</span><span>{item.category}</span></p>
                <h3>{item.challenge}</h3>
                <p>{item.approach}</p>
                <p className="case-stat"><strong>{item.stat}</strong><span>{item.statLabel}</span></p>
                <a className="btn btn-ghost" href={buildProjectPath(locale, item.id)}>{locale === 'es' ? 'Ver caso completo' : 'View full case study'}</a>
              </div>
            </article>
          ))}
        </div>
        <div className="hero-actions" data-reveal>
          <a className="btn btn-ghost" href={buildPath(locale, 'services')}>{locale === 'es' ? 'Ver servicios' : 'Explore services'}</a>
          <a className="btn btn-primary" href={buildPath(locale, 'contact')}>{locale === 'es' ? 'Iniciar proyecto' : 'Start your project'}</a>
        </div>
      </div>
    </section>
  )
}

function ProjectPage({ locale, project }: { locale: Locale; project: CaseStudy }) {
  const outcomeTitle = locale === 'es' ? 'Resultados' : 'Outcomes'
  const scopeTitle = locale === 'es' ? 'Alcance' : 'Scope delivered'
  const backLabel = locale === 'es' ? 'Regresar a casos' : 'Back to work'

  return (
    <section className="section section-transition-c" aria-labelledby="project-title">
      <div className="container">
        <a className="text-link" href={buildPath(locale, 'work')}>← {backLabel}</a>
        <article className="case-card" data-reveal>
          <figure className="case-visual-wrap">
            <img src={project.visual} loading="eager" width="1200" height="1400" alt={`${project.brand} case study visual`} />
            <figcaption>{PROJECT_VISUAL_LABEL[project.id]}</figcaption>
          </figure>
          <div className="case-content">
            <p className="case-meta"><span>{project.brand}</span><span>{project.category}</span></p>
            <h2 id="project-title">{project.challenge}</h2>
            <p>{project.approach}</p>
            <p className="case-stat"><strong>{project.stat}</strong><span>{project.statLabel}</span></p>
            <h4>{outcomeTitle}</h4>
            <ul>{project.impact.map((point) => <li key={point}>{point}</li>)}</ul>
            <h4>{scopeTitle}</h4>
            <ul className="chip-list">{project.services.map((service) => <li key={service}>{service}</li>)}</ul>
          </div>
        </article>
      </div>
    </section>
  )
}

function ServicesPage({ locale }: { locale: Locale }) {
  const t = contentByLocale[locale]
  return (
    <section className="section section-services section-transition-a" aria-labelledby="services-title">
      <div className="container services-layout">
        <div className="section-lead" data-reveal>
          <p className="eyebrow">{t.services.eyebrow}</p>
          <h2 id="services-title">{t.services.title}</h2>
        </div>
        <div className="service-grid">
          {t.services.cards.map((card, index) => (
            <article key={card.title} className={`surface-card ${index === 1 ? 'offset-card' : ''}`.trim()} data-reveal>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutPage({ locale }: { locale: Locale }) {
  const title = locale === 'es' ? 'Construimos experiencias editoriales con obsesión por conversión.' : 'We build editorial experiences obsessed with conversion.'
  const body = locale === 'es'
    ? 'Somos un estudio boutique que mezcla dirección creativa, contenido estratégico e ingeniería performance para crear sitios que sí venden.'
    : 'We are a boutique studio blending creative direction, strategic content, and performance engineering to build websites that convert.'

  return (
    <section className="section" aria-labelledby="about-title">
      <div className="container contact-shell" data-reveal>
        <div>
          <p className="eyebrow">{locale === 'es' ? 'Nosotros' : 'About'}</p>
          <h2 id="about-title">{title}</h2>
          <p>{body}</p>
          <div className="hero-actions">
            <a className="btn btn-ghost" href={buildPath(locale, 'services')}>{locale === 'es' ? 'Servicios' : 'Services'}</a>
            <a className="btn btn-ghost" href={buildPath(locale, 'work')}>{locale === 'es' ? 'Casos' : 'Work'}</a>
            <a className="btn btn-primary" href={buildPath(locale, 'contact')}>{locale === 'es' ? 'Contactar' : 'Contact us'}</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactPage({ locale }: { locale: Locale }) {
  const t = contentByLocale[locale]
  return (
    <section className="section contact" aria-labelledby="contact-title">
      <div className="container contact-shell" data-reveal>
        <div>
          <p className="eyebrow">{t.contact.eyebrow}</p>
          <h2 id="contact-title">{t.contact.title}</h2>
          <p>{t.contact.body}</p>
        </div>
        <div className="contact-actions">
          <a className="btn btn-primary" href="mailto:hola@chiclestudio.com?subject=Project%20brief">{t.contact.primaryCta}</a>
          <a className="btn btn-ghost" href="mailto:hola@chiclestudio.com?subject=Book%20strategy%20call">{t.contact.secondaryCta}</a>
          <a className="btn btn-ghost" href={buildPath(locale, 'services')}>{locale === 'es' ? 'Ver servicios' : 'View services'}</a>
          <a className="btn btn-ghost" href={buildPath(locale, 'work')}>{locale === 'es' ? 'Ver trabajos' : 'View work'}</a>
          <a className="btn btn-ghost" href={buildPath(locale, 'about')}>{locale === 'es' ? 'Conócenos' : 'About us'}</a>
        </div>
      </div>
    </section>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
