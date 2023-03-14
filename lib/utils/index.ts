import { format } from 'date-fns';
import { AppContextObj } from '@/types';
import { baseAppContextObj } from '../constants';
import adresses from '../fake-data/adresses.json';
import firstNames from '../fake-data/first-names.json';
import lastNames from '../fake-data/last-names.json';

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

export function pickRandomName(type: 'firstName' | 'lastName') {
  const list: string[] = type === 'firstName' ? firstNames : lastNames;
  return list[Math.floor(Math.random() * list.length)] || type;
}

export function generateRandomEmail() {
  const firstName = pickRandomName('firstName');
  const lastName = pickRandomName('lastName');
  return `${firstName}.${lastName}@email.com`;
}

export function pickRandomDateString() {
  const maxDate = Date.now();
  const timestamp = Math.floor(Math.random() * maxDate);
  return format(new Date(timestamp), 'yyyy-MM-dd');
}

export function removeTrailingSlash(str: string) {
  return str.endsWith('/') ? str.slice(0, -1) : str;
}
