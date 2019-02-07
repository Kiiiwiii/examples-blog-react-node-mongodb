import * as React from 'react';
import axios from 'axios';
import BlogListSkeleton from 'src/components/shared/blog-list-skeleton/Blog.List.Skeleton';

class BlogList extends React.Component<any, BlogModule.BlogListResponse> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      total: 0
    }
  }
  public componentDidMount() {
    axios.get('../fake-data/fake-blog-list.json').then(r => {
      console.log(r);
      return {
        data: (r.data as any).data,
        total: (r.data as any).data.length
      }
    }).then(({data, total}) => {
      this.setState({
        data,
        total
      });
    })
  }
  public render() {
    const {data, total} = this.state;
    return <BlogListSkeleton data={data} total={total}/>;
  }
}

export default BlogList;
