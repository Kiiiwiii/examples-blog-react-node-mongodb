import * as React from 'react';
import MarkDownView from '../../../components/shared/md-view/MarkDown.View';
import axios from 'axios';

class BlogOverviewList extends React.Component<any, Guest.BlogModule.BlogListResponse> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      total: 0
    }
  }
  public componentDidMount() {
    axios.get('../fake-data/fake-blog-list.json').then(r => {
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
    const {data} = this.state;
    return <div>
      {data.map(blog => (
        <MarkDownView key={blog.id} source={blog.summary}/>
      ))}
    </div>;
  }
}

export default BlogOverviewList;
