import * as React from 'react';
import getPageItemWrapperHOC from '../page-item-wrapper/Page.Item.Wrapper';
import { Link } from 'react-router-dom';
import { Tag, Icon, Divider } from 'antd';
import styles from './Blog.page.module.less';
import DatePipe from 'src/components/ultilis/Date.Pipe';
import MarkDownView from 'src/components/shared/md-view/MarkDown.View';
import getProperNameForUrl from 'src/components/ultilis/UrlNameEncoding';

class BlogPage extends React.Component<{data: BlogModule.Blog}> {

  public render() {

    // @TODO edit the type of props and here when we use real data
    let {data} = this.props;
    data = (data as any).data[0];

    return (
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
        <MarkDownView source={data.content} />
      </div>
    );
  }
}

export default getPageItemWrapperHOC(BlogPage, '../../../fake-data/fake-blog-list.json');