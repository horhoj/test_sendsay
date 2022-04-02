import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { routeList } from './routeList';
import { RedirectExecutor } from './RedirectExecutor';
import { getRoutePath } from './helpers';

export const Router: FC = () => {
  return (
    <>
      <Routes>
        <Route
          path={'/'}
          element={<Navigate to={getRoutePath('ConstructorPage')} />}
        />
        {routeList.map((route) => (
          <Route
            path={route.path}
            key={route.name}
            element={<route.component />}
          />
        ))}
      </Routes>
      <RedirectExecutor />
    </>
  );
};
