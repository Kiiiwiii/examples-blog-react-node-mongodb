import * as React from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import { Empty } from 'antd';

interface PageItemHOCProps extends RouteComponentProps<{ id: string, name: string }>{};
interface PageItemHOCState {
  data: any;
}


const getPageItemWrapperHOC = (Component: typeof React.Component, api: string) => {
  return class extends React.Component<PageItemHOCProps, PageItemHOCState>{
    private get itemId(): string {
      return this.props.match.params.id;
    }
    constructor(props: PageItemHOCProps) {
      super(props);
      this.state = {
        data: null
      }
    }

    public componentWillMount() {
      this.getData(this.itemId);
    }

    public shouldComponentUpdate(nextProps: PageItemHOCProps, nextState: PageItemHOCState) {
      // used for within component router update (change from one item to another)
      if (nextProps.match.params.id !== this.itemId) {
        this.getData(nextProps.match.params.id);
        return false;
      }
      if (this.state !== nextState) {
        return true;
      }
      return false;
    }

    public render() {
      const {data} = this.state;
      return data ? <Component data={data}/> : <Empty />;
    }

    private getData(_id: string) {
      // @TODO adjust here when backend is ready
      axios.get(`${api}`).then((r: any) => {
        return r.data;
      }).then(response => {
        // if the provided url id is invalid, navigate to 404 page
        if(!response) {
          this.props.history.replace('/404');
          return;
        }
        this.setState({data: response});
      })
    }
  }
}

export default getPageItemWrapperHOC;