import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectFormData } from '../../redux/selectors';
import { decodeBase64Image } from '../../utils';

import styles from './Main.module.scss';

const Main: React.FC = () => {
  const { users } = useSelector(selectFormData);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [decodedPictures, setDecodedPictures] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const decodePictures = async () => {
      const decodedPicturesMap: { [key: string]: string } = {};

      await Promise.all(
        users.map(async (user) => {
          if (user.picture && !decodedPicturesMap[user.firstName]) {
            const base64String = typeof user.picture === 'string' ? user.picture : '';
            const imageUrl = await decodeBase64Image(base64String);
            decodedPicturesMap[user.id] = imageUrl;
          }
        }),
      );

      setDecodedPictures(decodedPicturesMap);
    };

    decodePictures();
  }, [users]);

  useEffect(() => {
    setHighlightedIndex(0);
    const timeoutId = setTimeout(() => {
      setHighlightedIndex(-1);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Welcome to Star Wars DB, where every fan finds their corner of the Galaxy!</h1>
      <p className={styles.subtitle}>
        Register to join discussions and stay updated on the latest news from a galaxy far, far away. May the Force be
        with you!
      </p>
      <div className={styles.nav}>
        <Link className={styles.link} to="/uncontrolled-form">
          Explore the Uncontrolled Form
        </Link>
        <Link className={styles.link} to="/react-hook-form">
          Discover the React Hook Form
        </Link>
      </div>
      {users
        .slice()
        .reverse()
        .map((user, index) => (
          <div key={user.firstName} className={`${styles.user} ${index === highlightedIndex ? styles.lastUser : ''}`}>
            {decodedPictures[user.id] && <img src={decodedPictures[user.id]} alt={`User Avatar - ${user.id}`} />}
            <p>Name: {user.firstName}</p>
            <p>Age: {user.age}</p>
            <p>Email: {user.email}</p>
            <p>Password: {user.password && user.password.slice(0, 4)}...</p>
            <p>Accept T&C: {user.conditions && 'Yes'}</p>
          </div>
        ))}
    </div>
  );
};

export default Main;
