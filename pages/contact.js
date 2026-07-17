import { useState } from 'react';
import Layout from '../components/Layout';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      // For now, just log the data. In production, this would send to an email service.
      console.log('Contact form submitted:', formData);
      setStatus('Thank you for your message. I will be in touch soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('Error sending message. Please try again.');
    }
  };

  return (
    <Layout>
      <section className="hero">
        <div className="container">
          <h1>Contact</h1>
          <p>Get in touch with ASM Productions.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2>Send a Message</h2>
            <div className="accent-line"></div>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <button type="submit" className="btn">
                Send
              </button>
            </form>

            {status && (
              <p style={{ marginTop: '1.5rem', textAlign: 'center', color: '#b8764e' }}>
                {status}
              </p>
            )}

            <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e8e6e3' }}>
              <h3>Connect Directly</h3>
              <p>
                Email: <a href="mailto:amin@asmproductions.co">amin@asmproductions.co</a>
              </p>
              <p>
                Phone: <a href="tel:651-226-6913">651-226-6913</a>
              </p>
              <p>
                Location: Ellerslie, Georgia
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
