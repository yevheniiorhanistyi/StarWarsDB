import Nav from '../Nav/Nav';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  const logo = '/logos/star_wars.png';
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.outerBox}>
          <a href="/">
            <img className={styles.header__logo} src={logo} alt="Star Wars" />
          </a>
          <Nav />
        </div>
      </div>
    </header>
  );
};

export default Header;
