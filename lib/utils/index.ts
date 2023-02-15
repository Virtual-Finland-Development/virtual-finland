import { AppContextObj } from '@/types';
import { baseAppContextObj } from '../constants';

export function generateAppContextHash(
  applicationContextObj?: Partial<AppContextObj>
) {
  const appContextBase64 = Buffer.from(
    JSON.stringify({
      ...baseAppContextObj,
      ...(applicationContextObj || {}),
    })
  ).toString('base64');
  return encodeURIComponent(appContextBase64);
}
