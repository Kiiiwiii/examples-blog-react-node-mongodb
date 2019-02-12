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
    this.setPageOptions({});
  }

  public shouldComponentUpdate(_nextProps: any, nextState: BlogListState) {
    if (nextState.pageOptions !== this.state.pageOptions) {
      console.log(nextState.pageOptions);
      console.log('get blogs');
      this.getBlogs(nextState.pageOptions);
      return false;
    }
    return true;
  }

  public render() {
    const {data, total} = this.state.response;
    const {limit} = this.state.pageOptions;
    return (
      <BlogListSkeleton
        limit={limit}
        data={data}
        total={total}
        pageChange={this.handlePageChange}
        />
    );
  }

  private handlePageChange = (pageNumber: number) => {
    const offset = (pageNumber - 1) * this.state.pageOptions.limit;
    this.setPageOptions({offset});
  }

  private setPageOptions(options: Partial<BlogModule.BlogListOptions>) {
    this.setState((state: BlogListState) => {
      const newPageOptions = Object.assign({}, state.pageOptions, options);
      return {pageOptions: newPageOptions};
    });
  }

  private getBlogs(options: Partial<BlogModule.BlogListOptions>): void {
    axios.get('../fake-data/fake-blog-list.json').then(r => {
      // @TODO fake pagination
      return {
        data: this.fakeDataProcess((r.data as any).data, options),
        total: (r.data as any).data.length
      }
    }).then(({ data, total }) => {
      console.log(data);
      this.setState({
        response: {
          data,
          total
        }
      });
    });
  }

  private fakeDataProcess(data: BlogModule.Blog[], options: Partial<BlogModule.BlogListOptions>): BlogModule.Blog[] {
    let newData = [...data];
    if (options.offset !== undefined && options.limit !== undefined) {
      newData = data.slice(options.offset, options.offset + options.limit)
    }
    return newData;
  }
}

export default BlogList;
