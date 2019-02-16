import * as React from 'react';
import { Route, Link, RouteComponentProps, Switch } from 'react-router-dom';
import styles from './Blog.module.less';
import logo from '../../../assets/images/logo.jpg';

import {
  Layout, Menu, Icon,
} from 'antd';
import { MenuTheme } from 'antd/lib/menu';
import NotFound from 'src/components/shared/404/404';
import BlogList from '../blog-list/Blog.List';
import TagList from '../tag-list/Tag.List';
import BlogPage from '../blog-page/Blog.Page';

const {
  Content, Footer, Sider,
} = Layout;
type ScreenHorizontalSize = 'small' | 'medium' | 'big';

interface BlogState {
  collapsed: boolean,
  screenHorizontalSize: ScreenHorizontalSize,
}

class Blog extends React.Component<RouteComponentProps, BlogState> {
  private contentLayout: any;
  // for sub menu
  private selectedItem: undefined | string[] = undefined;
  private subBarColor = 'light' as MenuTheme;
  private menuItems: Array<{
    type: string,
    name: string,
    to: string,
    component?: React.ComponentType
  }> = [
    {type: 'book', name: 'Blogs', to: 'list'},
    {type: 'tags', name: 'Tags', to: 'tags', component: TagList},
    {type: 'folder', name: 'Categories', to: 'category', component: BlogList},
    {type: 'calendar', name: 'Timeline', to: 'timeline', component: BlogList},
    {type: 'smile', name: 'About', to: 'about', component: BlogList},
  ];

  private routes: Array<{
    path: string,
    component: React.ComponentType,
    to?: string;
  }> = [
    {path: 'page/:id', component: BlogPage}
  ]


  // small screen size equals to 'md' breakpoint in antd,
  // and medium screen size equals to 'lg' breakpoint in antd.
  private widthOfSmallScreen = 768;
  private widthOfMediumScreen = 992;
  private window = window;
  // use for simple debouncing the calling of setState
  private lastWindowHorizontalSize: ScreenHorizontalSize;

  constructor(props: RouteComponentProps) {
    super(props);
    const size: ScreenHorizontalSize =
      this.window.innerWidth > this.widthOfMediumScreen ? 'big' :
      this.window.innerWidth > this.widthOfSmallScreen ? 'medium' : 'small';
    this.lastWindowHorizontalSize = size;
    this.state = {
      collapsed: size === 'small',
      screenHorizontalSize: size
    };
  }


  public componentWillMount() {
    // update path in route config
    const currentPath = this.props.match.url + '/';
    this.menuItems = this.menuItems.map(i => ({
      ...i,
      to: currentPath + i.to
    }));
    this.routes = this.routes.map(i => ({
      ...i,
      path: currentPath + i.path
    }));
    console.log(this.routes);

    // tslint:disable-next-line:prefer-for-of
    for(let i = 0; i < this.menuItems.length; i++) {
      if (this.menuItems[i].to === this.props.location.pathname) {
        this.selectedItem = ['' + i];
        break;
      }
    }

    // register event listener
    this.window.addEventListener('resize', this.windowResizeListener);
  }

  public componentWillUnmount() {
    this.window.removeEventListener('resize', this.windowResizeListener);
  }

  public render() {
    const { collapsed: isCollapsed, screenHorizontalSize: size} = this.state;
    const contentLayoutMarginLeft = isCollapsed ? (size === 'medium' || size === 'big' ? 80 : 0) : 200;

    return (
      <Layout>
        <Sider
          style={{
            position: 'fixed',
            left: 0,
          }}
          className={styles['sub-menu']}
          collapsible={size !== 'medium'}
          collapsed={this.state.collapsed}
          breakpoint={size === 'small' ? 'md' : 'lg'}
          collapsedWidth={size === 'small' ? 0 : 80}
          onCollapse={this.onCollapse}
          theme={this.subBarColor}>

          <nav style={{overflow: 'auto', height: '100vh'}}>
            <div className={styles['sub-menu__user-info-group']}>
              <div className={styles['user-info-group__logo']}>
                <img src={logo} className={isCollapsed ? styles['logo--collapsed'] : ''} />
              </div>
              <p className={
                styles['user-info-group__name'] + ' '
                + (isCollapsed ? styles['user-info-group__name--hidden'] : '')} >Zhan</p>
            </div>

            <Menu defaultSelectedKeys={this.selectedItem} theme={this.subBarColor} mode="inline">
              {this.menuItems.map((item, index) => (
                <Menu.Item key={index}>
                  <Link key={index} to={item.to}>
                    <Icon type={item.type} />
                    <span>{item.name}</span>
                  </Link>
                </Menu.Item>
              ))}
            </Menu>
          </nav>

        </Sider>
        <Layout
          style={{
            marginLeft: contentLayoutMarginLeft,
            height: '100vh',
            display: 'block'
          }}
          className={styles['content-wrapper']}>
          <div
            ref={(ref) => this.contentLayout = ref}
            style={{overflow: 'auto', height: '100%'}}>
            <Content className={styles['content']}>
              {/* all routes  */}
              <Switch>
                {
                  this.menuItems.map((item, index) => {
                    if (item.name === 'Blogs') {
                      // tslint:disable-next-line:jsx-no-lambda
                      return <Route key={index + 'menuItem'} path={item.to} render={(props) => <BlogList {...props} backToTop={this.backToContentTop} />} />
                    }
                    return <Route key={index + 'menuItem'} path={item.to} component={(item.component as React.ComponentType)} />
                  })
                }
                {
                  this.routes.map((item, index) => {
                    return <Route key={index + 'route'} path={item.path} component={item.component}/>
                  })
                }
                <Route component={NotFound} />
              </Switch>
            </Content>

            <Footer style={{ textAlign: 'center' }}>
              Zhan ©2019 Created by Love
            </Footer>
          </div>
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
      this.setState({ screenHorizontalSize: 'small', collapsed: true});
      return;
    }
    if (this.window.innerWidth > 992 && this.lastWindowHorizontalSize !== 'big') {
      this.lastWindowHorizontalSize = 'big';
      this.setState({ screenHorizontalSize: 'big' });
      return;
    }
    if (this.window.innerWidth < 992 && this.window.innerWidth > 768 && this.lastWindowHorizontalSize !== 'medium') {
      this.lastWindowHorizontalSize = 'medium';
      this.setState({ screenHorizontalSize: 'medium', collapsed: true});
      return;
    }
  }

  private backToContentTop = () => {
    this.contentLayout.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}

export default Blog;
