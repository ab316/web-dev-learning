import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {AuthContextProvider} from './context/auth/AuthContext';

dayjs.extend(relativeTime);

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
