import { forwardRef } from 'react';
import { useState } from 'react';
import {
  Block,
  Button,
  Heading,
  StaticIcon,
  Link as SuomiFiLink,
  Text,
} from 'suomifi-ui-components';
import api from '@/lib/api';
import CustomLink from '@/components/custom-link';

export default function HomePage() {
  const [isLoading, setLoading] = useState(false);

  const logOutHandler = () => {
    setLoading(true);
    api.auth.directToAuthGwLogout();
  };

  return (
    <>
      <Block variant="section" className="bg-suomifi-blue-bg px-4 py-6">
        <Heading variant="h2">
          The only service you need for moving into Finland
        </Heading>
        <div className="flex flex-col mt-8">
          <StaticIcon icon="archive" className="h-16 w-16" />
          <Text>
            All information and services about moving to Finland and living in
            Finland can be found under one address. From here, you can apply to
            all Finnish government agencies from one place. Whether you are
            starting your process of moving to Finland or you have already
            entered country you’ll find guidance and tools to communicate with
            right authorities.
          </Text>
        </div>
        <div className="flex flex-col mt-8">
          <StaticIcon icon="archive" className="h-16 w-16" />
          <Text>
            For the beginning all you need is to create your own profile and
            start the application process. After having profile you have full
            access to your personal data at anytime and from anywhere.
          </Text>
        </div>
      </Block>

      <Block variant="section" className="bg-suomifi-blue-bg px-4 py-6">
        <Heading variant="h2">Start by creating your profile</Heading>
        <div className="py-4">
          <Button>Create profile</Button>
        </div>
      </Block>

      <Block variant="section" className="bg-white px-4 py-6">
        <Heading variant="h2">What can I do here?</Heading>
        <div className="flex flex-col mt-4">
          <Text>
            Choose who you’re presenting and click for more information about
            what can you do.
          </Text>
          <div className="flex flex-col gap-6 mt-6">
            <div className="flex flex-row items-center gap-6">
              <StaticIcon icon="archive" className="h-16 w-16 flex-shrink-0" />
              <CustomLink href="#">Apply for yourself</CustomLink>
            </div>
            <div className="flex flex-row items-center gap-6">
              <StaticIcon icon="archive" className="h-16 w-16 flex-shrink-0" />
              <CustomLink href="#">Apply on behalf of someone</CustomLink>
            </div>
            <div className="flex flex-row items-center gap-6">
              <StaticIcon icon="archive" className="h-16 w-16 flex-shrink-0" />
              <CustomLink href="#">
                Apply on behalf of company or organization
              </CustomLink>
            </div>
          </div>
        </div>
      </Block>

      <Block variant="section" className="bg-white px-4 py-6">
        <Heading variant="h2">{`I'm coming finland to`}</Heading>
        <div className="flex flex-col mt-4">
          <div className="bg-suomifi-blue-bg flex flex-row items-center gap-6">
            <StaticIcon icon="archive" className="h-16 w-16 flex-shrink-0" />
            <CustomLink href="#" bold={true}>
              work
            </CustomLink>
          </div>
          <div className="flex flex-row items-center gap-6">
            <StaticIcon icon="archive" className="h-16 w-16 flex-shrink-0" />
            <CustomLink href="#" bold={true}>
              study
            </CustomLink>
          </div>
          <div className="bg-suomifi-blue-bg flex flex-row items-center gap-6">
            <StaticIcon icon="archive" className="h-16 w-16 flex-shrink-0" />
            <CustomLink href="#" bold={true}>
              create business
            </CustomLink>
          </div>
          {/* <div className="">along with family</div>
          <div className="">other</div> */}
        </div>
      </Block>
    </>
  );
}
