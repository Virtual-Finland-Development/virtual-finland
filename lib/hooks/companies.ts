import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { BenecifialOwners, NonListedCompany } from '@/types';
import api from '../api';

const COMPANIES_QUERY_KEYS = ['companies'];
const COMPANY_QUERY_KEY = 'company';
const BENEFICIAL_OWNERS_QUERY_KEY = 'beneficial-owners';
const SIGNATORY_RIGHTS_QUERY_KEY = 'signatory-rights';

interface SaveCompanyRelatedInput<T> {
  businessId: string;
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
function useCompany(businessId: string | undefined) {
  const query = useQuery(
    [COMPANY_QUERY_KEY, businessId],
    async () => {
      try {
        return await api.company.getCompany(businessId as string);
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    {
      enabled: Boolean(businessId),
      refetchOnWindowFocus: false,
    }
  );

  return query;
}

/**
 * Save single company.
 */
/* function useSaveCompany() {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    NonListedCompany,
    Error,
    SaveCompanyRelatedInput<NonListedCompany>
  >(({ businessId, data }) =>
    api.company.saveCompany({ businessId, data })
  );

  return {
    save: async (businessId: string, data: NonListedCompany) => {
      try {
        const response = await mutation.mutateAsync({
          businessId,
          data,
        });
        queryClient.setQueryData([COMPANY_QUERY_KEY, businessId], response);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    error: mutation.isError,
    isSaving: mutation.isLoading,
  };
} */

/**
 * Get beneficial owners of a company.
 */
function useBeneficialOwners(businessId: string | undefined) {
  const query = useQuery(
    [BENEFICIAL_OWNERS_QUERY_KEY, businessId],
    async () => {
      try {
        return await api.company.getBeneficialOwners(businessId as string);
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    {
      enabled: Boolean(businessId),
      refetchOnWindowFocus: false,
    }
  );

  return query;
}

/**
 * Save beneficial owners of a company.
 */
/* function useSaveBeneficialOwners() {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    BenecifialOwners,
    Error,
    SaveCompanyRelatedInput<BenecifialOwners>
  >(({ businessId, data }) =>
    api.company.saveBeneficialOwners({ businessId, data })
  );

  return {
    save: async (businessId: string, data: BenecifialOwners) => {
      try {
        const response = await mutation.mutateAsync({
          businessId,
          data,
        });
        queryClient.setQueryData(
          [BENEFICIAL_OWNERS_QUERY_KEY, businessId],
          response
        );
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    error: mutation.isError,
    isSaving: mutation.isLoading,
  };
} */

/**
 * Get signatory rights of a company.
 */
function useSignatoryRights(businessId: string | undefined) {
  const query = useQuery(
    [SIGNATORY_RIGHTS_QUERY_KEY, businessId],
    async () => {
      try {
        return await api.company.getSignatoryRights(businessId as string);
      } catch (err) {
        console.log(err);
        return null;
      }
    },
    {
      enabled: Boolean(businessId),
      refetchOnWindowFocus: false,
    }
  );

  return query;
}

export { useCompanies, useCompany, useBeneficialOwners, useSignatoryRights };
