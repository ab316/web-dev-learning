import {createGlobalStyle} from 'styled-components';

const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
}

img {
  max-width: 100%;
}

a {
  text-decoration: none;
}

`;

export default GlobalStyles;
