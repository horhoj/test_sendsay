import { FC } from 'react';
import { Page404 } from '../pages/Page404';
import { ConstructorPage } from '../pages/ConstructorPage';
import { RuntimePage } from '../pages/RuntimePage';

interface RouteItem {
  name: Routes;
  path: string;
  component: FC;
}

export type Routes = 'Page404' | 'ConstructorPage' | 'RuntimePage';

export const routeList: RouteItem[] = [
  {
    name: 'ConstructorPage',
    path: '/constructor-page',
    component: ConstructorPage,
  },
  {
    name: 'RuntimePage',
    path: '/runtime-page',
    component: RuntimePage,
  },
  {
    name: 'Page404',
    path: '*',
    component: Page404,
  },
];
