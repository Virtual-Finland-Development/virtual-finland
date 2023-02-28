import { AppContextObj } from '@/types';

export const baseAppContextObj: AppContextObj = {
  appName: 'living-in-finland',
  redirectUrl: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/auth`,
};
