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
  visual: string
  stat: string
  statLabel: string
}

const caseStudies: CaseStudy[] = [
  {
    id: 'fucesa',
    brand: 'FUCESA',
    category: 'Industrial & Institutional',
    challenge: 'A fragmented web presence was reducing trust and slowing qualified lead conversion.',
    approach:
      'We rebuilt the conversion journey, introduced a clearer service architecture, and improved SEO discoverability for high-intent queries.',
    impact: ['Clearer procurement buyer pathway', 'Stronger technical credibility in first session', 'Higher lead-intent qualification'],
    services: ['Website strategy', 'UX/UI redesign', 'Technical SEO foundation'],
    visual: '/assets/case-fucesa.svg',
    stat: '38%',
    statLabel: 'faster first-contact path',
  },
  {
    id: 'cretia',
    brand: 'Cretia',
    category: 'SaaS Product',
    challenge: 'Positioning and activation friction were limiting product adoption and retention momentum.',
    approach:
      'We clarified value messaging, streamlined onboarding narratives, and connected lifecycle touchpoints to measurable activation events.',
    impact: ['Sharper product value communication', 'Cleaner activation funnel narrative', 'Retention-oriented messaging system'],
    services: ['Product positioning', 'Lifecycle marketing', 'Analytics instrumentation'],
    visual: '/assets/case-cretia.svg',
    stat: '2.1x',
    statLabel: 'increase in trial-to-activation rate',
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
    visual: '/assets/case-tolo.svg',
    stat: '+47%',
    statLabel: 'increase in returning buyer journeys',
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
            <div className="hero-copy-shell" data-reveal>
              <p className="eyebrow">Premium digital execution studio</p>
              <h1 id="hero-title">Award-level digital craft built to convert with clarity.</h1>
              <p className="hero-copy">
                We design and engineer premium web experiences where visual direction, conversion architecture, and SEO
                discipline move together.
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
                <li>Design + marketing + engineering in one accountable team</li>
                <li>Performance-safe visual craft with fast rendering discipline</li>
                <li>Executive visibility from strategy through launch</li>
              </ul>
            </div>

            <aside className="hero-visual" aria-label="Studio highlights" data-reveal>
              <img
                src="/assets/hero-studio.svg"
                loading="eager"
                width="620"
                height="720"
                decoding="async"
                alt="Abstract editorial collage representing premium digital direction"
              />
              <div className="hero-kpis">
                <article>
                  <strong>120ms</strong>
                  <span>interaction-ready components</span>
                </article>
                <article>
                  <strong>94+</strong>
                  <span>Lighthouse performance baseline</span>
                </article>
              </div>
            </aside>
          </div>
        </section>

        <section className="section section-services" id="services" aria-labelledby="services-title">
          <div className="container editorial-grid">
            <div data-reveal>
              <p className="eyebrow">Services</p>
              <h2 id="services-title">Built for launch speed and long-term brand authority.</h2>
              <p>
                Every engagement blends visual systems, messaging hierarchy, and technical execution into a durable
                growth foundation.
              </p>
            </div>
            <div className="service-grid">
              <article className="surface-card" data-reveal>
                <h3>Brand & Experience Direction</h3>
                <p>Visual systems, interface composition, and storytelling layers that increase trust instantly.</p>
              </article>
              <article className="surface-card" data-reveal>
                <h3>SEO & Growth Foundation</h3>
                <p>Technical SEO, semantic architecture, and conversion content logic for discoverability and intent.</p>
              </article>
              <article className="surface-card" data-reveal>
                <h3>Performance Engineering</h3>
                <p>Fast, resilient React implementations shipped with deployment and measurement discipline.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="work" aria-labelledby="work-title">
          <div className="container">
            <div className="section-head" data-reveal>
              <div>
                <p className="eyebrow">Selected work</p>
                <h2 id="work-title">Case studies with richer narrative and visual context.</h2>
              </div>
              <a className="text-link" href="mailto:hola@agencia-creativa.com?subject=Request%20full%20case%20study">
                Request full case-study deck
              </a>
            </div>
            <div className="case-grid">
              {caseStudies.map((item, index) => (
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
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="process" aria-labelledby="process-title">
          <div className="container">
            <p className="eyebrow" data-reveal>
              Execution model
            </p>
            <h2 id="process-title" data-reveal>
              A disciplined cadence with craft-level detail at every stage.
            </h2>
            <ol className="process-grid">
              <li data-reveal>
                <h3>01 — Discover</h3>
                <p>Business goals, audience intent, and opportunity mapping.</p>
              </li>
              <li data-reveal>
                <h3>02 — Art direct</h3>
                <p>Editorial composition, visual hierarchy, and conversion-safe interface language.</p>
              </li>
              <li data-reveal>
                <h3>03 — Build</h3>
                <p>Performance-aware implementation with SEO and analytics from day one.</p>
              </li>
              <li data-reveal>
                <h3>04 — Optimize</h3>
                <p>Continuous experimentation, reporting, and iterative refinement.</p>
              </li>
            </ol>
          </div>
        </section>

        <section className="section contact" id="contact" aria-labelledby="contact-title">
          <div className="container contact-shell" data-reveal>
            <div>
              <p className="eyebrow">Ready to scale?</p>
              <h2 id="contact-title">Let’s launch your next high-impact digital experience.</h2>
              <p>
                Share your goals and timelines. We’ll reply with a focused proposal covering scope, milestones, and
                expected business outcomes.
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
