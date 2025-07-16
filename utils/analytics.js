export const trackEvent = (eventName, properties = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties);
  }
  
  // Console log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Track Event:', eventName, properties);
  }
};

