import Cookies from 'js-cookie';
import { LoggedInState } from '@/types';
import { generateAppContextHash } from '@/lib/utils';
import apiClient from '../api-client';
import { AUTH_GW_BASE_URL } from '../endpoints';

export function directToAuthGwLogin(redirectPath?: string) {
  if (redirectPath) {
    localStorage.setItem('redirectPath', redirectPath);
  }

  window.location.assign(
    `${AUTH_GW_BASE_URL}/auth/openid/testbed/authentication-request?appContext=${generateAppContextHash()}`
  );
}

export function directToAuthGwLogout() {
  const idToken = Cookies.get('idToken');
  Cookies.remove('idToken');
  localStorage.removeItem('redirectPath');

  window.location.assign(
    `${AUTH_GW_BASE_URL}/auth/openid/testbed/logout-request?appContext=${generateAppContextHash()}&idToken=${idToken}`
  );
}

export async function logIn(authPayload: {
  loginCode: string;
  appContext: string;
}): Promise<LoggedInState> {
  const response = await apiClient.post(
    `${AUTH_GW_BASE_URL}/auth/openid/testbed/login-request`,
    authPayload,
    {
      withCredentials: true,
    }
  );

  if (response.status !== 200) {
    throw new Error('Error in login request');
  }

  return response.data;
}
