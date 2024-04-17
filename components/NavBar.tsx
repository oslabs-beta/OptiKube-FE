// components/NavBar.tsx

// **DO NOT USE, CODEBLOCK BREAKS APPLICAITON**
import React from 'react';
import Link from 'next/link';

const NavBar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a> {/* Ensure anchor tags are used within Link for valid HTML */}
          </Link>
        </li>
        <li>
          <Link href="/analysis">
            <a>Analysis</a> {/* Ensure anchor tags are used within Link for valid HTML */}
          </Link>
        </li>
        {/* More navigation links */}
      </ul>
    </nav>
  );
}

export default NavBar;