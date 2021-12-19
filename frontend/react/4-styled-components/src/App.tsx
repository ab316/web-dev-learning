import {ThemeProvider} from 'styled-components';
import GlobalStyles from './components/styles/Global';
import {Container} from './components/styles/Container.styled';
import {Header} from './components/Header';

const theme = {
  colors: {
    header: '#ebfbff',
    body: '#fff',
    footer: '#003333',
  },
  mobile: '768px',
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <Container></Container>
    </ThemeProvider>
  );
}

export default App;
