import Link from 'next/link';
import React from 'react';
import styles from '../styles/navbar.module.css';

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navLinks}>
        <li className={styles.navLinkItem}>
          <Link href="/">
            Main Page
          </Link>
        </li>
        <li className={styles.navLinkItem}>
          <Link href="/books">
            Books
          </Link>
        </li>
        <li className={styles.navLinkItem}>
          <Link href="/favorites">
            Favorites
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;



