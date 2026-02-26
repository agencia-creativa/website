import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'

type CaseStudy = {
  id: string
  brand: string
  domain: string
  summary: string
  services: string[]
  placeholders: string[]
}

const caseStudies: CaseStudy[] = [
  {
    id: 'fucesa',
    brand: 'FUCESA',
    domain: 'fucesa.com',
    summary:
      'Website and digital funnel optimization for a stronger institutional presence and measurable lead growth.',
    services: ['Website strategy', 'UX/UI improvements', 'SEO foundation'],
    placeholders: ['[Pending] Qualified leads increase (%)', '[Pending] Conversion rate uplift (%)', '[Pending] Time-to-first-contact reduction'],
  },
  {
    id: 'cretia',
    brand: 'Cretia',
    domain: 'cretia.app',
    summary:
      'Product positioning and growth experimentation to improve activation, retention, and product clarity.',
    services: ['Product messaging', 'Lifecycle marketing', 'Analytics instrumentation'],
    placeholders: ['[Pending] Activation rate improvement (%)', '[Pending] 30-day retention delta (%)', '[Pending] CAC payback period'],
  },
  {
    id: 'tolo',
    brand: 'TOLO Café',
    domain: 'tolo.cafe',
    summary:
      'Brand-forward web experience and campaign engine to convert local discovery into repeat sales.',
    services: ['Brand storytelling', 'Campaign landing pages', 'Performance campaigns'],
    placeholders: ['[Pending] Online orders growth (%)', '[Pending] Campaign ROAS', '[Pending] Repeat purchase lift (%)'],
  },
]

function App() {
  return (
    <main className="wrap">
      <section className="hero">
        <p className="kicker">Agencia Creativa</p>
        <h1>Build fast. Ship beautifully.</h1>
        <p>
          We combine design, marketing, and engineering to launch digital products and
          campaigns with measurable business impact.
        </p>
        <a className="cta" href="mailto:hola@agencia-creativa.com">Start a project</a>
      </section>

      <section>
        <h2>Services</h2>
        <ul>
          <li>Brand & visual systems</li>
          <li>Website design and development</li>
          <li>Performance marketing and SEO</li>
        </ul>
      </section>

      <section>
        <h2>Clients</h2>
        <div className="clients-grid">
          {caseStudies.map((item) => (
            <a key={item.id} className="client-pill" href={`#case-${item.id}`}>
              {item.brand} <span>{item.domain}</span>
            </a>
          ))}
        </div>
      </section>

      <section>
        <h2>Case Studies</h2>
        <p>
          We are currently expanding these case studies. Live outcomes and KPI deltas will be
          published once final reporting is validated with each brand team.
        </p>
        <div className="cards">
          {caseStudies.map((item) => (
            <article key={item.id} id={`case-${item.id}`} className="card">
              <p className="kicker">{item.domain}</p>
              <h3>{item.brand}</h3>
              <p>{item.summary}</p>

              <h4>Scope</h4>
              <ul>
                {item.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>

              <h4>Results (pending final validation)</h4>
              <ul>
                {item.placeholders.map((metric) => (
                  <li key={metric}>{metric}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
