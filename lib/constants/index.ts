import { AppContextObj } from '@/types';

export const baseAppContextObj: AppContextObj = {
  appName: 'living-in-finland',
  redirectUrl: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/auth`,
};

export const COMPANY_DATA_LABELS: Record<string, any> = {
  registrant: 'Registrant',
  givenName: 'Given name',
  lastName: 'Last name',
  email: 'Email',
  phoneNumber: 'Phone number',
  companyDetails: 'Company details',
  name: 'Name',
  alternativeName: 'Alternative name',
  foundingDate: 'Founding date',
  industrySector: 'Industry sector',
  shareCapital: 'Share capital',
  capitalCurrency: 'Capital currency',
  settlementDeposit: 'Settlement deposit',
  depositCurrency: 'Deposit currency',
  settlementDate: 'Settlement date',
  countryOfResidence: 'Country of residence',
  shareSeries: 'Share series',
  shareSeriesClass: 'Share series class',
  numberOfShares: 'Number of shares',
  shareValue: 'Share value',
  companyAddress: 'Company address',
  fullAddress: 'Full address',
  thoroughfare: 'Thoroughfare',
  locatorDesignator: 'Locator designator',
  locatorName: 'Locator name',
  addressArea: 'Address area',
  postCode: 'Post code',
  postName: 'Post name',
  poBox: 'Post box',
  adminUnitLevel_1: 'Admin unit level 1',
  adminUnitLevel_2: 'Admin unit level 2',
  managingDirectors: 'Managing directors',
  role: 'Role',
  middleNames: 'Middle names',
  dateOfBirth: 'Date of birth',
  nationality: 'Nationality',
  boardMembers: 'Board members',
  auditorDetails: 'Auditor details',
  companyName: 'Company name',
  nationalIdentifier: 'National identifier',
  votesPerShare: 'Votes per share',
  shareholders: 'Shareholders',
  shareOwnership: 'Share ownership',
  quantity: 'Quantity',
  signinRights: 'Signin rights',
  personalID: 'Personal ID',
  shareValueCurrency: 'Share value currency',
};

type RequiredFields = Record<
  string,
  { multiLevel: boolean; requiredFields: string[] }
>;

export const COMPANY_REQUIRED_FIELDS: RequiredFields = {
  registrant: {
    multiLevel: false,
    requiredFields: ['givenName', 'lastName', 'email', 'phoneNumber'],
  },
  companyDetails: {
    multiLevel: false,
    requiredFields: [
      'name',
      'foundingDate',
      'industrySector',
      'shareCapital',
      'capitalCurrency',
    ],
  },
  shareSeries: {
    multiLevel: true,
    requiredFields: [
      'shareSeriesClass',
      'numberOfShares',
      'shareValue',
      'shareValueCurrency',
    ],
  },
  managingDirectors: {
    multiLevel: true,
    requiredFields: [
      'role',
      'givenName',
      'middleNames',
      'lastName',
      'dateOfBirth',
      'nationality',
    ],
  },
  boardMembers: {
    multiLevel: true,
    requiredFields: [
      'role',
      'givenName',
      'middleNames',
      'lastName',
      'dateOfBirth',
      'nationality',
    ],
  },
};

export const BENEFICIAL_OWNERS_REQUIRED_FIELDS: RequiredFields = {
  shareSeries: {
    multiLevel: true,
    requiredFields: ['shareSeriesClass', 'numberOfShares', 'votesPerShare'],
  },
  shareholders: {
    multiLevel: true,
    requiredFields: ['name', 'shareOwnership'],
  },
};

export const SIGNATORY_RIGHTS_REQUIRED_FIELDS: RequiredFields = {
  signinRights: {
    multiLevel: true,
    requiredFields: [
      'role',
      'givenName',
      'middleNames',
      'lastName',
      'dateOfBirth',
      'nationality',
    ],
  },
};
