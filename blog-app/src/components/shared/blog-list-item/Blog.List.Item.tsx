import * as React from 'react';
import styles from './Blog.List.Item.module.less';
import MarkDownView from '../md-view/MarkDown.View';
import DatePipe from 'src/components/ultilis/Date.Pipe';
import { Icon, Button } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { navigateToBlogPage } from 'src/components/ultilis/RouteProgrammaticallyNavigation';

interface BlogListItemProps extends Partial<BlogModule.Blog>, RouteComponentProps{}

function BlogListItem({ id, title, summary, category, publishedAt, history }: BlogListItemProps){
  const goToBlogPage = (blogId: string) => {
    return () => {
      navigateToBlogPage(blogId, history);
    }
  }
  return (
    <div className={styles['blog-container']}>
      <h3 className={styles['blog__header']} onClick={goToBlogPage(id as string)}>
        <div className={styles['header__text']}>{title}</div>
      </h3>
      <div className={styles['blog__meta']}>
        <Icon type="calendar" />
        <div>{DatePipe(publishedAt as number, 'MMMM Do YYYY')}</div>
        <div className={styles['meta__split']}>|</div>
        <Icon type="folder" />
        <div>{(category as CategoryModule.Category).name}</div>
      </div>
      <div className={styles['blog__overview']}>
        <MarkDownView source={summary as string}/>
      </div>
      <div className={styles['blog__read-more']}>
        <Button type="primary" onClick={goToBlogPage(id as string)}>read more</Button>
      </div>
    </div>
  )
}

export default withRouter(BlogListItem);