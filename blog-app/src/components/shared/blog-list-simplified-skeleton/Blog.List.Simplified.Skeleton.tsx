import * as React from 'react';
import { List, Icon } from 'antd';
import styles from './Blog.List.Simplified.Skeleton.module.less';
import DatePipe from 'src/components/ultilis/Date.Pipe';

function SimplifiedBlogList({ data }: { data: BlogModule.Blog[]} ) {
  return (
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
  )
}

export default SimplifiedBlogList;