import apiClient from './api-client';
import * as auth from './services/auth';

const api = {
  client: apiClient,
  auth,
};

export default api;
