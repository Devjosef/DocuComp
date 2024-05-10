import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../contexts/AuthContext';
import ErrorBoundary from '../components/errorBoundary';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </AuthProvider>
  );
}
export default MyApp;