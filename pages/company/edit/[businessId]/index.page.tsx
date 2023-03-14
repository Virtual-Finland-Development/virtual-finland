import { useRouter } from 'next/router';
import { Block, Button, Text } from 'suomifi-ui-components';
import { CompanyContextProvider } from '@/context/company-context';
import { useCompanyContext } from '@/context/company-context';
import AuthSentry from '@/components/auth-sentry';
import Page from '@/components/layout/page';
import CustomHeading from '@/components/ui/custom-heading';
import Loading from '@/components/ui/loading';
import Preview from '../../components/preview/preview';

export default function CompanyEditPage() {
  const router = useRouter();
  const { businessId } = router.query;

  const {
    doneSteps,
    saveCompany,
    isSaving,
    contextIsLoading,
    values: { company },
  } = useCompanyContext();

  const doneStepValues = Object.values(doneSteps);
  const allStepsDone = doneStepValues.every(isDone => isDone);

  if (!businessId) return null;

  return (
    <AuthSentry redirectPath="/company">
      <Page title="Company edit" withBorder={false}>
        {contextIsLoading && <Loading />}

        {!contextIsLoading && (
          <div className="md:border">
            <Block variant="section" className="px-4 lg:px-20 py-6 bg-white">
              <CustomHeading variant="h3">
                Modify company{' '}
                {company?.companyDetails?.name &&
                  `(${company.companyDetails.name})`}
              </CustomHeading>
              <div className="flex flex-col mt-4 gap-6 items-start">
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipisci elit, sed
                  eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquid ex ea commodi consequat. Quis aute
                  iure reprehenderit in voluptate velit esse cillum dolore eu
                  fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non
                  proident, sunt in culpa qui officia deserunt mollit anim id
                  est laborum.
                </Text>

                {!isSaving && <Preview previewType="all" />}

                {isSaving && (
                  <div className="w-full flex items-center justify-center h-[212px]">
                    <Loading text="Saving..." />
                  </div>
                )}

                <div className="flex flex-col w-full">
                  <div className="mt-5 border-t pt-5">
                    <Button
                      disabled={!allStepsDone || isSaving}
                      onClick={saveCompany}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </Block>
          </div>
        )}
      </Page>
    </AuthSentry>
  );
}

CompanyEditPage.provider = CompanyContextProvider;
