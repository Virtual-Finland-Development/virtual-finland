import { useRouter } from 'next/router';
import { MdDone, MdOutlineInfo } from 'react-icons/md';
import lodash_get from 'lodash.get';
import {
  Block,
  Button,
  Expander,
  ExpanderContent,
  ExpanderTitleButton,
  InlineAlert,
  Text,
} from 'suomifi-ui-components';
import {
  BENEFICIAL_OWNERS_REQUIRED_FIELDS,
  COMPANY_DATA_LABELS,
  COMPANY_REQUIRED_FIELDS,
  SIGNATORY_RIGHTS_REQUIRED_FIELDS,
} from '@/lib/constants';
import {
  CompanyContextProvider,
  useCompanyContext,
} from '@/context/company-context';
import AuthSentry from '@/components/auth-sentry';
import Page from '@/components/layout/page';
import CustomHeading from '@/components/ui/custom-heading';
import MultiValue from '../components/expander/multi-value';
import SingleValue from '../components/expander/single-value';

interface DataExpanderProps {
  type: 'company' | 'beneficialOwners' | 'signatoryRights';
  title: string;
  requiredFields: Record<
    string,
    { multiLevel: boolean; requiredFields: string[] }
  >;
  onEditClick: () => void;
  onClearClick: () => void;
}

function DataExpander(props: DataExpanderProps) {
  const { type, title, requiredFields, onEditClick, onClearClick } = props;
  const { values, doneSteps } = useCompanyContext();

  const trackedValues = values[type];

  const trackedDoneSteps = Object.keys(doneSteps)
    .filter(key => key.includes(type))
    .reduce((cur, key) => {
      return Object.assign(cur, { [key]: doneSteps[key] });
    }, {});
  const doneStepValues = Object.values(trackedDoneSteps);
  const allStepsDone =
    doneStepValues.length > 0 && doneStepValues.every(isDone => isDone);

  return (
    <Expander>
      <ExpanderTitleButton>
        <div className="flex flex-row gap-2 items-center">
          <span>{title}</span>{' '}
          {allStepsDone ? (
            <MdDone size={22} color="green" />
          ) : (
            <MdOutlineInfo size={22} color="orange" />
          )}
        </div>
      </ExpanderTitleButton>
      <ExpanderContent className="!text-base">
        <div className="flex flex-col gap-4 mt-4">
          {Object.keys(requiredFields).map(key => {
            const requiredField = requiredFields[key];
            const isMultiLevel = requiredField.multiLevel;
            let fields = [];

            if (!isMultiLevel) {
              fields = requiredField.requiredFields;
            } else {
              const fieldValueArr = lodash_get(trackedValues, key);
              if (fieldValueArr) {
                fields = fieldValueArr.map((field: Record<string, any>) => {
                  return Object.keys(field)
                    .filter(fieldKey =>
                      requiredField.requiredFields.includes(fieldKey)
                    )
                    .reduce((cur, key) => {
                      return Object.assign(cur, { [key]: field[key] });
                    }, {});
                });
              }
            }

            return (
              <div key={key}>
                <CustomHeading variant="h4">
                  {COMPANY_DATA_LABELS[key] || ''}
                </CustomHeading>

                {!isMultiLevel && (
                  <div>
                    {fields.map((field: any) => {
                      const fieldValue = trackedValues
                        ? lodash_get(
                            trackedValues[key as keyof typeof trackedValues],
                            field
                          )
                        : '';

                      return (
                        <SingleValue
                          key={field}
                          label={COMPANY_DATA_LABELS[field] || ''}
                          value={fieldValue}
                        />
                      );
                    })}
                  </div>
                )}

                {isMultiLevel && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 mt-2 gap-4">
                    {fields?.length ? (
                      fields.map(
                        (field: Record<string, any>, index: number) => (
                          <MultiValue
                            key={index}
                            index={index}
                            valueObj={field}
                          />
                        )
                      )
                    ) : (
                      <Text>Information required.</Text>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-row gap-4 mt-8">
          <Button onClick={onEditClick}>Edit information</Button>
          <Button variant="secondary" onClick={onClearClick}>
            Clear data
          </Button>
        </div>
      </ExpanderContent>
    </Expander>
  );
}

export default function CompanyEstablishment() {
  const { doneSteps } = useCompanyContext();
  const router = useRouter();

  const doneStepValues = Object.values(doneSteps);
  const allStepsDone =
    doneStepValues.length === 10 && doneStepValues.every(isDone => isDone);

  return (
    <AuthSentry redirectPath="/company">
      <Page title="Company establishment  ">
        <div className="md:border">
          <Block variant="section" className="px-4 lg:px-20 py-6 bg-white">
            <CustomHeading variant="h3">
              Required information to provide for establishing a company in
              Finland
            </CustomHeading>
            <div className="flex flex-col mt-4 gap-6 items-start">
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipisci elit, sed
                eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquid ex ea commodi consequat. Quis aute iure
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint obcaecat cupiditat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>

              <DataExpander
                type="company"
                title="1. Details"
                requiredFields={COMPANY_REQUIRED_FIELDS}
                onEditClick={() =>
                  router.push('/company/establishment/details')
                }
                onClearClick={() => {}}
              />

              <DataExpander
                type="beneficialOwners"
                title="2. Beneficial owners"
                requiredFields={BENEFICIAL_OWNERS_REQUIRED_FIELDS}
                onEditClick={() =>
                  router.push('/company/establishment/beneficial-owners')
                }
                onClearClick={() => {}}
              />

              <DataExpander
                type="signatoryRights"
                title="3. Signatory rights"
                requiredFields={SIGNATORY_RIGHTS_REQUIRED_FIELDS}
                onEditClick={() =>
                  router.push('/company/establishment/signatory-rights')
                }
                onClearClick={() => {}}
              />

              <div className="flex flex-col w-full">
                <div className="border-b pb-6">
                  <InlineAlert status="warning">
                    <Text className="!font-bold">
                      Before you submit, be sure to preview all the information
                      you provide to make sure it´s correct and up-to-date.
                    </Text>
                  </InlineAlert>
                </div>

                <div className="mt-5">
                  <Button disabled={!allStepsDone}>Submit</Button>
                </div>
              </div>
            </div>
          </Block>
        </div>
      </Page>
    </AuthSentry>
  );
}

CompanyEstablishment.provider = CompanyContextProvider;
