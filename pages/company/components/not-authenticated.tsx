import Image from 'next/image';
import { Block, Button, Text } from 'suomifi-ui-components';
import { StaticIcon } from 'suomifi-ui-components';
import api from '@/lib/api';
import CustomHeading from '@/components/ui/custom-heading';
import CustomText from '@/components/ui/custom-text';

export default function NotAuthenticated() {
  const loginHandler = () => {
    api.auth.directToAuthGwLogin('/company');
  };

  return (
    <>
      <Block variant="section" className="px-4 py-6 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-1">
          <div className="bg-suomifi-light text-white flex flex-col gap-8 items-center justify-center px-4 py-8">
            <div className="hidden md:block">
              <StaticIcon
                icon="buildings"
                className="h-16 w-16 flex-shrink-0 bg-white rounded-full"
              />
            </div>
            <CustomHeading variant="h2" center>
              Establish a company or modify company information
            </CustomHeading>
            <CustomText $center>
              Identify yourself into Company. You can then establish a company
              or modify existing company information.
            </CustomText>
            <Button icon="login" variant="inverted" onClick={loginHandler}>
              Identification
            </Button>
          </div>
          <div className="hidden md:block relative">
            <Image
              src="/images/man-laptop.jpg"
              alt="Man with laptop"
              className="object-cover"
              fill
              sizes="(max-width: 1200px) 50%, 100%"
              priority
            />
          </div>
        </div>
        <div className="flex flex-col mt-8 gap-6">
          <CustomHeading variant="h2" suomiFiBlue="dark">
            Company page header
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
        </div>
      </Block>
    </>
  );
}
