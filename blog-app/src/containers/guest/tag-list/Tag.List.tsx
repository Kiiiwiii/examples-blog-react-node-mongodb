import * as React from 'react';
import axios from 'axios';
import GeneralSearchWrapper from 'src/components/shared/general-search-wrapper/General.Search.Wrapper';
import BlogTag from 'src/components/shared/checkable-tag/Checkable.Tag';

interface TagWithState extends TagModule.Tag {
  checked: boolean
}
interface TagListState {
  response: TagModule.ResultListResponse;
  pageOptions: TagModule.ResultListPageOptions;
  tags: TagWithState[];
}

class TagList extends React.Component<any, TagListState> {
  private FakeBlogResponse = [
    { title: '123' },
    { title: '234' },
    { title: '456' }
  ];

  constructor(props: any) {
    super(props);
    this.state = {
      response: {
        data: []
      },
      pageOptions: {
        tags: []
      },
      tags: []
    }
  }

  public componentWillMount() {
    this.getAllTags();
  }

  public shouldComponentUpdate(nextProps: any, nextState: any) {
    if(nextState.pageOptions !== this.state.pageOptions) {
      // this.getBlogs(nextState.pageOptions);
      return false;
    }
    return true;
  }
  public render() {
    const {tags} = this.state;
    return (
      <GeneralSearchWrapper
        searchContainerChildren={<div>
          {
            tags.map(tag => (
              <BlogTag
                key={tag.id}
                checked={tag.checked}
                checkstatechange={this.toggleTagState}
                id={tag.id}>{tag.name}</BlogTag>
            ))
          }
        </div>}
        data={this.FakeBlogResponse as any}/>
    );
  }
  // private getBlogs(options: TagModule.ResultListPageOptions[]) {
  //   axios.get().then((r: any) => {
  //     // @TODO fake filtering
  //     return {
  //       data: (r.data as any).data
  //     };
  //   }).then((data: TagModule.ResultListResponse) => {
  //     this.setState({
  //       response: data
  //     })
  //   })
  // }

  // private setPageOptions(options: Partial<TagModule.ResultListPageOptions>) {
  //   this.setState((state: TagListState) => {
  //     const newPageOptions = Object.assign({}, state.pageOptions, options);
  //     return { pageOptions: newPageOptions };
  //   });
  // }

  private getAllTags() {
    axios.get('../fake-data/tags.json').then(r => {
      this.setState({
        tags: (r.data as any).data.map((t: any) => ({...t, checked: false}))
      })
    })
  }

  private toggleTagState = (id: string, checked: boolean) => {
    const {tags} = this.state;
    if (tags.find(tag => tag.id === id)) {
      const newTags = tags.map(t => {
        if(t.id === id) {
          return {...t, checked};
        }
        return t;
      });
      this.setState({tags: newTags});
    }
  }
}

export default TagList;