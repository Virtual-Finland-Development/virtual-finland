import { Block } from 'suomifi-ui-components';
import Page from '@/components/layout/page';
import CompanyFormStep1 from '../components/company-form-step1';
import CompanyWizardNav from '../components/company-wizard-nav';
import Wrapper from './wrapper';

export default function CompanyEstablishmentPage() {
  return (
    <Wrapper>
      <CompanyFormStep1 />
    </Wrapper>
  );
}
