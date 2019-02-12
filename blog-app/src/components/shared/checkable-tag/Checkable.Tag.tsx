import * as React from 'react';
import { Tag } from 'antd';
const { CheckableTag } = Tag;

interface CheckableTagProps {
  id: string
  checked: boolean;
  checkstatechange: (id: string, isChecked: boolean) => void;
  children: React.ReactNode;
}

class BlogTag extends React.Component<CheckableTagProps> {
  public render() {
    return (
      <CheckableTag
        children={this.props.children}
        checked={this.props.checked}
        onChange={this.handleChange} />
    )
  }

  private handleChange = (isChecked: boolean) => {
    this.props.checkstatechange(this.props.id, isChecked);
  }
}

export default BlogTag