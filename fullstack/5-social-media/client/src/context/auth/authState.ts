import {IUser} from 'interfaces/user';

export default interface IAuthState {
  user?: IUser;
  isLoading: boolean;
  error?: Error;
}
