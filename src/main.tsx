import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'

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
    </main>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
