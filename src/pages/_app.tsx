import { AppProps } from 'next/app';
import { ThemeProvider } from '../contexts/ThemesContext';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider>
    <Component {...pageProps} />
  </ThemeProvider>
);

export default MyApp;
