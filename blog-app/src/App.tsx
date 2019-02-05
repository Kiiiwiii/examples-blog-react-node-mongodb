import * as React from 'react';
import { Route } from 'react-router-dom';
import Home from './containers/guest/home/Home';
import Blog from './containers/guest/blog/Blog';

class App extends React.Component {
  public render() {
    return (
      <div>
        {/* routes for guest */}
        <Route exact={true} path="/" component={Home} />
        <Route path="/blog" component={Blog} />

        {/* @TODOs routes for admin */}

        {/* @TODOs routes for 404 */}
      </div>
    );
  }
}

export default App;
