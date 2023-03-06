import {
  Expander,
  ExpanderContent,
  ExpanderTitleButton,
  Text,
} from 'suomifi-ui-components';
import { COMPANY_DATA_LABELS } from '@/lib/constants';
import { useCompanyContext } from '@/context/company-context';
import CustomHeading from '@/components/ui/custom-heading';

const dummyData = {
  company: {
    shareSeries: [
      {
        shareSeriesClass: 'A',
        numberOfShares: '12',
        shareValue: '12',
      },
      {
        shareSeriesClass: 'B',
        numberOfShares: '20',
        shareValue: '20',
      },
      {
        shareSeriesClass: 'C',
        numberOfShares: '30',
        shareValue: '30',
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
        name: 'asda owner',
        ownerships: [
          {
            shareSeriesClass: 'A',
            quantity: 100,
          },
          {
            shareSeriesClass: 'B',
            quantity: 200,
          },
          {
            shareSeriesClass: 'C',
            quantity: 300,
          },
        ],
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
        thoroughfare: 'dasd',
        locatorDesignator: 'asdasd',
        locatorName: 'asd',
        addressArea: '1231dsad',
        postCode: 'asdasd',
        postName: '123123',
        poBox: '123123',
        adminUnitLevel1: 'asdasda',
        adminUnitLevel2: 'asdasdasd',
      },
      {
        personalID: 'wau',
        givenName: 'wau',
        middleNames: 'wau',
        lastName: 'asd',
        dateOfBirth: '2023-03-02',
        nationality: 'sh908293482',
        fullAddress: 'asddas',
        thoroughfare: 'dasd',
        locatorDesignator: 'asdasd',
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
  company: '1. Details',
  beneficialOwners: '2. Beneficial owners',
  signatoryRights: '3. Signatory rights',
};

export default function Preview() {
  const { values } = useCompanyContext();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <CustomHeading variant="h4">Stage 4.1</CustomHeading>
        <CustomHeading variant="h2">Preview and submit</CustomHeading>
      </div>

      <div className="flex flex-col gap-6">
        {Object.entries(values).map(entry => {
          const title = EXPANDER_TITLES[entry[0]];
          const data: Record<string, any> = entry[1];

          return (
            <Expander key={title}>
              <ExpanderTitleButton>{title}</ExpanderTitleButton>
              <ExpanderContent className="!bg-suomifi-blue-bg-light !text-base">
                <div className="flex flex-col gap-4 mt-4">
                  {Object.keys(data).map(dataKey => {
                    const value = data[dataKey];
                    const isArray = Array.isArray(value);

                    return (
                      <div key={dataKey}>
                        <CustomHeading variant="h4">
                          {COMPANY_DATA_LABELS[dataKey] || ''}
                        </CustomHeading>

                        <div className="grid grid-cols-1 lg:grid-cols-2 mt-2 gap-4">
                          {isArray ? (
                            value.map((_, index) => (
                              <MultiValue
                                key={`${dataKey}-${index}`}
                                index={index}
                                valueObj={value[index]}
                              />
                            ))
                          ) : (
                            <div>
                              {Object.keys(value).map((key, i) => {
                                const nestedValue = value[key];
                                const isArray = Array.isArray(nestedValue);

                                return !isArray ? (
                                  <SingleValue
                                    key={i}
                                    label={COMPANY_DATA_LABELS[key] || ''}
                                    value={nestedValue}
                                  />
                                ) : (
                                  <MultiValue
                                    key={i}
                                    index={i}
                                    valueObj={nestedValue}
                                  />
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ExpanderContent>
            </Expander>
          );
        })}
      </div>
    </div>
  );
}

interface SingleValueProps {
  label: string;
  value: string;
}

function SingleValue({ label, value }: SingleValueProps) {
  return (
    <div>
      {label}: {value}
    </div>
  );
}

interface MultiValueProps {
  index: number;
  valueObj: Record<string, any>;
}

function MultiValue({ index, valueObj }: MultiValueProps) {
  try {
    return (
      <div className="flex flex-row">
        <Text className="!font-bold">{index + 1}.</Text>

        <div className="ml-2">
          {Object.keys(valueObj)
            .filter(valueKey => valueObj[valueKey])
            .map(valueKey => {
              const value = valueObj[valueKey];
              const isArray = Array.isArray(value);

              return !isArray ? (
                <SingleValue
                  key={valueKey}
                  label={COMPANY_DATA_LABELS[valueKey] || ''}
                  value={value}
                />
              ) : (
                <div key={valueKey}>
                  <Text className="!text-base">
                    {COMPANY_DATA_LABELS[valueKey] || ''}:
                  </Text>{' '}
                  {valueObj[valueKey].map(
                    (obj: Record<string, any>, i: number) => (
                      <MultiValue key={i} index={i} valueObj={obj} />
                    )
                  )}
                </div>
              );
            })}
        </div>
      </div>
    );
  } catch (err) {
    return null;
  }
}
