import { useCallback } from 'react';
import {
  RouterLink,
  WizardNavigation,
  WizardNavigationItem,
  WizardNavigationItemProps,
} from 'suomifi-ui-components';
import useDimensions from '@/lib/hooks/use-dimensions';
import { useCompanyContext } from '@/context/company-context';
import { Step } from '@/context/company-context';

const COMPANY_STEPS = [
  {
    label: '1. Registrant',
    step: 'company.registrant' as Step,
  },
  {
    label: '2. Company details',
    step: 'company.companyDetails' as Step,
  },
  {
    label: '3. Company address',
    step: 'company.companyAddress' as Step,
  },
  {
    label: '4. Share series',
    step: 'company.shareSeries' as Step,
  },
  {
    label: '5. Managing directors',
    step: 'company.managingDirectors' as Step,
  },
  {
    label: '6. Board members',
    step: 'company.boardMembers' as Step,
  },
  {
    label: '7. Auditor',
    step: 'company.auditor' as Step,
  },
];

const BENEFICIAL_OWNER_STEPS = [
  { label: '1. Share series', step: 'beneficialOwners.shareSeries' as Step },
  {
    label: '2. Shareholders',
    step: 'beneficialOwners.shareholders' as Step,
  },
];

const SIGNATORY_RIGHTS_STEPS = [
  {
    label: '1. Signin rights',
    step: 'signatoryRights.signinRights' as Step,
  },
];

interface Props {
  wizardType: 'company' | 'beneficialOwners' | 'signatoryRights';
  onWizardNavChange: (clickedStep: number) => void;
}

export default function CompanyWizardNav(props: Props) {
  const { wizardType, onWizardNavChange } = props;
  const { width } = useDimensions();
  const { isStepDone, isPrevStepDone, doneSteps, step, isLoading } =
    useCompanyContext();

  const navHeading =
    wizardType === 'company'
      ? 'Details'
      : wizardType === 'beneficialOwners'
      ? 'Beneficial owners'
      : 'Signatory rights';
  const navSteps =
    wizardType === 'company'
      ? COMPANY_STEPS
      : wizardType === 'beneficialOwners'
      ? BENEFICIAL_OWNER_STEPS
      : SIGNATORY_RIGHTS_STEPS;

  const trackedDoneSteps = Object.keys(doneSteps)
    .filter(key => key.includes(wizardType))
    .reduce((cur, key) => {
      return Object.assign(cur, { [key]: doneSteps[key] });
    }, {});
  const doneStepValues = Object.values(trackedDoneSteps);
  const allStepsDone =
    doneStepValues.length === navSteps.length &&
    doneStepValues.every(isDone => isDone);

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

      if (currentStepNum === index) {
        return isStepDone(step) ? 'current-completed' : 'current';
      } else {
        if (isStepDone(step)) {
          return 'completed';
        } else {
          return isPrevStepDone(step) ? 'default' : 'coming';
        }
      }
    },
    [doneStepValues, isPrevStepDone, isStepDone]
  );

  return (
    <WizardNavigation
      heading={navHeading}
      aria-label="Company establishment wizard steps"
      initiallyExpanded={false}
      variant={width > 1024 ? 'default' : 'smallScreen'}
      className={isLoading ? 'pointer-events-none' : ''}
    >
      {navSteps.map((item, index) => {
        const status = getItemStatus(item.step, index, step);

        return (
          <WizardNavigationItem key={item.step} status={status}>
            <RouterLink onClick={() => onWizardNavChange(index)}>
              {item.label}
            </RouterLink>
          </WizardNavigationItem>
        );
      })}
      <WizardNavigationItem
        status={
          allStepsDone
            ? step === navSteps.length
              ? 'current-completed'
              : 'default'
            : 'coming'
        }
      >
        <RouterLink onClick={() => onWizardNavChange(navSteps.length)}>
          {`${navSteps.length + 1}.`} Preview
        </RouterLink>
      </WizardNavigationItem>
    </WizardNavigation>
  );
}
