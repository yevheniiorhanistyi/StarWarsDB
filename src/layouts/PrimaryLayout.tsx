import { Outlet } from 'react-router';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const PrimaryLayout: React.FC = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

export default PrimaryLayout;
