import * as React from 'react';
import './App.module.sass';
import { Button } from 'antd';

class App extends React.Component {
  public render() {
    return (
      <Button className="App" type="primary">Button</Button>
    );
  }
}

export default App;
