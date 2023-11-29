import { Outlet } from 'react-router';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

import styles from './PrimaryLayout.module.scss';

const PrimaryLayout: React.FC = () => (
  <>
    <Header />
    <main className={styles.main}>
      <div className={styles.container}>
        <Outlet />
      </div>
    </main>
    <Footer />
  </>
);

export default PrimaryLayout;
