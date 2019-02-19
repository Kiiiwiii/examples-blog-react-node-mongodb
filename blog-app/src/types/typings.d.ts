declare namespace BlogModule {
  interface Blog {
    id: string,
    title: string,
    summary: string,
    publishedAt: number,

    //@TODO change here when we have category and tags feature
    category: CategoryModule.Category,
    tags: TagModule.Tag[],
    content: string,

  }

  interface BlogListOptions {
    offset: number;
    limit: number;
    // @TODO extends here
  }

  interface BlogListResponse {
    data: Blog[],
    total: number
  }
}

declare namespace CategoryModule {
  interface Category {
    id: string,
    name: string,
    //@TODO add more fields
  }
}

declare namespace TagModule {
  interface Tag {
    id: string,
    name: string,
  }
  interface TagWithBlogs extends Tag {
    blogs: BlogModule.Blog[]
  }

  interface ResultListResponse {
    data: TagWithBlogs[];
  }
  interface ResultListPageOptions {
    tags: string[];
  }
}
