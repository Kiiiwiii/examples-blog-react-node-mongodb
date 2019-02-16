import * as React from 'react';
import styles from './General.Search.Wrapper.module.less';
import SimplifiedBlogList from '../blog-list-simplified-skeleton/Blog.List.Simplified.Skeleton';

interface GeneralSearchWrapperProps {
  searchContainerChildren: React.ReactElement<any> | null;
  // @TODO add pagination and design the UX properly in the next step
  data: BlogModule.Blog[];
}

function GeneralSearchWrapper({searchContainerChildren = null, data = []}: GeneralSearchWrapperProps) {
  return (
    <div>
      <div className={styles['search-container']}>
        {searchContainerChildren}
      </div>
      <div className={styles['content-container']}>
        <SimplifiedBlogList data={data}/>
      </div>
    </div>
  );
}

export default GeneralSearchWrapper;