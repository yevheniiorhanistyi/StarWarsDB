import { Link } from 'react-router-dom';

import styles from './Nav.module.scss';

const navLinks = [
  { label: 'People', href: '/' },
  { label: 'Films', href: '/' },
  { label: 'Starships', href: '/' },
  { label: 'Vehicles', href: '/' },
  { label: 'Species', href: '/' },
  { label: 'Planets', href: '/' },
];

const Nav: React.FC = () => (
  <nav className={styles.nav}>
    {navLinks.map((link) => (
      <Link key={link.label} className={styles.nav__link} to={link.href}>
        {link.label}
      </Link>
    ))}
  </nav>
);

export default Nav;
