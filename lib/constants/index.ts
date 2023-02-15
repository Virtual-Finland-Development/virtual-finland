import { AppContextObj } from '@/types';

export const APP_BASE_URL = (() => {
  if (typeof window === 'undefined') {
    return '';
  }

  const {
    location: { protocol, hostname, port },
  } = window;

  if (process.env.NODE_ENV === 'development') {
    return `${protocol}//${hostname}:${port}`;
  } else {
    return `${protocol}//${hostname}`;
  }
})();

export const baseAppContextObj: AppContextObj = {
  appName: 'living-in-finland',
  redirectUrl: `${APP_BASE_URL}/auth`,
};
