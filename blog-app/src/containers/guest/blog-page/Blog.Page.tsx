import * as React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import axios from 'axios';
import { Empty, Tag, Icon, Divider } from 'antd';
import styles from './Blog.page.module.less';
import DatePipe from 'src/components/ultilis/Date.Pipe';
import MarkDownView from 'src/components/shared/md-view/MarkDown.View';
import getProperNameForUrl from 'src/components/ultilis/UrlNameEncoding';

interface BlogPageState {
  data: BlogModule.Blog | null
}
interface BlogPageProps extends RouteComponentProps<{ id: string }> {};
class BlogPage extends React.Component<BlogPageProps, BlogPageState> {
  private get blogId(): string {
    return this.props.match.params.id;
  }

  constructor(props: BlogPageProps) {
    super(props);
    this.state = {
      data: null
    };
  }
  public componentWillMount() {
    this.getBlog(this.blogId);
  }
  public shouldComponentUpdate(nextProps: BlogPageProps, nextState: BlogPageState) {
    // used for within component router update (change from one blog to another)
    if(nextProps.match.params.id !== this.blogId) {
      this.getBlog(nextProps.match.params.id);
      return false;
    }
    if(this.state !== nextState) {
      return true;
    }
    return false;
  }
  public render() {
    const {data} = this.state;
    return (
      <div>
        {!data ? <Empty/> : (
          <div className={styles['blog']}>
            <div className={styles['blog__header']}>
              {data.title}
            </div>
            <div className={styles['blog__meta-group']}>
              <Icon type="calendar" />
              <div className={styles['meta-group__date']}>
                {DatePipe(data.publishedAt, 'MMMM Do YYYY')}
              </div>
              <div className={styles['meta-group__placeholder']}>|</div>
              <Icon type="folder" />
              <div className={styles['meta-group__category']}>
                {data.category.name}
              </div>
            </div>
            <div className={styles['blog__tags']}>
              Tags:
              {data.tags.map(tag =>
                <Tag className={styles['tag']} key={tag.id}>
                  <Link to={`/blog/tag/${getProperNameForUrl(tag.name)}/${tag.id}`}>{tag.name}</Link>
                </Tag>)}
            </div>
            <Divider />
            <MarkDownView source={data.content}/>
          </div>
        )}
      </div>
    );
  }

  private getBlog(id: string) {
    axios.get('../../../fake-data/fake-blog-list.json').then((r: any) => {

      // @TODO fake filtering, change here after backend is ready
      const findedBlog: BlogModule.Blog | undefined =
        (r.data.data as BlogModule.Blog[]).find(blog => blog.id === id);
      return findedBlog;

    }).then((blog: BlogModule.Blog | undefined) => {
      // if the provided url blogId is invalid, navigate to 404 page
      if(!blog) {
        this.props.history.replace('/404');
        return;
      }
      this.setState({data: blog});
    })
  }
}

export default BlogPage;