import { Block } from 'suomifi-ui-components';
import CompanyPagesWrapper from '../components/company-pages-wrapper';

export default function BeneficialOwners() {
  return (
    <CompanyPagesWrapper>
      <div className="md:border">
        <Block variant="section" className="px-4 py-6 bg-white">
          Beneficial owners
        </Block>
      </div>
    </CompanyPagesWrapper>
  );
}
