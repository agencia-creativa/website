import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'

type CaseStudy = {
  id: string
  brand: string
  category: string
  challenge: string
  approach: string
  impact: string[]
  services: string[]
}

const caseStudies: CaseStudy[] = [
  {
    id: 'fucesa',
    brand: 'FUCESA',
    category: 'Industrial & Institutional',
    challenge: 'A fragmented web presence was reducing trust and slowing qualified lead conversion.',
    approach:
      'We rebuilt the conversion journey, introduced a clearer service architecture, and improved SEO discoverability for high-intent queries.',
    impact: ['Faster first-contact path', 'Stronger procurement-ready positioning', 'Improved lead quality tracking'],
    services: ['Website strategy', 'UX/UI redesign', 'Technical SEO foundation'],
  },
  {
    id: 'cretia',
    brand: 'Cretia',
    category: 'SaaS Product',
    challenge: 'Positioning and activation friction were limiting product adoption and retention momentum.',
    approach:
      'We clarified value messaging, streamlined onboarding narratives, and connected lifecycle touchpoints to measurable activation events.',
    impact: ['Sharper product value communication', 'Cleaner activation funnel', 'Retention-oriented messaging system'],
    services: ['Product positioning', 'Lifecycle marketing', 'Analytics instrumentation'],
  },
  {
    id: 'tolo',
    brand: 'TOLO Café',
    category: 'Hospitality & Retail',
    challenge: 'Local discovery was high, but conversion into repeat digital revenue was inconsistent.',
    approach:
      'We crafted a brand-forward digital experience and campaign framework built to convert first-time visitors into repeat buyers.',
    impact: ['Higher campaign landing clarity', 'Better repeat-purchase communication', 'Operationally simple growth playbooks'],
    services: ['Brand storytelling', 'Campaign system design', 'Performance marketing support'],
  },
]

function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header" aria-label="Top navigation">
        <div className="container nav-shell">
          <a className="brand" href="#top" aria-label="Agencia Creativa home">
            Agencia Creativa
          </a>
          <nav className="main-nav" aria-label="Primary">
            <a href="#services">Services</a>
            <a href="#work">Case studies</a>
            <a href="#process">Process</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="nav-cta" href="mailto:hola@agencia-creativa.com?subject=New%20project%20inquiry">
            Book strategy call
          </a>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="container hero-grid">
            <div>
              <p className="eyebrow">Premium digital execution studio</p>
              <h1 id="hero-title">Design craft, growth strategy, and engineering — aligned to revenue.</h1>
              <p className="hero-copy">
                We help ambitious teams launch high-performing digital experiences with strong visual polish,
                measurable conversion paths, and SEO-ready foundations.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="mailto:hola@agencia-creativa.com?subject=Start%20a%20project">
                  Start your project
                </a>
                <a className="btn btn-ghost" href="#work">
                  See case studies
                </a>
              </div>
              <ul className="trust-points" aria-label="Trust signals">
                <li>Cross-functional team: design + marketing + engineering</li>
                <li>Cloudflare-first deployment and performance discipline</li>
                <li>Transparent sprint cadence and executive reporting</li>
              </ul>
            </div>
            <aside className="hero-panel" aria-label="At a glance">
              <p className="eyebrow">What we optimize</p>
              <h2>From first impression to conversion.</h2>
              <ul>
                <li>High-trust visual systems and interface consistency</li>
                <li>Information architecture and semantic content structure</li>
                <li>Conversion-focused journeys with measurable handoff points</li>
              </ul>
            </aside>
          </div>
        </section>

        <section className="section" id="services" aria-labelledby="services-title">
          <div className="container">
            <p className="eyebrow">Services</p>
            <h2 id="services-title">Built for launch speed and long-term scale.</h2>
            <div className="service-grid">
              <article className="surface-card">
                <h3>Brand & Experience Design</h3>
                <p>
                  Visual systems, interface design, and conversion-aware content hierarchy that elevate perceived
                  quality and user confidence.
                </p>
              </article>
              <article className="surface-card">
                <h3>SEO & Growth Foundations</h3>
                <p>
                  Technical SEO, on-page architecture, metadata systems, and measurement-ready content strategy to
                  improve discoverability.
                </p>
              </article>
              <article className="surface-card">
                <h3>Web Engineering & Performance</h3>
                <p>
                  Modern React implementations with deployment hygiene, asset optimization, and robust responsive
                  behavior across devices.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="work" aria-labelledby="work-title">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="eyebrow">Selected work</p>
                <h2 id="work-title">Case studies with clear business narratives.</h2>
              </div>
              <a className="text-link" href="mailto:hola@agencia-creativa.com?subject=Request%20full%20case%20study">
                Request full case-study deck
              </a>
            </div>
            <div className="case-grid">
              {caseStudies.map((item) => (
                <article key={item.id} id={`case-${item.id}`} className="case-card" aria-labelledby={`${item.id}-title`}>
                  <p className="case-meta">
                    <span>{item.brand}</span>
                    <span>{item.category}</span>
                  </p>
                  <h3 id={`${item.id}-title`}>{item.challenge}</h3>
                  <p>{item.approach}</p>

                  <h4>Impact highlights</h4>
                  <ul>
                    {item.impact.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>

                  <h4>Scope delivered</h4>
                  <ul className="chip-list">
                    {item.services.map((service) => (
                      <li key={service}>{service}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="process" aria-labelledby="process-title">
          <div className="container">
            <p className="eyebrow">Execution model</p>
            <h2 id="process-title">A disciplined process that keeps momentum high.</h2>
            <ol className="process-grid">
              <li>
                <h3>01 — Discover</h3>
                <p>Business goals, audience intent, and opportunity mapping.</p>
              </li>
              <li>
                <h3>02 — Design</h3>
                <p>Premium UI craft, narrative structure, and conversion-focused interaction design.</p>
              </li>
              <li>
                <h3>03 — Build</h3>
                <p>Performance-aware implementation with SEO and analytics baked in from day one.</p>
              </li>
              <li>
                <h3>04 — Grow</h3>
                <p>Continuous optimization through measurable experiments and executive-level reporting.</p>
              </li>
            </ol>
          </div>
        </section>

        <section className="section contact" id="contact" aria-labelledby="contact-title">
          <div className="container contact-shell">
            <div>
              <p className="eyebrow">Ready to scale?</p>
              <h2 id="contact-title">Let’s launch your next high-impact digital experience.</h2>
              <p>
                Share your goals and timelines. We’ll reply with a focused proposal covering scope, milestones,
                and expected business outcomes.
              </p>
            </div>
            <div className="contact-actions">
              <a className="btn btn-primary" href="mailto:hola@agencia-creativa.com?subject=Project%20brief">
                Email project brief
              </a>
              <a className="btn btn-ghost" href="mailto:hola@agencia-creativa.com?subject=Book%20strategy%20call">
                Book a strategy call
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-shell">
          <p>© {new Date().getFullYear()} Agencia Creativa. Built for speed, clarity, and growth.</p>
          <a href="#top">Back to top</a>
        </div>
      </footer>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
