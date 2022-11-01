import React from 'react';
import { Header } from '@/components/Header';
import Router from '@/routes';
import '@style/App.less';

function App() {
  return (
    <div className='App'>
      <Header />
      <Router />
    </div>
  );
}

export default App;
