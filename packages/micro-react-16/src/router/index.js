import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom';
import Hello from '../pages/hello/index.jsx';

const BasicMap = () => {

  return (
    <div>
      <h1>header</h1>
      <HashRouter>
        <Switch>
          {/* App页面 */}
          <Route path="/hello" component={Hello} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default BasicMap
