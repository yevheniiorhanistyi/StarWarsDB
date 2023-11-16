import { RouterProvider } from 'react-router-dom';
import { CharListDataProvider } from './components/CharListDataProvider/CharListDataProvider';
import { SearchInputProvider } from './components/SearchInputProvider/SearchInputProvider';

import router from './routes/router';

function App() {
  return (
    <CharListDataProvider>
      <SearchInputProvider>
        <RouterProvider router={router} />
      </SearchInputProvider>
    </CharListDataProvider>
  );
}

export default App;
