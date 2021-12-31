import {IUser} from 'interfaces/user';
import {ACTION_TYPE, IAuthAction} from './authActions';
import IAuthState from './authState';

export default function authReducer(state: IAuthState, action: IAuthAction): IAuthState {
  switch (action.type) {
    case ACTION_TYPE.LOGIN_START:
      return {
        user: undefined,
        isLoading: true,
        error: undefined,
      };

    case ACTION_TYPE.LOGIN_SUCCESS:
      return {
        user: action.payload as IUser,
        isLoading: false,
        error: undefined,
      };

    case ACTION_TYPE.LOGIN_FAILURE:
      return {
        user: undefined,
        isLoading: false,
        error: action.payload as Error,
      };

    default:
      return state;
  }
}
