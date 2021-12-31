import {IUser, IUserCredentials} from 'interfaces/user';

export enum ACTION_TYPE {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  FOLLOW,
  UNFOLLOW,
}

export interface IAuthAction {
  type: ACTION_TYPE;
  payload?: IUserCredentials | IUser | string | Error;
}

export const LoginStart = (user: IUserCredentials): IAuthAction => ({
  type: ACTION_TYPE.LOGIN_START,
  payload: user,
});

export const LoginSuccess = (user: IUser): IAuthAction => ({
  type: ACTION_TYPE.LOGIN_SUCCESS,
  payload: user,
});

export const LoginFailure = (error: Error): IAuthAction => ({
  type: ACTION_TYPE.LOGIN_FAILURE,
  payload: error,
});

export const Follow = (userId: string): IAuthAction => ({
  type: ACTION_TYPE.FOLLOW,
  payload: userId,
});

export const Unfollow = (userId: string): IAuthAction => ({
  type: ACTION_TYPE.UNFOLLOW,
  payload: userId,
});
