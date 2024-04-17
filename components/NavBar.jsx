// components/NavBar.jsx

import Link from 'next/link';

export default function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            Home
          </Link>
        </li>
        <li>
          <Link href="/analysis">
            Analysis
          </Link>
        </li>
        {/* More navigation links */}
      </ul>
    </nav>
  );
}
