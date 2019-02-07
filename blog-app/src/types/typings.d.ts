declare namespace Guest {
  namespace BlogModule {
    interface Blog {
      id: string,
      title: string,
      summary: string,
      publishAt: number,

      content?: string,
      //@TODO change here when we have category and tags feature
      category?: any,
      tags?: any,

    }
    interface BlogListResponse {
      data: Blog[],
      total: number
    }
  }
}