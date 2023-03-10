import { CountryOption, CurrencyOption } from '@/types';
import apiClient from '../api-client';
import { CODESETS_BASE_URL } from '../endpoints';

export async function getCountries(): Promise<CountryOption[]> {
  const { data } = await apiClient.get(
    `${CODESETS_BASE_URL}/resources/ISO3166CountriesURL`
  );
  return data;
}

export async function getCurrencies(): Promise<CurrencyOption[]> {
  const { data } = await apiClient.get(
    `${CODESETS_BASE_URL}/resources/ISO4217Currencies`
  );
  return data;
}
