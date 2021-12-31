import {createContext, FC, useContext, useReducer} from 'react';
import {IAuthAction} from './authActions';
import authReducer from './authReducer';
import IAuthState from './authState';

export interface IAuthContextInterface extends IAuthState {
  dispatch: React.Dispatch<IAuthAction>;
}

const stub = (): never => {
  throw new Error('You forgot to wrap the component around the AuthContext');
};

const INITIAL_STATE: IAuthContextInterface = {
  user: undefined,
  isLoading: false,
  error: undefined,
  dispatch: stub,
};

const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider: FC = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isLoading: state.isLoading,
        error: state.error,
        dispatch,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): IAuthContextInterface => useContext(AuthContext);
export default useAuth;
