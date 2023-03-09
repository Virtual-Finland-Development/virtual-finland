import { useQuery } from '@tanstack/react-query';
import api from '../api';

const OPTIONS = {
  refetchOnWindowFocus: false,
  cacheTime: Infinity,
  staleTime: 30_000,
};

function useCountries() {
  const query = useQuery(
    ['countries'],
    async () => await api.codesets.getCountries(),
    OPTIONS
  );

  if (query.isError) {
    console.log(query.error);
  }

  return query;
}

function useCurrencies() {
  const query = useQuery(
    ['currencies'],
    async () => await api.codesets.getCurrencies(),
    OPTIONS
  );

  if (query.isError) {
    console.log(query.error);
  }

  return query;
}

export { useCountries, useCurrencies };
