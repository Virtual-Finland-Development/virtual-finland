import { useRouter } from 'next/router';
import { CompanyContextProvider } from '@/context/company-context';
import AuthSentry from '@/components/auth-sentry';
import Page from '@/components/layout/page';
import CompanyWizard from '../components/company-wizard';

export default function CompanyEditPage() {
  const router = useRouter();
  const { businessId } = router.query;

  if (!businessId) return null;

  return (
    <AuthSentry redirectPath="/company">
      <Page title="Company edit" withBorder={false}>
        <CompanyContextProvider businessId={businessId as string}>
          <CompanyWizard />
        </CompanyContextProvider>
      </Page>
    </AuthSentry>
  );
}
