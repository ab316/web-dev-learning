export interface IPost {
  _id: number;
  userId: string;
  desc?: string;
  img: string;
  likes: Array<string>;
  comment: number;
  createdAt: string;
  updatedAt: string;
}
