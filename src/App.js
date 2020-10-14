import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { HOME_PAGE } from './pages';

function App() {
  return (
    <main className='main'>
      <Router>
        <Switch>
          <Route exact path='/' component={HOME_PAGE} />
        </Switch>
      </Router>
    </main>
  );
}

export default App;
