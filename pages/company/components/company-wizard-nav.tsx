import {
  RouterLink,
  WizardNavigation,
  WizardNavigationItem,
} from 'suomifi-ui-components';
import { useCompanyContext } from '@/context/company-context';
import { Step } from '@/context/company-context';
import useDimensions from '@/hooks/use-dimensions';

const NAV_ITEMS = [
  {
    label: '1. Registrant',
    step: 'registrant' as Step,
  },
  {
    label: '2. Company details',
    step: 'companyDetails' as Step,
  },
  {
    label: '3. Company address',
    step: 'companyAddress' as Step,
  },
  {
    label: '4. Share series',
    step: 'shareSeries' as Step,
  },
  {
    label: '5. Managing directors',
    step: 'managingDirectors' as Step,
  },
  {
    label: '6. Board members',
    step: 'boardMembers' as Step,
  },
  {
    label: '7. Auditor',
    step: 'auditor' as Step,
  },
];

export default function CompanyWizardNav() {
  const { width } = useDimensions();
  const { isStepDone, isPrevStepDone, step, setStep } = useCompanyContext();

  return (
    <WizardNavigation
      heading="Company information"
      aria-label="Company establishment wizard steps"
      initiallyExpanded={false}
      variant={width > 1024 ? 'default' : 'smallScreen'}
    >
      {NAV_ITEMS.map((item, index) => (
        <WizardNavigationItem
          key={item.step}
          status={
            step === index
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
          <RouterLink onClick={() => setStep(index)}>{item.label}</RouterLink>
        </WizardNavigationItem>
      ))}
    </WizardNavigation>
  );
}
