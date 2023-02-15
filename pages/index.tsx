import { useState } from 'react';
import { Button, Heading } from 'suomifi-ui-components';
import api from '@/lib/api';
import Loading from '@/components/loading';

export default function HomePage() {
  const [isLoading, setLoading] = useState(false);

  const logOutHandler = () => {
    setLoading(true);
    api.auth.directToAuthGwLogout();
  };

  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <Heading variant="h1">Living in Finland - logged in</Heading>
      <Button onClick={logOutHandler} disabled={isLoading}>
        Log out
      </Button>
      {isLoading && <Loading />}
    </div>
  );
}
