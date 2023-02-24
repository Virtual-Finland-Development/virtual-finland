import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  RouterLink,
  WizardNavigation,
  WizardNavigationItem,
} from 'suomifi-ui-components';
import { useCompanyForm } from '@/context/company-form-context';
import { Step } from '@/context/company-form-context';
import useDimensions from '@/hooks/use-dimensions';

const NAV_ITEMS = [
  {
    href: '/company/establishment/registrant',
    label: '1. Registrant',
    step: 'registrant' as Step,
    stepNumber: 0,
  },
  {
    href: '/company/establishment/company-details',
    label: '2. Company details',
    step: 'companyDetails' as Step,
    stepNumber: 1,
  },
  {
    href: '/company/establishment/company-address',
    label: '3. Company address',
    step: 'companyAddress' as Step,
    stepNumber: 2,
  },
  {
    href: '/company/establishment/share-series',
    label: '4. Share series',
    step: 'shareSeries' as Step,
    stepNumber: 3,
  },
  {
    href: '/company/establishment/managing-directors',
    label: '5. Managing directors',
    step: 'managingDirectors' as Step,
    stepNumber: 4,
  },
  {
    href: '/company/establishment/board-members',
    label: '6. Board members',
    step: 'boardMembers' as Step,
    stepNumber: 5,
  },
  /* {
    href: '/company/establishment/step7',
    label: '7. Auditor',
    status: 'coming' as Status,
  }, */
];

export default function CompanyWizardNav() {
  const router = useRouter();
  const { width } = useDimensions();
  const { isStepDone, isPrevStepDone, step, setStep } = useCompanyForm();

  return (
    <WizardNavigation
      heading="Company Establishment"
      aria-label="Company establishment wizard steps"
      initiallyExpanded={false}
      variant={width > 768 ? 'default' : 'smallScreen'}
    >
      {NAV_ITEMS.map(item => (
        <WizardNavigationItem
          key={item.href}
          /* status={
            router.pathname === item.href
              ? isStepDone(item.step)
                ? 'current-completed'
                : 'current'
              : isStepDone(item.step)
              ? 'completed'
              : isPrevStepDone(item.step)
              ? 'default'
              : 'coming'
          } */
          status={
            step === item.stepNumber
              ? isStepDone(item.step)
                ? 'current-completed'
                : 'current'
              : isStepDone(item.step)
              ? 'completed'
              : isPrevStepDone(item.step)
              ? 'default'
              : 'coming'
          }
        >
          {/* <Link href={item.href} passHref legacyBehavior> */}
          <RouterLink onClick={() => setStep(item.stepNumber)}>
            {item.label}
          </RouterLink>
          {/* </Link> */}
        </WizardNavigationItem>
      ))}
    </WizardNavigation>
  );
}
