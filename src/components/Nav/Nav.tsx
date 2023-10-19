import { Component } from 'react';

import { ICommonProps } from '../../types/types';

import styles from './Nav.module.scss';

const navLinks = [
  { label: 'People', href: '/' },
  { label: 'Films', href: '/' },
  { label: 'Starships', href: '/' },
  { label: 'Vehicles', href: '/' },
  { label: 'Species', href: '/' },
  { label: 'Planets', href: '/' },
];

class Nav extends Component<ICommonProps> {
  render() {
    const { hasError, triggerError } = this.props;
    const btnTriggerErrorClass = hasError ? styles.error : `${styles.error} ${styles.blink}`;
    return (
      <nav className={styles.nav}>
        {navLinks.map((link) => (
          <a key={link.label} className={styles.nav__link} href={link.href}>
            {link.label}
          </a>
        ))}
        <button onClick={triggerError} className={btnTriggerErrorClass} type="button">
          Generate Error
        </button>
      </nav>
    );
  }
}

export default Nav;
