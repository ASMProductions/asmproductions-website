import Layout from '../components/Layout';

export default function Works() {
  const books = [
    {
      title: 'The Mukhlasin Diet',
      edition: '4th Edition | 374 Pages | 26 Chapters',
      description:
        'A comprehensive guide to the discipline of fasting rooted in the teachings of How To Eat To Live. The Mukhlasin philosophy centers on self-purification through sustained, high-level fasting mastery—not reduction in food quantity, but the cultivation of transcendent discipline.',
    },
    {
      title: 'Mastery Level Fasting',
      description:
        'Advanced methodologies for practitioners ready to transcend the foundational stages. This work documents 35+ years of personal practice and the principles that distinguish true mastery from mere abstinence.',
    },
    {
      title: 'The International Lover',
      description:
        'A comprehensive examination of vetting standards, matrimonial readiness, and the cultural frameworks necessary for sustainable, spiritually-grounded relationships across international contexts.',
    },
    {
      title: 'The Virtuous Girl',
      description:
        'Guidance for women seeking clarity on virtue, discipline, and the standards by which sustainable partnerships are built. A foundational text for the serious practitioner.',
    },
  ];

  const platforms = [
    {
      name: 'Mastery Level Fasting',
      url: 'https://masterylevelfasting.com',
      description:
        'The flagship platform. A complete learning ecosystem for fasting discipline, community, and mastery-level progression.',
    },
    {
      name: 'The International Lover',
      url: 'https://theinternationallover.com',
      description:
        'Matrimonial standards, vetting frameworks, and the philosophy of relationship readiness across cultures.',
    },
    {
      name: 'The Virtuous Girl',
      url: 'https://thevirtuousgirl.com',
      description:
        'A dedicated community and resource hub for women pursuing excellence and virtuous living.',
    },
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
        'Tier-1 institutional trust across JPMorgan Chase, Wells Fargo, and government-backed entities',
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
          <p>Books, platforms, and technical mastery. The tangible output of decades of discipline and research.</p>
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
                <h3>{book.title}</h3>
                {book.edition && <p style={{ fontSize: '0.9rem', color: '#999' }}>{book.edition}</p>}
                <p>{book.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="section">
        <div className="container">
          <h2>Digital Platforms</h2>
          <div className="accent-line"></div>
          <div className="grid">
            {platforms.map((platform, idx) => (
              <div key={idx} className="card">
                <h3>{platform.name}</h3>
                <p>{platform.description}</p>
                <a href={platform.url} target="_blank" rel="noopener noreferrer" className="btn">
                  Visit Platform
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Skills Section */}
      <section className="section">
        <div className="container">
          <h2>Technical Mastery</h2>
          <div className="accent-line"></div>
          <p>
            9+ years of enterprise infrastructure automation, supporting mission-critical financial systems and Tier-1 institutions. Specialized in CI/CD architecture, cloud infrastructure, and compliance-driven deployment frameworks.
          </p>

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
