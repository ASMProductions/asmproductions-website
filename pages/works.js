import Layout from '../components/Layout';

export default function Works() {
  const books = [
    {
      title: 'The Mukhlasin Diet',
      edition: '4th Edition | 374 Pages | 26 Chapters',
      cover: '/images/cover-mukhlasin.jpg',
      link: 'https://masterylevelfasting.com',
      description:
        'A comprehensive guide to the discipline of fasting rooted in the teachings of How To Eat To Live. The Mukhlasin philosophy centers on self-purification through sustained, high-level fasting mastery—not reduction in food quantity, but the cultivation of transcendent discipline.',
    },
    {
      title: 'Mastery Level Fasting',
      cover: '/images/cover-mastery.jpg',
      link: 'https://masterylevelfasting.com',
      description:
        'Advanced methodologies for practitioners ready to transcend the foundational stages. This work documents personal practice since 1990 and the principles that distinguish true mastery from mere abstinence.',
    },
    {
      title: 'The International Lover',
      cover: '/images/cover-international-lover.jpg',
      link: 'https://theinternationallover.com',
      description:
        'A comprehensive examination of vetting standards, matrimonial readiness, and the cultural frameworks necessary for sustainable, spiritually-grounded relationships across international contexts.',
    },
    {
      title: 'The Virtuous Girl',
      cover: '/images/cover-virtuous-girl.jpg',
      link: 'https://thevirtuousgirl.com',
      description:
        'Guidance for women seeking clarity on virtue, discipline, and the standards by which sustainable partnerships are built. A foundational text for the serious practitioner.',
    },
  ];

  const career = [
    { year: '1980', role: 'First CompuCamp', note: 'Where it began.' },
    { year: '1992', role: 'TeleTemps', note: 'Built computers from scratch.' },
    { year: '1995', role: 'IBM', note: 'Systems administration.' },
    { year: '1998', role: 'Mayo Clinic', note: 'Networking.' },
    { year: '2006', role: 'Carlson Companies', note: 'Systems administration across enterprise networks.' },
    { year: '2016', role: 'Black Knight', note: 'DevOps—builds, deployments, and server networks.' },
    { year: '2021', role: 'Senior Business Consultant', note: 'Managing Tier-1 banking relationships.' },
  ];

  const skills = [
    {
      category: 'DevOps & Platform Engineering',
      items: [
        'CI/CD Pipeline Architecture (Jenkins, GitHub Actions)',
        'Infrastructure as Code & Automation Frameworks',
        'Cloud Infrastructure (AWS, Azure, multi-cloud)',
        'Release Engineering & Deployment Orchestration',
        'High-Availability System Design & Operations',
      ],
    },
    {
      category: 'Infrastructure & Operations',
      items: [
        'Windows Server, Linux, UNIX Systems Administration',
        'SQL Server, Oracle, DB2 Database Infrastructure',
        'Enterprise Monitoring (Splunk, Dynatrace, AppDynamics)',
        'Disaster Recovery Planning & Execution',
        'Production Incident Response & Root Cause Analysis',
      ],
    },
    {
      category: 'Enterprise Systems',
      items: [
        'Mission-Critical Financial Systems Automation',
        'Compliance-Driven Infrastructure (SOX, ITIL, GDPR)',
        'Enterprise SaaS Deployment & Operations',
        'System Integration & Environment Management',
        'Secure Deployment Practices & Audit Compliance',
      ],
    },
    {
      category: 'Impact',
      items: [
        '35% reduction in production downtime through proactive reliability engineering',
        '60% improvement in operational efficiency via automation',
        'Trusted across Tier-1 banking institutions and government-backed entities',
        'Leadership of global technical teams',
        'Enterprise-scale infrastructure modernization',
      ],
    },
  ];

  return (
    <Layout>
      <section className="hero">
        <div className="container">
          <h1>Works</h1>
          <p>Books, the game, and technical mastery. The tangible output of decades of discipline and research.</p>
        </div>
      </section>

      {/* Books Section */}
      <section className="section">
        <div className="container">
          <h2>Books</h2>
          <div className="accent-line"></div>
          <div className="grid">
            {books.map((book, idx) => (
              <div key={idx} className="card">
                <a href={book.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={book.cover}
                    alt={`${book.title} cover`}
                    style={{
                      width: '100%',
                      maxWidth: '200px',
                      display: 'block',
                      margin: '0 auto 1.25rem',
                      borderRadius: '4px',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                    }}
                  />
                </a>
                <h3>{book.title}</h3>
                {book.edition && <p style={{ fontSize: '0.9rem', color: '#999' }}>{book.edition}</p>}
                <p>{book.description}</p>
                <a href={book.link} target="_blank" rel="noopener noreferrer" className="btn">
                  Learn More
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Game Section */}
      <section className="section">
        <div className="container">
          <h2>The Game</h2>
          <div className="accent-line"></div>
          <div className="card" style={{ maxWidth: '760px' }}>
            <a href="https://thereparationsgame.com" target="_blank" rel="noopener noreferrer">
              <img
                src="/images/reparations-game.jpg"
                alt="The Reparations Game — 400 years of Black American history across seven eras"
                style={{
                  width: '100%',
                  display: 'block',
                  margin: '0 0 1.5rem',
                  borderRadius: '4px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                }}
              />
            </a>
            <h3>The Reparations Game</h3>
            <p style={{ fontSize: '0.9rem', color: '#999' }}>
              Black Survival in White America · 74 Cards · 7 Eras
            </p>
            <p>
              An educational survival game spanning 400 years of documented history. Players take on a
              Foundational Black American lineage and move from the Sovereign Age through the Reparations
              Endgame—every card a choice, every era grounded in the historical record. Built to teach
              through play what textbooks leave out.
            </p>
            <a
              href="https://thereparationsgame.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              Enter the Game
            </a>
          </div>
        </div>
      </section>

      {/* Tech Skills Section */}
      <section className="section">
        <div className="container">
          <h2>Technical Mastery</h2>
          <div className="accent-line"></div>
          <p>
            My path in technology spans more than four decades—from my first CompuCamp in 1980 to building enterprise systems for some of the most demanding institutions in American technology, healthcare, and finance. What began with curiosity became a career defined by the same discipline that runs through everything I do.
          </p>
          <p>
            Along the way I have designed, built, and run mission-critical infrastructure, and applied that same builder's mindset to my own work: I built every platform represented on this site—Mastery Level Fasting, The International Lover, The Virtuous Girl, The Reparations Game, and this site itself—and I wrote the books that anchor them.
          </p>

          <div style={{ marginTop: '3rem' }}>
            {career.map((entry, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  padding: '1.25rem 0',
                  borderBottom: '1px solid #e8e6e3',
                  alignItems: 'baseline',
                }}
              >
                <div
                  style={{
                    flex: '0 0 60px',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#b8764e',
                  }}
                >
                  {entry.year}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '1.05rem' }}>{entry.role}</div>
                  <div style={{ color: '#6b6b6b', fontSize: '0.95rem', marginTop: '0.15rem' }}>
                    {entry.note}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '3.5rem' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Selected Work</h3>
            <div className="card" style={{ maxWidth: '600px' }}>
              <h4 style={{ marginTop: 0 }}>Digital Patient Registration System</h4>
              <p>
                A web-based intake platform built to replace paper registration in a pediatric
                practice—patient forms, validation, and submission handled end to end. Designed,
                built, and deployed independently.
              </p>
              <a
                href="https://zoe-registration-system.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                View Demo
              </a>
              <p style={{ fontSize: '0.82rem', color: '#999', marginTop: '0.85rem', marginBottom: 0 }}>
                Demo environment — may take a moment to wake on first load.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '3rem' }}>
            {skills.map((skillGroup, idx) => (
              <div key={idx} style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>{skillGroup.category}</h3>
                <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                  {skillGroup.items.map((item, itemIdx) => (
                    <li
                      key={itemIdx}
                      style={{
                        padding: '0.75rem 0',
                        borderBottom: '1px solid #e8e6e3',
                        fontSize: '0.95rem',
                        color: '#6b6b6b',
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
