import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  RouterLink,
  WizardNavigation,
  WizardNavigationItem,
} from 'suomifi-ui-components';
import useDimensions from '@/hooks/use-dimensions';

type Status =
  | 'default'
  | 'disabled'
  | 'completed'
  | 'coming'
  | 'current'
  | 'current-completed';

const NAV_ITEMS = [
  {
    href: '/company/establishment',
    label: '1. Registrant',
    status: 'completed' as Status,
  },
  {
    href: '/company/establishment/step2',
    label: '2. Company details',
    status: 'default' as Status,
  },
  {
    href: '/company/establishment/step3',
    label: '3. Company address',
    status: 'default' as Status,
  },
  {
    href: '/company/establishment/step4',
    label: '4. Share series',
    status: 'default' as Status,
  },
  {
    href: '/company/establishment/step5',
    label: '5. Managing directors',
    status: 'default' as Status,
  },
  {
    href: '/company/establishment/step6',
    label: '6. Board members',
    status: 'coming' as Status,
  },
  {
    href: '/company/establishment/step7',
    label: '7. Auditor',
    status: 'coming' as Status,
  },
];

export default function CompanyWizardNav() {
  const router = useRouter();
  const { width } = useDimensions();

  return (
    <WizardNavigation
      heading="Steps"
      aria-label="Company wizard steps"
      initiallyExpanded={false}
      variant={width > 768 ? 'default' : 'smallScreen'}
    >
      {NAV_ITEMS.map(item => (
        <WizardNavigationItem
          key={item.href}
          status={router.pathname === item.href ? 'current' : item.status}
        >
          <Link href={item.href} passHref legacyBehavior>
            <RouterLink>{item.label}</RouterLink>
          </Link>
        </WizardNavigationItem>
      ))}
    </WizardNavigation>
  );
}
