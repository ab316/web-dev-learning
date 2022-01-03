import React from 'react';
import ReactDOM from 'react-dom';
import Menu from 'apps/Menu';
import data from 'data/recipes.json';
import Colors from 'apps/Colors';
import Hooks from 'apps/Hooks';

ReactDOM.render(
  <React.StrictMode>
    <Menu recipes={data} />
    <Colors />
    <Hooks />
  </React.StrictMode>,
  document.getElementById('root'),
);
