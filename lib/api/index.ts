import apiClient from './api-client';
import * as auth from './services/auth';
import * as codesets from './services/codesets';
import * as company from './services/company';

const api = {
  client: apiClient,
  auth,
  company,
  codesets,
};

export default api;
