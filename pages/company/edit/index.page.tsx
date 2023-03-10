import { useRouter } from 'next/router';
import { Block, Text } from 'suomifi-ui-components';
import { useCompanies } from '@/lib/hooks/companies';
import { CompanyContextProvider } from '@/context/company-context';
import AuthSentry from '@/components/auth-sentry';
import Page from '@/components/layout/page';
import CustomHeading from '@/components/ui/custom-heading';
import CustomLink from '@/components/ui/custom-link';
import Loading from '@/components/ui/loading';

export default function CompanyEdit() {
  const { data: companies, isLoading } = useCompanies();
  console.log(companies);
  const router = useRouter();

  return (
    <AuthSentry redirectPath="/company">
      <Page title="Modify company">
        <div className="md:border">
          <Block variant="section" className="px-4 py-6 bg-white">
            <CustomHeading variant="h2" suomiFiBlue="dark">
              Modify company
            </CustomHeading>
            <div className="flex flex-col mt-8 gap-6 items-start">
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipisci elit, sed
                eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquid ex ea commodi consequat. Quis aute iure
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint obcaecat cupiditat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>

              {isLoading ? (
                <Loading />
              ) : (
                <>
                  {!companies?.length ? (
                    <Text>No companies established.</Text>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {companies.map((company, index) => (
                        <CustomLink
                          key={company.businessId}
                          href={`/company/edit/${company.businessId}`}
                        >{`${index + 1}. ${
                          company.data.companyDetails.name
                        }`}</CustomLink>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </Block>
        </div>
      </Page>
    </AuthSentry>
  );
}

CompanyEdit.provider = CompanyContextProvider;
