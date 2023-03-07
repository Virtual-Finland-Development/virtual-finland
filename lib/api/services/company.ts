import type {
  BenecifialOwners,
  NonListedCompany,
  SignatoryRights,
} from '@/types';
import apiClient from '../api-client';

interface CompanyPayload {
  nationalIdentifier: string;
  data: NonListedCompany;
}

interface BeneficialOwnersPayload {
  nationalIdentifier: string;
  data: BenecifialOwners;
}

interface SignatoryRightsPayload {
  nationalIdentifier: string;
  data: SignatoryRights;
}

export async function getCompanies(): Promise<NonListedCompany[]> {
  const { data } = await apiClient.post('someurl');
  return data;
}

export async function getCompany(
  nationalIdentifier: string
): Promise<NonListedCompany> {
  const { data } = await apiClient.post('someurl', { nationalIdentifier });
  return data;
}

export async function saveCompany(
  payload: CompanyPayload
): Promise<NonListedCompany> {
  const { data } = await apiClient.post('someurl', payload);
  return data;
}

export async function getBeneficialOwners(
  nationalIdentifier: string
): Promise<BenecifialOwners> {
  const { data } = await apiClient.post('someurl', { nationalIdentifier });
  return data;
}

export async function saveBeneficialOwners(
  payload: BeneficialOwnersPayload
): Promise<BenecifialOwners> {
  const { data } = await apiClient.post('someurl', payload);
  return data;
}

export async function getSignatoryRights(
  nationalIdentifier: string
): Promise<SignatoryRights> {
  const { data } = await apiClient.post('someurl', { nationalIdentifier });
  return data;
}

export async function saveSignatoryRights(
  payload: SignatoryRightsPayload
): Promise<SignatoryRights> {
  const { data } = await apiClient.post('someurl', payload);
  return data;
}
