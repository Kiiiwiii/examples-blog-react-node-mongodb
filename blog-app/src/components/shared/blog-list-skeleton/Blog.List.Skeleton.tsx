import * as React from 'react';
import {List} from 'antd';
import BlogItem from '../blog-item/Blog.Item';

class BlogListSkeleton extends React.Component<BlogModule.BlogListResponse> {

  private get total() {
    return this.props.total;
  }
  private get blogs() {
    return this.props.data;
  }

  constructor(props: BlogModule.BlogListResponse) {
    super(props);
  }
  public render() {
    return (
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 3,
          total: this.total,
          onChange: (page) => {
            console.log(page);
          }
        }}
        dataSource={this.blogs}
        // tslint:disable-next-line:jsx-no-lambda
        renderItem={(item: BlogModule.Blog) => (
          <BlogItem
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