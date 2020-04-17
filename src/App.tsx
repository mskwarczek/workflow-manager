import React from 'react';

import Router from './Router/Router';
import Sidebar from './CommonViews/Sidebar/Sidebar';

const App = () => {
  
  return (
    <div>
      <Sidebar />
      <Router />
    </div>
  );
};

export default App;
