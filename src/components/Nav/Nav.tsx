import { Component } from 'react';

import styles from './Nav.module.scss';

const navLinks = [
  { label: 'People', href: '/' },
  { label: 'Films', href: '/' },
  { label: 'Starships', href: '/' },
  { label: 'Vehicles', href: '/' },
  { label: 'Species', href: '/' },
  { label: 'Planets', href: '/' },
];

class Nav extends Component {
  render() {
    return (
      <nav className={styles.nav}>
        {navLinks.map((link) => (
          <a key={link.label} className={styles.nav__link} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
    );
  }
}

export default Nav;
