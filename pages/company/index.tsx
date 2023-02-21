import { Block, Button, Text } from 'suomifi-ui-components';
import Page from '@/components/layout/page';
import CustomHeading from '@/components/ui/custom-heading';

export default function CompanyPage() {
  return (
    <Page title="Company">
      <Block variant="section" className="px-4 py-6 bg-white">
        <CustomHeading variant="h2" suomiFiBlue="dark">
          Company page
        </CustomHeading>
        <div className="flex flex-col mt-8 gap-6">
          <Text>Company page content</Text>
          <Button>Click</Button>
        </div>
      </Block>
    </Page>
  );
}
