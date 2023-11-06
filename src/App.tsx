import { RouterProvider } from 'react-router-dom';
import { CharListDataProvider } from './components/CharListDataProvider/CharListDataProvider';

import router from './routes/router';

function App() {
  return (
    <CharListDataProvider>
      <RouterProvider router={router} />
    </CharListDataProvider>
  );
}

export default App;
