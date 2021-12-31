export interface IUser {
  _id: string;
  username: string;
  email: string;
  profilePicture?: string;
  coverPicture?: string;
  about?: string;
  followers: string[];
  followings: string[];
  city?: string;
  from?: string;
  relationshipStatus?: number;
}

export interface IUserCredentials {
  email: string;
  password: string;
}

export interface IRegisterUserRequest {
  username: string;
  email: string;
  password: string;
}

export type IFriend = Pick<IUser, '_id' | 'username' | 'profilePicture'>;
