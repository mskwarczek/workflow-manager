import React from 'react';

import './app.scss';
import Router from './Router/router';
import Sidebar from './CommonViews/Sidebar/Sidebar';

const App = () => {

  return (
    <div id='workflow-manager'>
      <Sidebar />
      <Router />
    </div>
  );
};

export default App;
