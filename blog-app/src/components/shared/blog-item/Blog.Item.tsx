import * as React from 'react';
import styles from './Blog.Item.module.less';
import MarkDownView from '../md-view/MarkDown.View';
import DatePipe from 'src/components/ultilis/Date.Pipe';
import { Icon, Button } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { navigateToBlogPage } from 'src/components/ultilis/RouteProgrammaticallyNavigation';

interface BlogItemProps extends BlogModule.Blog, RouteComponentProps{}

function BlogItem({ id, title, summary, category, publishedAt, history }: BlogItemProps){
  const goToBlogPage = (blogId: string) => {
    return () => {
      navigateToBlogPage(blogId, history);
    }
  }
  return (
    <div className={styles['blog-container']}>
      <h3 className={styles['blog__header']} onClick={goToBlogPage(id)}>
        <p className={styles['header__text']}>{title}</p>
      </h3>
      <div className={styles['blog__meta']}>
        <Icon type="calendar" />
        <div>{DatePipe(publishedAt, 'MMMM Do YYYY')}</div>
        <div className={styles['meta__split']}>|</div>
        <Icon type="folder" />
        <div>{category.name}</div>
      </div>
      <div className={styles['blog__overview']}>
        <MarkDownView source={summary}/>
      </div>
      <div className={styles['blog__read-more']}>
        <Button type="primary" onClick={goToBlogPage(id)}>read more</Button>
      </div>
    </div>
  )
}

export default withRouter(BlogItem);