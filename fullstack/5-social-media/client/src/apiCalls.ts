import axios from 'axios';
import {ACTION_TYPE, IAuthAction} from 'context/auth/authActions';
import {IUserCredentials} from 'interfaces/user';
import React from 'react';

export const login = async (credentials: IUserCredentials, dispatch: React.Dispatch<IAuthAction>) => {
  dispatch({
    type: ACTION_TYPE.LOGIN_START,
  });

  try {
    const res = await axios.post('/auth/login', credentials);
    console.log('login call response', res);
    dispatch({type: ACTION_TYPE.LOGIN_SUCCESS, payload: res.data});
  } catch (err) {
    dispatch({type: ACTION_TYPE.LOGIN_FAILURE, payload: err as Error});
    console.error(err);
  }
};
