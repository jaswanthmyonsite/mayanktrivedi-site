import '@/styles/globals.css';
import { PassportProvider } from '@/context/PassportContext';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { trackEvent } from '@/utils/analytics';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      trackEvent('page_view', { page_path: url });
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <PassportProvider>
      <Component {...pageProps} />
    </PassportProvider>
  );
}

export default MyApp;
