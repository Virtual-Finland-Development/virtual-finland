import { useRouter } from 'next/router';
import { Block, Button, Text } from 'suomifi-ui-components';
import CustomHeading from '@/components/ui/custom-heading';

export default function Authenticated() {
  const router = useRouter();

  return (
    <>
      <Block variant="section" className="px-4 py-6 bg-white">
        <CustomHeading variant="h2" suomiFiBlue="dark">
          Company page
        </CustomHeading>
        <div className="flex flex-col mt-8 gap-6">
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
      </Block>
    </>
  );
}
