import * as React from 'react';
import { Route } from 'react-router-dom';

import {
  Layout, Menu, Icon,
} from 'antd';
import BlogList from '../b-list/Blog.List';
import { MenuTheme } from 'antd/lib/menu';

const {
  Content, Footer, Sider,
} = Layout;

class Blog extends React.Component<any, {collapsed: boolean}> {
  private themeColor = 'light' as MenuTheme;

  constructor(props: any) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }


  public render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible={true}
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          theme={this.themeColor}
        >
          <div className="logo" />
          <Menu theme={this.themeColor} defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="book" />
              <span>Blogs</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="tags" />
              <span>Tags</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="calendar" />
              <span>Timeline</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="smile" />
              <span>About</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content>
            <Route path="/" component={BlogList}/>
          </Content>

          <Footer style={{ textAlign: 'center' }}>
            Zhan ©2019 Created by Love
          </Footer>
        </Layout>
      </Layout>
    );
  }

  private onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  }
}

export default Blog;
