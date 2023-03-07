import apiClient from './api-client';
import * as auth from './services/auth';
import * as company from './services/company';

const api = {
  client: apiClient,
  auth,
  company,
};

export default api;
