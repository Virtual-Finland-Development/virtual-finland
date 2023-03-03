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

export function nullifyUndefinedValues<T extends object>(obj: T) {
  for (const [key, value] of Object.entries(obj)) {
    if (!!value && typeof value === 'object') {
      nullifyUndefinedValues(value);
    } else if (value === undefined) {
      obj[key as keyof T] = null as any;
    }
  }
  return obj;
}
