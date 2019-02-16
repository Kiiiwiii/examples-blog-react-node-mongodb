import * as React from 'react';
import {List} from 'antd';
import BlogItem from '../blog-item/Blog.Item';

interface BlogListSkeletonProps extends BlogModule.BlogListResponse{
  limit: number;
  pageChange: (page: number) => void
}
class BlogListSkeleton extends React.Component<BlogListSkeletonProps> {

  private get limit() {
    return this.props.limit;
  }
  private get total() {
    return this.props.total;
  }
  private get blogs() {
    return this.props.data;
  }

  constructor(props: BlogListSkeletonProps) {
    super(props);
  }
  public render() {
    return (
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: this.limit,
          total: this.total,
          onChange: this.props.pageChange
        }}
        dataSource={this.blogs}
        // tslint:disable-next-line:jsx-no-lambda
        renderItem={(item: BlogModule.Blog) => (
          <BlogItem
            id={item.id}
            title={item.title}
            summary={item.summary}
            publishedAt={item.publishedAt}
            category={item.category}
            />
        )}
      />
    )
  }
}

export default BlogListSkeleton;