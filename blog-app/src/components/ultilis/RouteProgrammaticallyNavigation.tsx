import * as H from 'history'

const navigateToBlogPage = (blogId: string, history: H.History) => {
  history.push(`/blog/page/${blogId}`);
}

export {
  navigateToBlogPage
}