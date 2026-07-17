import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

const CHORES = [
  { name: 'Breakfast clean-up', detail: 'dishes, floors, tables & counters' },
  { name: 'Lunch clean-up', detail: 'dishes, floors, tables & counters' },
  { name: 'Dinner clean-up', detail: 'dishes, floors, tables & counters' },
  { name: 'Room clean-up', detail: 'beds, floors & closet' },
  { name: 'Laundry', detail: 'wash, dry, fold & put away' },
];
const CHORES_LIST = CHORES.map((c) => c.name);

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function Chores() {
  const [authenticated, setAuthenticated] = useState(false);
  const [code, setCode] = useState('');
  const [accessError, setAccessError] = useState('');
  const [selectedChild, setSelectedChild] = useState('Mash\'Allah');
  const [chores, setChores] = useState({});
  const [weeklyTotal, setWeeklyTotal] = useState(0);
  const [allTimeTotal, setAllTimeTotal] = useState(0);
  const [submitMessage, setSubmitMessage] = useState('');
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('tracker');

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    if (authenticated) {
      loadChores();
    }
  }, [selectedChild, authenticated]);

  const checkSession = async () => {
    try {
      const res = await fetch('/api/session');
      const data = await res.json();
      if (data.valid) {
        setAuthenticated(true);
      }
    } catch (error) {
      console.error('Session check error:', error);
    }
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setAccessError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      if (res.ok) {
        setCode('');
        setAuthenticated(true);
      } else {
        setAccessError('Invalid access code. Please try again.');
      }
    } catch (error) {
      setAccessError('Error validating code. Please try again.');
    }
  };

  const loadChores = async () => {
    try {
      const res = await fetch(`/api/chores?child=${selectedChild}`);
      if (res.ok) {
        const data = await res.json();
        setChores(data.chores || {});
        setAllTimeTotal(data.totalEarningsAllTime || 0);
        setHistory(data.history || []);

        // Calculate weekly total
        let weekTotal = 0;
        Object.values(data.chores || {}).forEach((dayChores) => {
          Object.values(dayChores).forEach((isCompleted) => {
            if (isCompleted) weekTotal++;
          });
        });
        setWeeklyTotal(weekTotal);
      }
    } catch (error) {
      console.error('Error loading chores:', error);
    }
  };

  const handleChoreToggle = async (day, chore, currentStatus) => {
    try {
      const res = await fetch('/api/chores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          child: selectedChild,
          day: day,
          chore: chore,
          checked: !currentStatus,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setChores(data.chores);
        setWeeklyTotal(data.weeklyTotal);
        setAllTimeTotal(data.allTimeTotal);
        loadChores(); // Reload to get updated history
      }
    } catch (error) {
      console.error('Error updating chore:', error);
    }
  };

  const handleSubmitWeek = async () => {
    setSubmitMessage('');
    try {
      const res = await fetch('/api/chores', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ child: selectedChild }),
      });
      if (res.ok) {
        const data = await res.json();
        setSubmitMessage(
          `Week submitted for ${selectedChild}: ${data.weeklyTotal} chores logged ($${data.weeklyTotal}.00).`
        );
        loadChores();
      } else {
        setSubmitMessage('Could not submit the week. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('Could not submit the week. Please try again.');
    }
  };

  if (!authenticated) {
    return (
      <Layout>
        <section className="hero">
          <div className="container">
            <h1>Chores Dashboard</h1>
            <p>Family access only</p>
          </div>
        </section>

        <section className="section">
          <div className="container" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2>Enter Access Code</h2>
            <div className="accent-line"></div>

            <form onSubmit={handleCodeSubmit}>
              <input
                type="password"
                placeholder="Access Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
              <button type="submit" className="btn">
                Access Dashboard
              </button>
            </form>

            {accessError && (
              <p style={{ color: '#d97757', marginTop: '1rem', textAlign: 'center' }}>
                {accessError}
              </p>
            )}
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="hero">
        <div className="container">
          <h1>Chores Dashboard</h1>
          <p>Track your work and watch your earnings grow</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Child Selection */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            {['Mash\'Allah', 'Nur Islam'].map((child) => (
              <button
                key={child}
                onClick={() => setSelectedChild(child)}
                className={selectedChild === child ? 'btn' : 'btn btn-secondary'}
                style={{
                  background: selectedChild === child ? '#2a2a2a' : 'transparent',
                  color: selectedChild === child ? '#f5f3f0' : '#2a2a2a',
                  border: selectedChild === child ? 'none' : '2px solid #2a2a2a',
                }}
              >
                {child}
              </button>
            ))}
          </div>

          {/* Totals Display */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div
              style={{
                background: '#b8764e',
                color: '#f5f3f0',
                padding: '2rem',
                textAlign: 'center',
                borderRadius: '4px',
              }}
            >
              <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', opacity: 0.9 }}>This Week</p>
              <h2 style={{ margin: 0, color: '#f5f3f0' }}>${weeklyTotal}.00</h2>
            </div>
            <div
              style={{
                background: '#2a2a2a',
                color: '#f5f3f0',
                padding: '2rem',
                textAlign: 'center',
                borderRadius: '4px',
              }}
            >
              <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', opacity: 0.9 }}>All Time</p>
              <h2 style={{ margin: 0, color: '#f5f3f0' }}>${allTimeTotal}.00</h2>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '2px solid #e8e6e3' }}>
            <button
              onClick={() => setActiveTab('tracker')}
              style={{
                background: 'none',
                border: 'none',
                padding: '1rem',
                fontSize: '1rem',
                cursor: 'pointer',
                borderBottom: activeTab === 'tracker' ? '3px solid #b8764e' : 'none',
                color: activeTab === 'tracker' ? '#b8764e' : '#6b6b6b',
              }}
            >
              Weekly Tracker
            </button>
            <button
              onClick={() => setActiveTab('history')}
              style={{
                background: 'none',
                border: 'none',
                padding: '1rem',
                fontSize: '1rem',
                cursor: 'pointer',
                borderBottom: activeTab === 'history' ? '3px solid #b8764e' : 'none',
                color: activeTab === 'history' ? '#b8764e' : '#6b6b6b',
              }}
            >
              Earnings History
            </button>
          </div>

          {/* Weekly Tracker Tab */}
          {activeTab === 'tracker' && (
            <div style={{ overflowX: 'auto' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  marginBottom: '2rem',
                }}
              >
                <thead>
                  <tr style={{ background: '#f5f3f0', borderBottom: '2px solid #e8e6e3' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.9rem', fontWeight: 600 }}>Chore</th>
                    {DAYS.map((day) => (
                      <th key={day} style={{ padding: '1rem', textAlign: 'center', fontSize: '0.9rem', fontWeight: 600 }}>
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CHORES.map((choreObj) => (
                    <tr key={choreObj.name} style={{ borderBottom: '1px solid #e8e6e3' }}>
                      <td style={{ padding: '1rem', fontSize: '0.95rem', fontWeight: 500 }}>
                        {choreObj.name}
                        <div style={{ fontSize: '0.78rem', color: '#999', fontWeight: 400, marginTop: '0.15rem' }}>
                          {choreObj.detail}
                        </div>
                      </td>
                      {DAYS.map((day) => {
                        const chore = choreObj.name;
                        return (
                        <td
                          key={`${day}-${chore}`}
                          style={{
                            padding: '1rem',
                            textAlign: 'center',
                            background: chores[day] && chores[day][chore] ? '#f0f0f0' : 'transparent',
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={chores[day] && chores[day][chore] ? true : false}
                            onChange={() =>
                              handleChoreToggle(day, chore, chores[day] && chores[day][chore])
                            }
                            style={{
                              width: '24px',
                              height: '24px',
                              cursor: 'pointer',
                              accentColor: '#b8764e',
                            }}
                          />
                        </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <button onClick={handleSubmitWeek} className="btn">
                  Submit This Week
                </button>
                {submitMessage && (
                  <p style={{ marginTop: '1rem', color: '#b8764e', fontWeight: 500 }}>
                    {submitMessage}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div>
              <h3>Weekly Earnings History</h3>
              <div style={{ marginTop: '1.5rem' }}>
                {history.length === 0 ? (
                  <p style={{ color: '#6b6b6b' }}>No history yet. Complete chores to see your earnings!</p>
                ) : (
                  <div>
                    {history
                      .sort((a, b) => new Date(b.week) - new Date(a.week))
                      .map((entry, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '1rem',
                            borderBottom: '1px solid #e8e6e3',
                          }}
                        >
                          <div>
                            <p style={{ margin: '0 0 0.25rem 0', fontWeight: 500 }}>
                              Week of {new Date(entry.week).toLocaleDateString()}
                            </p>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#6b6b6b' }}>
                              {entry.total} chores completed
                            </p>
                          </div>
                          <div
                            style={{
                              background: '#b8764e',
                              color: '#f5f3f0',
                              padding: '0.75rem 1.5rem',
                              borderRadius: '4px',
                              fontWeight: 600,
                            }}
                          >
                            ${entry.total}.00
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
