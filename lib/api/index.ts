import apiClient from './api-client';
import * as auth from './services/auth';
import * as testbedGW from './services/testbedGW';

const api = {
  client: apiClient,
  testbedGW,
  auth,
};

export default api;
