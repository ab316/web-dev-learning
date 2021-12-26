export interface IPost {
  id: number;
  desc?: string;
  photo: string;
  date: string;
  userId: number;
  like: number;
  comment: number;
}

export interface IUser {
  id: number;
  username: string;
  profilePicture: string;
}
