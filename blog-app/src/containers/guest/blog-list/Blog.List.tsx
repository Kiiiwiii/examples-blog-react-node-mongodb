import * as React from 'react';
import axios from 'axios';
import BlogListSkeleton from 'src/components/shared/blog-list-skeleton/Blog.List.Skeleton';

interface BlogListState {
  response: BlogModule.BlogListResponse
  pageOptions: BlogModule.BlogListOptions
}

class BlogList extends React.Component<any, BlogListState> {
  // private pageOptions: BlogModule.BlogListOptions;

  constructor(props: any) {
    super(props);
    this.state = {
      response: {
        data: [],
        total: 0
      },
      pageOptions: {
        limit: 3,
        offset: 0
      }
    }
  }
  public componentDidMount() {
    this.getBlogList({}).then(({data, total}) => {
      console.log(data);
      this.setState({
        response: {
          data,
          total
        }
      });
    });
  }

  public componentWillReceiveProps() {

  }
  public render() {
    const {data, total} = this.state.response;
    const {limit} = this.state.pageOptions;
    return <BlogListSkeleton limit={limit} data={data} total={total}/>;
  }

  private getBlogList(options: Partial<BlogModule.BlogListOptions>): Promise<BlogModule.BlogListResponse> {

    return axios.get('../fake-data/fake-blog-list.json').then(r => {

      // @TODO fake pagination
      // const data = (r.data as any).data;

      return {
        data: (r.data as any).data,
        total: (r.data as any).data.length
      }
    });
  }

  // private fakeDataProcess(data: BlogModule.Blog[], options: Partial<BlogModule.BlogListOptions>): BlogModule.Blog[] {
  //   let newData;
  //   if (options.offset) {
  //     newData = data.slice(options)
  //   }
  //   return data;
  // }
}

export default BlogList;
