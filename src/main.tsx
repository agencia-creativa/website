import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { SUPPORTED_LOCALES, contentByLocale, type Locale } from './i18n/content'
import './styles.css'

const SITE_ORIGIN = 'https://chiclestudio.com'

function inferLocaleFromNavigator(): Locale {
  const navLang = typeof navigator !== 'undefined' ? navigator.language.toLowerCase() : 'en'
  return navLang.startsWith('es') ? 'es' : 'en'
}

function getLocaleFromPath(pathname: string): Locale {
  const firstSegment = pathname.split('/').filter(Boolean)[0]
  return (SUPPORTED_LOCALES as readonly string[]).includes(firstSegment) ? (firstSegment as Locale) : inferLocaleFromNavigator()
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

function applySeo(locale: Locale) {
  const copy = contentByLocale[locale]
  document.title = copy.seo.title
  document.documentElement.lang = locale

  const canonicalUrl = `${SITE_ORIGIN}/${locale}/`
  upsertHeadLink('canonical', canonicalUrl)
  upsertHeadLink('alternate', `${SITE_ORIGIN}/en/`, 'en')
  upsertHeadLink('alternate', `${SITE_ORIGIN}/es/`, 'es')
  upsertHeadLink('alternate', `${SITE_ORIGIN}/en/`, 'x-default')

  upsertMeta('description', copy.seo.description)
  upsertMeta('og:title', copy.seo.title, true)
  upsertMeta('og:description', copy.seo.description, true)
  upsertMeta('og:locale', locale === 'es' ? 'es_MX' : 'en_US', true)
}

function App() {
  if (window.location.pathname === '/') {
    const redirectedLocale = inferLocaleFromNavigator()
    window.location.replace(`/${redirectedLocale}/`)
    return null
  }

  const locale = getLocaleFromPath(window.location.pathname)
  const t = contentByLocale[locale]
  const alternateLocale: Locale = locale === 'en' ? 'es' : 'en'

  useEffect(() => {
    applySeo(locale)
  }, [locale])

  return (
    <>
      <a className="skip-link" href="#main-content">
        {t.skipToContent}
      </a>

      <header className="site-header" aria-label="Top navigation">
        <div className="container nav-shell">
          <a className="brand" href="#top" aria-label={t.nav.brandAriaLabel}>
            Chicle Studio
          </a>
          <nav className="main-nav" aria-label="Primary">
            {t.nav.items.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className="nav-cta" href={`/${alternateLocale}/`} aria-label={`Switch language to ${contentByLocale[alternateLocale].languageName}`}>
            {t.localeLabel}
          </a>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
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
                <a className="btn btn-primary" href="mailto:hola@chiclestudio.com?subject=Start%20a%20project">
                  {t.hero.primaryCta}
                </a>
                <a className="btn btn-ghost" href="#work">
                  {t.hero.secondaryCta}
                </a>
              </div>
            </div>

            <aside className="hero-visual" aria-label="Studio highlights" data-reveal>
              <img src="/assets/hero-studio.svg" loading="eager" width="620" height="720" decoding="async" alt={t.hero.visualAlt} />
            </aside>

            <div className="hero-kpis" aria-label="Performance highlights" data-reveal>
              {t.hero.kpis.map((kpi) => (
                <article key={kpi.label}>
                  <strong>{kpi.value}</strong>
                  <span>{kpi.label}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-services" id="services" aria-labelledby="services-title">
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

        <section className="section" id="work" aria-labelledby="work-title">
          <div className="container">
            <div className="section-head" data-reveal>
              <div>
                <p className="eyebrow">{t.work.eyebrow}</p>
                <h2 id="work-title">{t.work.title}</h2>
              </div>
              <a className="text-link" href="mailto:hola@chiclestudio.com?subject=Request%20full%20case%20study">
                {t.work.requestDeck}
              </a>
            </div>
            <div className="case-grid">
              {t.work.caseStudies.map((item, index) => (
                <article
                  key={item.id}
                  id={`case-${item.id}`}
                  className="case-card"
                  aria-labelledby={`${item.id}-title`}
                  data-reveal
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  <div className="case-visual-wrap">
                    <img src={item.visual} loading="lazy" width="800" height="520" alt={`${item.brand} case study visual`} />
                  </div>
                  <div className="case-content">
                    <p className="case-meta">
                      <span>{item.brand}</span>
                      <span>{item.category}</span>
                    </p>
                    <h3 id={`${item.id}-title`}>{item.challenge}</h3>
                    <p>{item.approach}</p>
                    <p className="case-stat">
                      <strong>{item.stat}</strong>
                      <span>{item.statLabel}</span>
                    </p>

                    <h4>{t.work.impactHeading}</h4>
                    <ul>
                      {item.impact.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>

                    <h4>{t.work.scopeHeading}</h4>
                    <ul className="chip-list">
                      {item.services.map((service) => (
                        <li key={service}>{service}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="process" aria-labelledby="process-title">
          <div className="container process-shell">
            <p className="eyebrow" data-reveal>
              {t.process.eyebrow}
            </p>
            <h2 id="process-title" data-reveal>
              {t.process.title}
            </h2>
            <ol className="process-grid">
              {t.process.steps.map((step) => (
                <li key={step.title} data-reveal>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section contact" id="contact" aria-labelledby="contact-title">
          <div className="container contact-shell" data-reveal>
            <div>
              <p className="eyebrow">{t.contact.eyebrow}</p>
              <h2 id="contact-title">{t.contact.title}</h2>
              <p>{t.contact.body}</p>
            </div>
            <div className="contact-actions">
              <a className="btn btn-primary" href="mailto:hola@chiclestudio.com?subject=Project%20brief">
                {t.contact.primaryCta}
              </a>
              <a className="btn btn-ghost" href="mailto:hola@chiclestudio.com?subject=Book%20strategy%20call">
                {t.contact.secondaryCta}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-shell">
          <p>
            © {new Date().getFullYear()} {t.footer.text}
          </p>
          <a href="#top">{t.footer.backToTop}</a>
        </div>
      </footer>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
