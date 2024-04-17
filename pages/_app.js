// pages/_app.js

import NavBar from '../components/NavBar';
import '../styles/styles.scss'; // Update the import path to your SCSS styles accordingly

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
    </>
  );
}


