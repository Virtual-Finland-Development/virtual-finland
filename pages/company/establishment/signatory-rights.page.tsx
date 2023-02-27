import { Block } from 'suomifi-ui-components';
import CompanyPagesWrapper from '../components/company-pages-wrapper';

export default function SignatoryRights() {
  return (
    <CompanyPagesWrapper>
      <div className="md:border">
        <Block variant="section" className="px-4 py-6 bg-white">
          Signatory rights
        </Block>
      </div>
    </CompanyPagesWrapper>
  );
}
