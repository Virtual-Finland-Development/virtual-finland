import axios from 'axios';
import Cookies from 'js-cookie';
import { PRH_MOCK_BASE_URL } from './endpoints';

const apiClient = axios.create({});

const DATA_URLS = [
  `${PRH_MOCK_BASE_URL}/draft/NSG/Agent/LegalEntity/NonListedCompany/Establishment`,
  `${PRH_MOCK_BASE_URL}/draft/NSG/Agent/LegalEntity/NonListedCompany/Establishment/Write`,
  `${PRH_MOCK_BASE_URL}/draft/NSG/Agent/LegalEntity/NonListedCompany/BeneficialOwners`,
  `${PRH_MOCK_BASE_URL}/draft/NSG/Agent/LegalEntity/NonListedCompany/BeneficialOwners/Write`,
  `${PRH_MOCK_BASE_URL}/draft/NSG/Agent/LegalEntity/NonListedCompany/SignatoryRights`,
  `${PRH_MOCK_BASE_URL}/draft/NSG/Agent/LegalEntity/NonListedCompany/SignatoryRights/Write`,
];

apiClient.interceptors.request.use(config => {
  if (config.url !== undefined && config.headers !== undefined) {
    if (DATA_URLS.includes(config.url)) {
      const idToken = Cookies.get('idToken');
      config.headers.Authorization = idToken ? `Bearer ${idToken}` : '';
    }
  }

  return config;
});

export default apiClient;
