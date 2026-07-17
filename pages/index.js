import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <section className="hero">
        <div className="container">
          <img
            src="/images/amin-profile.jpg"
            alt="Amin Muhammad"
            style={{
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              objectFit: 'cover',
              margin: '0 auto 1.5rem',
              display: 'block',
              border: '3px solid rgba(245, 243, 240, 0.2)',
            }}
          />
          <h1>Amin Muhammad</h1>
          <p>Renaissance Man</p>
          <p style={{ marginTop: '2rem', fontSize: '1rem', opacity: 0.9 }}>
            Unified across discipline, infrastructure mastery, creative arts, and the philosophy of self-purification.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>A Life of Mastery</h2>
          <div className="accent-line"></div>
          <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 340px' }}>
              <p>
                For over three decades, I've pursued mastery across seemingly disparate domains: enterprise infrastructure automation, sacred fasting discipline, creative expression, martial arts, and the visionary development of spaces for unrestricted wellness. These are not separate lives—they are expressions of a single commitment: sustained discipline, self-purification, and service.
              </p>
              <p>
                From pioneering Minnesota's first Hip-Hop B-Boy crew in 1982, to engineering mission-critical financial systems for Tier-1 institutions, to authoring foundational works on fasting and matrimonial readiness, to witnessing Prince's passing at Paisley Park, my path has been defined by presence, precision, and the relentless pursuit of excellence.
              </p>
              <p>
                This site is a record of that journey.
              </p>
            </div>
            <img
              src="/images/amin-side.jpg"
              alt="Amin Muhammad"
              style={{
                flex: '1 1 340px',
                width: '100%',
                maxWidth: '480px',
                borderRadius: '4px',
                objectFit: 'cover',
              }}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Explore</h2>
          <div className="accent-line"></div>
          <div className="grid" style={{ marginTop: '2rem' }}>
            <div className="card">
              <h3>Works</h3>
              <p>Books, platforms, and technical contributions. The tangible output of decades of research and application.</p>
              <a href="/works" className="btn">View Works</a>
            </div>
            <div className="card">
              <h3>Paradise Gardens</h3>
              <p>A 5.5-acre wellness sanctuary. Unrestricted wellness in all forms. Vision, concept, and the future of holistic retreat.</p>
              <a href="/paradise-gardens" className="btn">Explore Vision</a>
            </div>
            <div className="card">
              <h3>History</h3>
              <p>B-Boy pioneer. Martial artist. Musician. Witness to greatness. The thread that connects it all.</p>
              <a href="/history" className="btn">Read History</a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
