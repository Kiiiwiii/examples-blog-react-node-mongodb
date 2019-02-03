import * as React from 'react';
import styles from './App.module.sass';
import { Button } from 'antd';

class App extends React.Component {
  public render() {
    return (
      <Button className={styles['App']} type="primary">Button</Button>
    );
  }
}

export default App;
