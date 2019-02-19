import * as React from 'react';
import { RouteComponentProps } from 'react-router';

class TagPage extends React.Component<RouteComponentProps> {
  public render() {
    console.log(this.props);
    return 'tag page';
  }
}

export default TagPage;