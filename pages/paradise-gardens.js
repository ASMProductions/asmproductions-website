import Layout from '../components/Layout';

export default function ParadiseGardens() {
  const offerings = [
    {
      title: 'Fasting Retreats',
      description:
        'Guided fasting disciplines rooted in How To Eat To Live philosophy. From foundational practices to mastery-level progression, in a supportive sanctuary environment.',
    },
    {
      title: 'Martial Arts & Movement',
      description:
        'Training in disciplines of internal martial arts, movement, and physical mastery. Cultivate strength, presence, and the warrior spirit.',
    },
    {
      title: 'Creative & Artistic Workshops',
      description:
        'Sessions in music, writing, visual arts, and creative expression. Tap into the creative dimensions of self-purification and mastery.',
    },
    {
      title: 'Meditation & Spiritual Practice',
      description:
        'Spaces and guidance for deep contemplative practice, spiritual inquiry, and the cultivation of inner peace.',
    },
    {
      title: 'Wellness Consultation',
      description:
        'Personalized guidance on nutrition, fasting protocols, movement, and integrated wellness tailored to individual goals and constitution.',
    },
    {
      title: 'Retreat Experiences',
      description:
        'Multi-day immersions designed for restoration, transformation, and the integration of mind, body, and spirit.',
    },
  ];

  return (
    <Layout>
      <section className="hero">
        <div className="container">
          <h1>Paradise Gardens</h1>
          <p>5.5 acres of sacred space. Wellness in all forms. Unrestricted for all.</p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="section">
        <div className="container">
          <h2>The Sanctuary Vision</h2>
          <div className="accent-line"></div>
          <p>
            Paradise Gardens is envisioned as a premier wellness retreat center—a place where individuals from all backgrounds come to pursue mastery, restoration, and transformation across every dimension of human experience.
          </p>
          <p>
            Built on 5.5 acres in Georgia, the retreat will integrate:
          </p>
          <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: '1.5rem' }}>
            {[
              'Sacred gardens cultivating produce and medicinal plants',
              'Meditation pavilions and contemplative spaces',
              'Movement and training facilities for martial arts and yoga',
              'Teaching spaces for workshops and group guidance',
              'Residential quarters for overnight guests',
              'Dining facilities emphasizing nutrition and fasting protocols',
              'Creative studios for music, art, and writing',
            ].map((item, idx) => (
              <li
                key={idx}
                style={{
                  padding: '0.75rem 0 0.75rem 2rem',
                  borderLeft: '3px solid #b8764e',
                  marginBottom: '0.5rem',
                  color: '#6b6b6b',
                  fontSize: '1rem',
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section">
        <div className="container">
          <h2>Core Philosophy</h2>
          <div className="accent-line"></div>
          <p>
            Paradise Gardens operates on a single principle: <strong>wellness in all forms, unrestricted for all.</strong>
          </p>
          <p>
            There is no single path to mastery. Guests arrive with different goals, constitutions, and practices. The retreat honors the diversity of the human journey while providing expert guidance, sacred space, and the community of practitioners committed to excellence.
          </p>
          <p>
            Whether your practice is fasting, movement, creative expression, spiritual inquiry, or the integration of all these—Paradise Gardens provides the container, the expertise, and the sanctuary in which transformation becomes possible.
          </p>
        </div>
      </section>

      {/* Offerings Section */}
      <section className="section">
        <div className="container">
          <h2>Offerings</h2>
          <div className="accent-line"></div>
          <div className="grid">
            {offerings.map((offering, idx) => (
              <div key={idx} className="card">
                <h3>{offering.title}</h3>
                <p>{offering.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Section */}
      <section className="section">
        <div className="container">
          <h2>Development Timeline</h2>
          <div className="accent-line"></div>
          <p>
            Paradise Gardens is currently in visionary phase, with groundwork and planning underway. The retreat will be developed in phases, prioritizing the creation of essential spaces for community gathering, teaching, and transformation.
          </p>
          <p>
            Interested in supporting this vision? <a href="/contact">Get in touch.</a>
          </p>
        </div>
      </section>
    </Layout>
  );
}
