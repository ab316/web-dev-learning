export interface INews {
  id: string;
  category?: string;
  title: string;
  subtitle: string;
  image?: string;
  likes: number;
  comments: number;
  tags: string[];
  contentHtml: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBanner {
  image: string;
  url: string;
}
