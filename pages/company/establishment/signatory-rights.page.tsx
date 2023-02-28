import { Block } from 'suomifi-ui-components';
import {
  CompanyContextProvider,
  useCompanyContext,
} from '@/context/company-context';
import CompanyPagesWrapper from '../components/company-pages-wrapper';
import SignatoryRightsForm from '../components/signatory-rights-form';

export default function SignatoryRights() {
  useCompanyContext();

  return (
    <CompanyPagesWrapper>
      <div className="md:border">
        <Block variant="section" className="px-4 py-6 bg-white">
          <SignatoryRightsForm />
        </Block>
      </div>
    </CompanyPagesWrapper>
  );
}

SignatoryRights.provider = CompanyContextProvider;
