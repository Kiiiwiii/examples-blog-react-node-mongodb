import * as Markdown from 'remarkable';
import * as React from 'react';
import './MarkDown.View.less';
import * as hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

const md = new Markdown('full',{
  html: false,
  xhtmlOut: false,
  breaks: true,
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

function MarkDownView(props: {source: string}) {
  return <div dangerouslySetInnerHTML={{
    __html: md.render(props.source)
  }} />
}

export default MarkDownView;