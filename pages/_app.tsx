// pages/_app.tsx

import NavBar from '../components/NavBar';
import { AppProps } from 'next/app'; // This provides the correct type for the Component and pageProps parameters.
import '../styles/styles.scss';

// The function MyApp is typed with React.FC<AppProps> to indicate that it's a functional component with props of type AppProps.
const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      {/* <NavBar /> */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;


