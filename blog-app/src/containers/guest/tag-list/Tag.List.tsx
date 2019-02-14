import * as React from 'react';
import axios from 'axios';
import GeneralSearchWrapper from 'src/components/shared/general-search-wrapper/General.Search.Wrapper';
import BlogTag from 'src/components/shared/checkable-tag/Checkable.Tag';
import { Input } from 'antd';
import styles from './Tag.List.module.less';

const Search = Input.Search;

interface TagWithState extends TagModule.Tag {
  checked: boolean
}
interface TagListState {
  response: TagModule.ResultListResponse;
  pageOptions: TagModule.ResultListPageOptions;

  storedTags: TagWithState[];
  shownTags: TagWithState[];
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
      shownTags: [],
      storedTags: []
    }
  }

  public componentWillMount() {
    this.initializeAllTags();
  }

  public shouldComponentUpdate(_nextProps: any, nextState: TagListState) {
    // initialization the tags
    if(nextState.pageOptions !== this.state.pageOptions) {
      this.getBlogs(nextState.pageOptions);
      return false;
    }

    if (nextState.storedTags !== this.state.storedTags) {
      this.setState({
        pageOptions: {
          tags: nextState.storedTags.filter(tag => tag.checked).map(tag => tag.id)
        }
      })
    }
    return true;
  }
  public render() {
    const {shownTags: tags} = this.state;
    return (
      <GeneralSearchWrapper
        searchContainerChildren={<div>
          <h2>All Tags</h2>
          <Search
            placeholder="search tags"
            allowClear={true}
            // tslint:disable-next-line:jsx-no-lambda
            onChange={$event => {
              const value = $event.currentTarget.value;
              this.setState((state, _props) => {
                return {
                  shownTags: state.storedTags.filter(tag => tag.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()) || tag.checked)
                }
              });
            }}
            className={styles['search-input']}
          />
          <div className={styles['tags-container']}>
            {
              tags.map(tag => (
                <div key={tag.id} className={styles['tag-item']}>
                  <BlogTag
                    checked={tag.checked}
                    checkstatechange={this.toggleTagState}
                    id={tag.id}>{tag.name}</BlogTag>
                </div>
              ))
            }
          </div>

        </div>}
        data={this.FakeBlogResponse as any}/>
    );
  }

  private getBlogs(options: TagModule.ResultListPageOptions) {
    axios.get('../fake-data/tags.json').then((r: any) => {

      // @TODO fake filtering, change here after backend is ready
      const dataAfterFiltering: TagModule.TagWithBlogs[] = [];
      ((r.data as TagModule.ResultListResponse).data).forEach(t => {
        options.tags.forEach(o => {
          if (t.id === o) {
            dataAfterFiltering.push(t);
          }
        });
      });
      return {
        data: dataAfterFiltering
      };

    }).then((data: TagModule.ResultListResponse) => {
      console.log(data);
      this.setState({
        response: data
      })
    })
  }

  // private setPageOptions(options: Partial<TagModule.ResultListPageOptions>) {
  //   this.setState((state: TagListState) => {
  //     const newPageOptions = Object.assign({}, state.pageOptions, options);
  //     return { pageOptions: newPageOptions };
  //   });
  // }

  private initializeAllTags() {
    axios.get('../fake-data/tags.json').then(r => {
      const tags = (r.data as any).data.map((t: any) => ({ ...t, checked: false }));
      this.setState({
        storedTags: tags,
        shownTags: tags
      })
    })
  }

  private toggleTagState = (id: string, checked: boolean) => {
    const {shownTags, storedTags} = this.state;
    const newShownTags = shownTags.map(t => {
      if (t.id === id) {
        return { ...t, checked };
      }
      return t;
    });
    const newStoredTags = storedTags.map(t => {
      if(t.id === id) {
        return {...t, checked};
      }
      return t;
    });
    this.setState({ storedTags: newStoredTags, shownTags: newShownTags });
  }
}

export default TagList;