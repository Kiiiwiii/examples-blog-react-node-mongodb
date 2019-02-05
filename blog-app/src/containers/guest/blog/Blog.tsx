import * as React from 'react';
import { Route, Link, RouteComponentProps } from 'react-router-dom';
import styles from './Blog.module.less';
import logo from '../../../assets/images/logo.jpg';

import {
  Layout, Menu, Icon,
} from 'antd';
import BlogList from '../b-list/Blog.List';
import { MenuTheme } from 'antd/lib/menu';

const {
  Content, Footer, Sider,
} = Layout;
type ScreenHorizontalSize = 'small' | 'medium' | 'big';

interface BlogState {
  collapsed: boolean,
  screenHorizontalSize: ScreenHorizontalSize,
}
class Blog extends React.Component<RouteComponentProps, BlogState> {
  // for sub menu
  private currentPath: string;
  private subBarColor = 'dark' as MenuTheme;
  private menuItems: Array<{
    type: string,
    name: string,
    to: string,
    component: React.ComponentType
  }> = [
    {type: 'book', name: 'Blogs', to: 'list', component: BlogList},
    {type: 'tags', name: 'Tags', to: 'tags', component: BlogList},
    {type: 'folder', name: 'Categories', to: 'category', component: BlogList},
    {type: 'calendar', name: 'Timeline', to: 'timeline', component: BlogList},
    {type: 'smile', name: 'About', to: 'about', component: BlogList}
  ];
  // small screen size equals to 'md' breakpoint in antd,
  // and medium screen size equals to 'lg' breakpoint in antd.
  private widthOfSmallScreen = 768;
  private widthOfMediumScreen = 992;
  private window = window;
  // use for simple debouncing the calling of setState
  private lastWindowHorizontalSize: ScreenHorizontalSize;

  constructor(props: RouteComponentProps) {
    super(props);
    console.log(this.props);
    const size: ScreenHorizontalSize =
      this.window.innerWidth > this.widthOfMediumScreen ? 'big' :
      this.window.innerWidth > this.widthOfSmallScreen ? 'medium' : 'small';
    this.lastWindowHorizontalSize = size;
    this.state = {
      collapsed: false,
      screenHorizontalSize: size
    };
  }


  public componentDidMount() {
    this.currentPath = this.props.match.url + '/';
    this.window.addEventListener('resize', this.windowResizeListener);
  }

  public componentWillUnmount() {
    this.window.removeEventListener('resize', this.windowResizeListener);
  }

  public render() {
    const { collapsed: isCollapsed, screenHorizontalSize: size} = this.state;

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          className={styles['sub-menu']}
          collapsible={size !== 'medium'}
          collapsed={size === 'medium' ? true : this.state.collapsed}
          breakpoint={size === 'small' ? 'md' : 'lg'}
          collapsedWidth={size === 'small' ? 0 : 80}
          onCollapse={this.onCollapse}
          theme={this.subBarColor}>

          <div className={styles['sub-menu__user-info-group']}>
            <div className={styles['user-info-group__logo']}>
              <img src={logo} className={isCollapsed || size === 'medium' ? styles['logo--collapsed'] : ''}/>
            </div>
            <p className={
              styles['user-info-group__name'] + ' '
              + (isCollapsed ? styles['user-info-group__name--hidden'] : '')} >Zhan</p>
          </div>

          <Menu theme={this.subBarColor} defaultSelectedKeys={['1']} mode="inline">
            {this.menuItems.map((item, index) => (
              <Menu.Item key={index}>
                <Link key={index} to={this.currentPath + item.to}>
                  <Icon type={item.type} />
                  <span>{item.name}</span>
                </Link>
              </Menu.Item>
            ))}
          </Menu>

        </Sider>
        <Layout>
          <Content className={styles['content']}>
            {this.menuItems.map((item, index) => (
              <Route key={index} path={this.currentPath + item.to} component={item.component}/>
            ))}
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

  private windowResizeListener = () => {
    if (this.window.innerWidth < 768 && this.lastWindowHorizontalSize !== 'small') {
      this.lastWindowHorizontalSize = 'small';
      this.setState({ screenHorizontalSize: 'small' });
      return;
    }
    if (this.window.innerWidth > 992 && this.lastWindowHorizontalSize !== 'big') {
      this.lastWindowHorizontalSize = 'big';
      this.setState({ screenHorizontalSize: 'big' });
      return;
    }
    if (this.window.innerWidth < 992 && this.window.innerWidth > 768 && this.lastWindowHorizontalSize !== 'medium') {
      this.lastWindowHorizontalSize = 'medium';
      this.setState({ screenHorizontalSize: 'medium' });
      return;
    }
  }

}

export default Blog;
