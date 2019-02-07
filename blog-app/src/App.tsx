import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/guest/home/Home';
import Blog from './containers/guest/blog/Blog';
import NotFound from './components/shared/404/404';

class App extends React.Component {
  public render() {
    return (
      <div>
        <Switch>
          {/* routes for guest */}
          <Route exact={true} path="/" component={Home} />
          <Route path="/blog" component={Blog} />

          {/* @TODOs routes for admin */}

          {/* @TODOs routes for 404 */}
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
