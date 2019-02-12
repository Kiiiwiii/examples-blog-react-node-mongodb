import * as React from 'react';
import { List, Icon } from 'antd';
import styles from './General.Search.Wrapper.module.less';
import DatePipe from 'src/components/ultilis/Date.Pipe';

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
        <List
          itemLayout="horizontal"
          dataSource={data}
          // tslint:disable-next-line:jsx-no-lambda
          renderItem={(item: BlogModule.Blog) => (
            <div className={styles['blog-item']}>
              <div className={styles['blog-item__title']}>{item.title}</div>
              <div className={styles['blog-item__meta']}>
                <Icon type="calendar" />
                <div className={styles['meta__text']}>{DatePipe(item.publishedAt, 'MMMM Do YYYY')}</div>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}

export default GeneralSearchWrapper;