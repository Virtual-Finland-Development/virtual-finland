import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { BenecifialOwners, NonListedCompany } from '@/types';
import api from '../api';

const COMPANIES_QUERY_KEYS = ['companies'];
const COMPANY_QUERY_KEYS = ['company'];
const BENEFICIAL_OWNERS_QUERY_KEYS = ['beneficial-owners'];
const SIGNATORY_RIGHTS_QUERY_KEYS = ['signatory-rights'];

interface CompanyRelatedInput {
  nationalIdentifier: string;
}

interface SaveCompanyRelatedInput<T> {
  nationalIdentifier: string;
  data: T;
}

/**
 * Get all user companies.
 */
function useCompanies() {
  const query = useQuery(
    COMPANIES_QUERY_KEYS,
    async () => {
      try {
        return await api.company.getCompanies();
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return query;
}

/**
 * Get single company.
 */
function useCompany({ nationalIdentifier }: CompanyRelatedInput) {
  const query = useQuery(
    COMPANY_QUERY_KEYS,
    async () => {
      try {
        return await api.company.getCompany(nationalIdentifier);
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    {
      enabled: Boolean(nationalIdentifier),
      refetchOnWindowFocus: false,
    }
  );
}

/**
 * Save single company.
 */
function useSaveCompany() {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    NonListedCompany,
    Error,
    SaveCompanyRelatedInput<NonListedCompany>
  >(({ nationalIdentifier, data }) =>
    api.company.saveCompany({ nationalIdentifier, data })
  );

  return {
    update: async (nationalIdentifier: string, data: NonListedCompany) => {
      try {
        const response = await mutation.mutateAsync({
          nationalIdentifier,
          data,
        });
        queryClient.setQueryData(COMPANY_QUERY_KEYS, response);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    error: mutation.isError,
    loading: mutation.isLoading,
  };
}

/**
 * Get beneficial owners of a company.
 */
function useBeneficialOwners({ nationalIdentifier }: CompanyRelatedInput) {
  const query = useQuery(
    BENEFICIAL_OWNERS_QUERY_KEYS,
    async () => {
      try {
        // beneficial owners query
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    {
      enabled: Boolean(nationalIdentifier),
      refetchOnWindowFocus: false,
    }
  );

  return query;
}

/**
 * Save beneficial owners of a company.
 */
function useSaveBeneficialOwners() {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    BenecifialOwners,
    Error,
    SaveCompanyRelatedInput<BenecifialOwners>
  >(({ nationalIdentifier, data }) =>
    api.company.saveBeneficialOwners({ nationalIdentifier, data })
  );

  return {
    update: async (nationalIdentifier: string, data: BenecifialOwners) => {
      try {
        const response = await mutation.mutateAsync({
          nationalIdentifier,
          data,
        });
        queryClient.setQueryData(BENEFICIAL_OWNERS_QUERY_KEYS, response);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    error: mutation.isError,
    loading: mutation.isLoading,
  };
}

/**
 * Get signatory rights of  a company.
 */
function useSignatoryRights({ nationalIdentifier }: CompanyRelatedInput) {
  const query = useQuery(
    SIGNATORY_RIGHTS_QUERY_KEYS,
    async () => {
      try {
        // signatory rights query
      } catch (err) {
        console.log(err);
        return null;
      }
    },
    {
      enabled: Boolean(nationalIdentifier),
      refetchOnWindowFocus: false,
    }
  );

  return query;
}

export {
  useCompanies,
  useCompany,
  useSaveCompany,
  useBeneficialOwners,
  useSignatoryRights,
  useSaveBeneficialOwners,
};
