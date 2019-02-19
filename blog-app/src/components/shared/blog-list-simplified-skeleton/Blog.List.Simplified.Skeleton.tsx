import * as React from 'react';
import { List, Icon } from 'antd';
import styles from './Blog.List.Simplified.Skeleton.module.less';
import DatePipe from 'src/components/ultilis/Date.Pipe';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { navigateToBlogPage } from 'src/components/ultilis/RouteProgrammaticallyNavigation';

interface BlogListProps extends RouteComponentProps {
  data: BlogModule.Blog[]
}

function SimplifiedBlogList({ data, history }: BlogListProps) {
  const goToBlogPage = (title: string, blogId: string) => {
    return () => {
      navigateToBlogPage(title, blogId, history);
    }
  }
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      // tslint:disable-next-line:jsx-no-lambda
      renderItem={(item: BlogModule.Blog) => (
        <div className={styles['blog-item']} onClick={goToBlogPage(item.title, item.id)}>
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


export default withRouter<BlogListProps>(SimplifiedBlogList);