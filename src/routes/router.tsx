import { createBrowserRouter } from 'react-router-dom';

import PrimaryLayout from '../layouts/PrimaryLayout';
import Main from '../pages/Main/Main';
import AdditionalInfo from '../components/AdditionalInfo/AdditionalInfo';

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
    ],
  },
]);

export default router;
