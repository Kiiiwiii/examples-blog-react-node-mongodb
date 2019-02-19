import * as React from 'react';
import getPageItemWrapperHOC from '../page-item-wrapper/Page.Item.Wrapper';
import styles from './Tag.Page.module.less';
import SimplifiedBlogList from '../../../components/shared/blog-list-simplified-skeleton/Blog.List.Simplified.Skeleton';
import { Tag, Icon } from 'antd';


interface TagPageProps {
  data: TagModule.TagWithBlogs;
}
class TagPage extends React.Component<TagPageProps> {
  public render() {
    // @TODO change here when we have real data
    let {data} = this.props;
    data = (data as any).data[0];

    return (
      <div>
        <div className={styles['header']}>
          <Icon type="tag" />
          <Tag className={styles['header__tag-name']}>{data.name}</Tag>
        </div>
        <SimplifiedBlogList data={data.blogs}/>;
      </div>
    );
  }
}

export default getPageItemWrapperHOC(TagPage, '../../../fake-data/tags.json');