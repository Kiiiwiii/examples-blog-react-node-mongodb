import * as React from 'react';
import styles from './General.Search.Wrapper.module.less';
import SimplifiedBlogList from '../blog-list-simplified-skeleton/Blog.List.Simplified.Skeleton';
import { Empty } from 'antd';

interface GeneralSearchWrapperProps {
  searchContainerChildren: React.ReactElement<any> | null;
  data: BlogModule.Blog[] | TagModule.TagWithBlogs[];
  isBlogCategorized: boolean;
}

function GeneralSearchWrapper({ searchContainerChildren = null, data = []}: GeneralSearchWrapperProps, isBlogCategorized = false) {
  return (
    <div>
      <div className={styles['search-container']}>
        {searchContainerChildren}
      </div>
      <div className={styles['content-container']}>
        {data.length === 0 ? <Empty /> :
          isBlogCategorized ?
            (data as TagModule.TagWithBlogs[]).map(d => (
              <div className={styles['content__item']} key={d.id}>
                <h3 className={styles['content__category-title']}>{d.name}</h3>
                <SimplifiedBlogList data={d.blogs} />
              </div>
            )) : <SimplifiedBlogList data={data as BlogModule.Blog[]} />
        }
      </div>
    </div>
  );
}

export default GeneralSearchWrapper;