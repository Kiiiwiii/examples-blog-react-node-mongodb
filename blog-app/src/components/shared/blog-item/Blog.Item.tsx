import * as React from 'react';
import styles from './Blog.Item.module.less';
import MarkDownView from '../md-view/MarkDown.View';
import DatePipe from 'src/components/ultilis/Date.Pipe';
import { Icon, Button } from 'antd';

interface BlogItemProps{
  title: string;
  publishedAt: number;
  category: CategoryModule.Category;
  summary: string
}

function BlogItem({title, summary, category, publishedAt: publishAt}: BlogItemProps){
  return (
    <div className={styles['blog-container']}>
      <h3 className={styles['blog__header']}>{title}</h3>
      <div className={styles['blog__meta']}>
        <Icon type="calendar" />
        <div>{DatePipe(publishAt, 'MMMM Do YYYY')}</div>
        <div className={styles['meta__split']}>|</div>
        <Icon type="folder" />
        <div>{category.name}</div>
      </div>
      <div className={styles['blog__overview']}>
        <MarkDownView source={summary}/>
      </div>
      <div className={styles['blog__read-more']}>
        <Button type="primary">read more</Button>
      </div>
    </div>
  )
}

export default BlogItem;