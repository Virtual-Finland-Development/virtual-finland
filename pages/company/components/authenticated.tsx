import { useRouter } from 'next/router';
import { Block, Button, Text } from 'suomifi-ui-components';
import { useCompanies } from '@/lib/hooks/companies';
import CustomHeading from '@/components/ui/custom-heading';
import CustomLink from '@/components/ui/custom-link';
import Loading from '@/components/ui/loading';

export default function Authenticated() {
  const router = useRouter();

  const { data: companies, isLoading } = useCompanies();
  console.log(companies);

  return (
    <>
      <Block variant="section" className="px-4 py-6 bg-white">
        <div className="flex flex-col gap-6 items-start">
          <CustomHeading variant="h2" suomiFiBlue="dark">
            Company establishment
          </CustomHeading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod
            tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex
            ea commodi consequat. Quis aute iure reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
            obcaecat cupiditat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </Text>

          <Button onClick={() => router.push('/company/establishment')}>
            Establish company
          </Button>
        </div>

        <div className="flex flex-col mt-8 gap-6 items-start">
          <CustomHeading variant="h2" suomiFiBlue="dark">
            Modify company
          </CustomHeading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod
            tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex
            ea commodi consequat. Quis aute iure reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
            obcaecat cupiditat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </Text>
          <Button onClick={() => router.push('/company/edit')}>
            Modify existing companies
          </Button>
        </div>
      </Block>
    </>
  );
}
