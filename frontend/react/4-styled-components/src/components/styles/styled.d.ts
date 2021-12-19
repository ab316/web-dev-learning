import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      header: string;
      body: string;
      footer: string;
    };
    mobile: string;
  }
}
