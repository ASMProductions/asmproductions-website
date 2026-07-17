import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <>
      <header>
        <div className="container">
          <h1>ASM Productions</h1>
          <nav>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/works">Works</Link></li>
              <li><Link href="/paradise-gardens">Paradise Gardens</Link></li>
              <li><Link href="/history">History</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer>
        <div className="container">
          <p>&copy; 2026 ASM Productions. All rights reserved.</p>
          <p>Amin Muhammad | Ellerslie, Georgia</p>
        </div>
      </footer>
    </>
  );
}
