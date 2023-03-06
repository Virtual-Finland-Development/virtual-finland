import {
  Expander,
  ExpanderContent,
  ExpanderTitleButton,
  Heading,
} from 'suomifi-ui-components';
import { useCompanyContext } from '@/context/company-context';

const dummyData = {
  company: {
    shareSeries: [
      {
        shareSeriesClass: 'A',
        numberOfShares: '12',
        shareValue: '12',
      },
    ],
    managingDirectors: [
      {
        role: 'director',
        givenName: '12',
        lastName: '12',
        middleNames: '12',
        dateOfBirth: '2023-03-10',
        nationality: 'h9823523',
      },
    ],
    boardMembers: [
      {
        role: 'chairperson',
        givenName: 'asdasd',
        lastName: 'asdasd',
        middleNames: 'asdasd',
        dateOfBirth: '2023-03-22',
        nationality: 'h9823523',
      },
    ],
    registrant: {
      givenName: 'asdasd',
      lastName: 'asdasd',
      email: 'asdasd@email.com',
      phoneNumber: '+12312312121',
    },
    companyDetails: {
      name: 'asd',
      alternativeName: 'asd',
      foundingDate: '2023-03-22',
      industrySector: '12',
      shareCapital: '12',
      settlementDeposit: '12',
      settlementDate: '2023-03-08',
      countryOfResidence: 'h9823523',
    },
    companyAddress: {
      fullAddress: 'asdasd',
      thoroughfare: null,
      locatorDesignator: null,
      locatorName: null,
      addressArea: null,
      postCode: null,
      postName: null,
      poBox: null,
      adminUnitLevel1: null,
      adminUnitLevel2: null,
    },
    auditor: {
      companyName: 'asdasd',
      nationalIdentifier: '12312',
    },
  },
  beneficialOwners: {
    shareSeries: [
      {
        shareSeriesClass: 'A',
        numberOfShares: '1',
        shareValue: '2',
        votesPerShare: '3',
      },
    ],
    shareholders: [
      {
        name: 'asda',
      },
    ],
  },
  signatoryRights: {
    signinRights: [
      {
        personalID: 'asd',
        givenName: 'asd',
        middleNames: 'asd',
        lastName: 'asd',
        dateOfBirth: '2023-03-02',
        nationality: 'sh908293482',
        fullAddress: 'asddas',
        thoroughfare: '',
        locatorDesignator: '',
        locatorName: '',
        addressArea: '',
        postCode: '',
        postName: '',
        poBox: '',
        adminUnitLevel1: '',
        adminUnitLevel2: '',
      },
    ],
  },
};

const EXPANDER_TITLES: Record<string, any> = {
  company: '1. Company details',
  beneficialOwners: '2. Beneficial owners',
  signatoryRights: '3. Signatory rights',
};

export default function Preview() {
  const { values } = useCompanyContext();

  return (
    <div className="flex flex-col gap-4">
      <Heading variant="h3">Review and submit</Heading>
      <div className="flex flex-col gap-6">
        {Object.entries(values).map(entry => {
          const title = EXPANDER_TITLES[entry[0]];
          const data = entry[1];
          console.log(data);

          return (
            <Expander key={title}>
              <ExpanderTitleButton>{title}</ExpanderTitleButton>
              <ExpanderContent className="!bg-suomifi-blue-bg-light">
                <pre>{JSON.stringify(data, null, 2)}</pre>
              </ExpanderContent>
            </Expander>
          );
        })}
      </div>
    </div>
  );
}
