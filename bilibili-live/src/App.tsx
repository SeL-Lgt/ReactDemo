import React from 'react';
import './App.css';
import { useRoutes } from 'react-router-dom';
import { routes } from '@/routes';

function App() {
  const elementRoute = useRoutes(routes);
  return <div className='App'>{elementRoute}</div>;
}

export default App;
