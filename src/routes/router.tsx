import { createBrowserRouter } from 'react-router-dom';

import PrimaryLayout from '../layouts/PrimaryLayout';
import Main from '../pages/Main/Main';
import AdditionalInfo from '../components/AdditionalInfo/AdditionalInfo';
import NotFound404 from '../pages/NotFound404/NotFound404';

const router = createBrowserRouter([
  {
    element: <PrimaryLayout />,
    children: [
      {
        path: '/',
        element: <Main />,
        children: [
          {
            path: '',
            element: <AdditionalInfo />,
          },
        ],
      },
      {
        path: '/*',
        element: <NotFound404 />,
      },
    ],
  },
]);

export default router;
