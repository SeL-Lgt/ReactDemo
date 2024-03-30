import React from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import ShouYe from '@/pages/ShouYe';
import { NotFound } from '@/pages/NotFound';

const routeList: RouteObject[] = [
  {
    path: '/',
    element: <ShouYe />,
  },
  {
    path: '/shouye',
    element: <ShouYe />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

const Router = () => {
  const routes = useRoutes(routeList);
  return routes;
};

export default Router;
