import { useCallback, useMemo } from 'react';
import {
  Heading,
  RouterLink,
  WizardNavigation,
  WizardNavigationItem,
  WizardNavigationItemProps,
} from 'suomifi-ui-components';
import { useCompanyContext } from '@/context/company-context';
import { Step } from '@/context/company-context';
import useDimensions from '@/hooks/use-dimensions';

const COMPANY_STEPS = [
  {
    label: '1.1 - Registrant',
    step: 'company.registrant' as Step,
  },
  {
    label: '1.2 - Company details',
    step: 'company.companyDetails' as Step,
  },
  {
    label: '1.3 - Company address',
    step: 'company.companyAddress' as Step,
  },
  {
    label: '1.4 - Share series',
    step: 'company.shareSeries' as Step,
  },
  {
    label: '1.5 - Managing directors',
    step: 'company.managingDirectors' as Step,
  },
  {
    label: '1.6 - Board members',
    step: 'company.boardMembers' as Step,
  },
  {
    label: '1.7 - Auditor',
    step: 'company.auditor' as Step,
  },
];

const BENEFICIAL_OWNER_STEPS = [
  { label: '2.1 - Share series', step: 'beneficialOwners.shareSeries' as Step },
  {
    label: '2.2 - Shareholders',
    step: 'beneficialOwners.shareholders' as Step,
  },
];

const SIGNATORY_RIGHTS_STEPS = [
  {
    label: '3.1 - Signin rights',
    step: 'signatoryRights.signinRights' as Step,
  },
];

interface Props {
  onWizardNavChange: (clickedStep: number) => void;
}

export default function CompanyWizardNav(props: Props) {
  const { onWizardNavChange } = props;
  const { width } = useDimensions();
  const { isStepDone, isPrevStepDone, doneSteps, step } = useCompanyContext();
  const doneStepValues = Object.values(doneSteps);

  const getItemStatus = useCallback(
    (
      step: Step,
      index: number,
      currentStepNum: number
    ): WizardNavigationItemProps['status'] => {
      if (doneStepValues.length) {
        if (currentStepNum === index) {
          return isStepDone(step) ? 'current-completed' : 'current';
        } else if (doneStepValues.some((isDone, i) => i < index && !isDone)) {
          return 'coming';
        }
      }

      return currentStepNum === index
        ? isStepDone(step)
          ? 'current-completed'
          : 'current'
        : isStepDone(step)
        ? 'completed'
        : isPrevStepDone(step)
        ? 'default'
        : 'coming';
    },
    [doneStepValues, isPrevStepDone, isStepDone]
  );

  return (
    <WizardNavigation
      heading="Stages"
      aria-label="Company establishment wizard steps"
      initiallyExpanded={false}
      variant={width > 1024 ? 'default' : 'smallScreen'}
    >
      <div className="ml-5 mb-2">
        <Heading variant="h5">1. Company details</Heading>
      </div>
      {COMPANY_STEPS.map((item, index) => {
        const status = getItemStatus(item.step, index, step);

        return (
          <WizardNavigationItem key={item.step} status={status}>
            <RouterLink onClick={() => onWizardNavChange(index)}>
              {item.label}
            </RouterLink>
          </WizardNavigationItem>
        );
      })}

      <div className="ml-5 mb-2 mt-4">
        <Heading variant="h5">2. Beneficial owners</Heading>
      </div>
      {BENEFICIAL_OWNER_STEPS.map((item, i) => {
        const index = i + 7;
        const status = getItemStatus(item.step, index, step);

        return (
          <WizardNavigationItem key={item.step} status={status}>
            <RouterLink onClick={() => onWizardNavChange(index)}>
              {item.label}
            </RouterLink>
          </WizardNavigationItem>
        );
      })}

      <div className="ml-5 mb-2 mt-4">
        <Heading variant="h5">3. Signatory rights</Heading>
      </div>
      {SIGNATORY_RIGHTS_STEPS.map((item, i) => {
        const index = i + 9;
        const status = getItemStatus(item.step, index, step);

        return (
          <WizardNavigationItem key={item.step} status={status}>
            <RouterLink onClick={() => onWizardNavChange(index)}>
              {item.label}
            </RouterLink>
          </WizardNavigationItem>
        );
      })}
    </WizardNavigation>
  );
}
