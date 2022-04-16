import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom';
import Hello from '../pages/hello/index.jsx';

const BasicMap = () => {
  
  return (
    <HashRouter>
      <Switch>
        {/* App页面 */}
        <Route path="/hello" component={Hello} />
      </Switch>
    </HashRouter>
  );
}

export default BasicMap
