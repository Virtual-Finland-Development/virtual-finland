import { useRouter } from 'next/router';
import Page from '@/components/layout/page';

export default function CompanyEditPage() {
  const router = useRouter();
  // const id = router.query.id as string;
  const { id: nationalIdentifier } = router.query;
  console.log(nationalIdentifier);

  return (
    <Page title="Company edit">
      <div>moi {nationalIdentifier} </div>
    </Page>
  );
}
