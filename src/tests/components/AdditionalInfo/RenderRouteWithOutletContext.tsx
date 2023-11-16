import { ReactNode } from 'react';
import { MemoryRouter, Outlet, Route, Routes, SetURLSearchParams } from 'react-router-dom';

type ContextType = { frontPage: number; charId: string; setSearchParams: SetURLSearchParams };

interface RenderRouteWithOutletContextProps<T = ContextType> {
  context: T;
  children: ReactNode;
}

export const RenderRouteWithOutletContext = <T,>({ context, children }: RenderRouteWithOutletContextProps<T>) => (
  <MemoryRouter>
    <Routes>
      <Route path="" element={<Outlet context={context as T} />}>
        <Route index element={children} />
      </Route>
    </Routes>
  </MemoryRouter>
);

export default RenderRouteWithOutletContext;
