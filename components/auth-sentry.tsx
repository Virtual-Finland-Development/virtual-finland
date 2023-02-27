import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { useAuth } from '@/context/auth-context';

interface Props {
  children: ReactNode;
  redirectPath?: string;
}

export default function AuthSentry(props: Props) {
  const { children, redirectPath } = props;
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    router.push(redirectPath || '/');
    return null;
  }

  return <>{children}</>;
}
