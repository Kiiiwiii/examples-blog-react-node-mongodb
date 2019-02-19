import * as H from 'history'
import getProperNameForUrl from './UrlNameEncoding';

const navigateToBlogPage = (title: string, id: string, history: H.History) => {
  history.push(`/blog/page/${getProperNameForUrl(title)}/${id}`);
}

export {
  navigateToBlogPage
}