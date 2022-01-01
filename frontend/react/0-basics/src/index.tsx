import React from 'react';
import ReactDOM from 'react-dom';
import Menu from 'apps/Menu';
import data from 'data/recipes.json';
import Colors from 'apps/Colors';

ReactDOM.render(
  <React.StrictMode>
    <Menu recipes={data} />
    <Colors />
  </React.StrictMode>,
  document.getElementById('root'),
);
