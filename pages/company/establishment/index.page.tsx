import { Block, Button, InlineAlert, Text } from 'suomifi-ui-components';
import {
  CompanyContextProvider,
  useCompanyContext,
} from '@/context/company-context';
import AuthSentry from '@/components/auth-sentry';
import Page from '@/components/layout/page';
import CustomHeading from '@/components/ui/custom-heading';
import Preview from '../components/preview';

export default function CompanyEstablishment() {
  const { doneSteps } = useCompanyContext();

  const doneStepValues = Object.values(doneSteps);
  const allStepsDone = doneStepValues.every(isDone => isDone);

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

              <Preview previewType="all" />

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
