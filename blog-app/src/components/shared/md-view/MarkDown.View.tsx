import * as Markdown from 'remarkable';
import * as React from 'react';
import * as hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

const md = new Markdown('full',{
  html: false,
  xhtmlOut: false,
  breaks: false,
  langPrefix: 'language-',
  linkify: true,
  linkTarget: '__blank',
  typographer: false,
  quotes: '“”‘’',
  highlight (str: any, lang: any) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) { }
    }
    try {
      return hljs.highlightAuto(str).value;
    } catch (__) { }
    return ''; // use external default escaping
  }
} as any);
const mdsource = `\`\`\` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
\`\`\`
> abc

__[pica](https://nodeca.github.io/pica/demo/)__

`

class MarkDownView extends React.Component {
  public render() {
    return (
      <div dangerouslySetInnerHTML={{
        __html: md.render(mdsource)
      }} />
    )
  }
}

export default MarkDownView;