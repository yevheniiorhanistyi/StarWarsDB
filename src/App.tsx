import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import router from './routes/router';
import { setupStore } from './redux/store';

const store = setupStore();

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
