import { useState } from 'react';
import { Block, Button, Text, TextInput } from 'suomifi-ui-components';
import api from '@/lib/api';
import Page from '@/components/layout/page';
import CustomHeading from '@/components/ui/custom-heading';

export default function Profile() {
  const [isLoading, setLoading] = useState(false);

  const loginHandler = () => {
    setLoading(true);
    api.auth.directToAuthGwLogin();
  };

  return (
    <Page title="Profile">
      <Block variant="section" className="px-4 py-6 bg-white">
        <CustomHeading variant="h2" suomiFiBlue="dark">
          Create your profile
        </CustomHeading>
        <div className="flex flex-col mt-8 gap-6">
          <Text>
            Choose which service to use to log in to Living in Finland.
          </Text>
          <Button onClick={loginHandler} disabled={isLoading}>
            {isLoading ? 'Redirecting...' : 'Login with testbed'}
          </Button>
        </div>
      </Block>
      <Block variant="section" className="bg-suomifi-blue-bg-light px-4 py-6">
        <CustomHeading variant="h2" suomiFiBlue="dark">
          Or register with email address
        </CustomHeading>
        <form className="flex flex-col items-start mt-8 gap-6">
          <TextInput labelText="First name" />
          <TextInput labelText="Last name" />
          <TextInput labelText="Email address" type="email" />
          <Button>Create profile</Button>
        </form>
      </Block>
    </Page>
  );
}
