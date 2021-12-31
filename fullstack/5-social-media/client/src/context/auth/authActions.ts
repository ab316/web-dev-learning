import {IUser, IUserCredentials} from 'interfaces/user';

export enum ACTION_TYPE {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
}

export interface IAuthAction {
  type: ACTION_TYPE;
  payload?: IUserCredentials | IUser | Error;
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
