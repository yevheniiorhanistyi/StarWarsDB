import { createBrowserRouter } from 'react-router-dom';

import PrimaryLayout from '../layouts/PrimaryLayout';
import Main from '../pages/Main/Main';
import People from '../pages/People/People';
import AdditionalInfo from '../components/AdditionalInfo/AdditionalInfo';
import NotFound404 from '../pages/NotFound404/NotFound404';

import ReactHookFormComponent from '../components/Forms/ReactHookFormComponent';
import UncontrolledFormComponent from '../components/Forms/UncontrolledFormComponent';

const router = createBrowserRouter([
  {
    element: <PrimaryLayout />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: '/people',
        element: <People />,
        children: [
          {
            path: '',
            element: <AdditionalInfo />,
          },
        ],
      },
      {
        path: '/uncontrolled-form',
        element: <UncontrolledFormComponent />,
      },
      {
        path: '/react-hook-form',
        element: <ReactHookFormComponent />,
      },
      {
        path: '/*',
        element: <NotFound404 />,
      },
    ],
  },
]);

export default router;
