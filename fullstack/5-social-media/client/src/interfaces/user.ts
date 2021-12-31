export interface IUser {
  _id: number;
  username: string;
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
