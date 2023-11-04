import { Link } from 'react-router-dom';

import styles from './NotFound404.module.scss';

const NotFound404: React.FC = () => {
  const imgSrc = '/e404.jpeg';
  return (
    <div className={styles.root}>
      <img src={imgSrc} alt="Nothing not found" />
      <h2>Great shot kid. That was one in a million.</h2>
      <Link to="/">Let&apos;s get you home</Link>
    </div>
  );
};

export default NotFound404;
