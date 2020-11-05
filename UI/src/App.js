import React from 'react';
import './App.scss';
import AppRoutes from './routing/AppRoutes';
import {NavBar} from './components';

function App() {
  return (
    <div className="app-container">
      <NavBar />
      <AppRoutes />
    </div>
  );
}

export default App;
