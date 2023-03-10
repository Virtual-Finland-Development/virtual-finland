import { CompanyContextProvider } from '@/context/company-context';
import AuthSentry from '@/components/auth-sentry';
import Page from '@/components/layout/page';
import CompanyWizard from '../components/company-wizard';

export default function CompanyWizardPage() {
  return (
    <AuthSentry redirectPath="/company">
      <Page title="Company wizard" withBorder={false}>
        <CompanyContextProvider>
          <CompanyWizard />
        </CompanyContextProvider>
      </Page>
    </AuthSentry>
  );
}
