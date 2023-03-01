import { useCallback, useMemo } from 'react';
import {
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
  { label: '2. Shareholders', step: 'beneficialOwners.shareholders' as Step },
];

const SIGNATORY_RIGHTS_STEPS = [
  { label: '1. Share Series', step: 'beneficialOwners.shareSeries' as Step },
];

interface Props {
  heading: string;
  wizardType: 'company' | 'beneficialOwners' | 'signatoryRights';
}

export default function CompanyWizardNav(props: Props) {
  const { heading, wizardType } = props;
  const { width } = useDimensions();
  const {
    values,
    isStepDone,
    isPrevStepDone,
    companyStep,
    setCompanyStep,
    beneficialOwnersStep,
    setBeneficialOwnersStep,
    doneSteps,
  } = useCompanyContext();

  const step = wizardType === 'company' ? companyStep : beneficialOwnersStep;
  const stepFunc =
    wizardType === 'company' ? setCompanyStep : setBeneficialOwnersStep;

  const navSteps = useMemo(() => {
    if (wizardType === 'company') {
      return COMPANY_STEPS;
    } else if (wizardType === 'beneficialOwners') {
      return BENEFICIAL_OWNER_STEPS;
    } else if (wizardType === 'signatoryRights') {
      return SIGNATORY_RIGHTS_STEPS;
    }
    return [];
  }, [wizardType]);

  const getItemStatus = useCallback(
    (
      step: Step,
      index: number,
      currentStepNum: number
    ): WizardNavigationItemProps['status'] => {
      if (Object.keys(doneSteps).length) {
        const doneStepValues = Object.values(doneSteps);

        if (currentStepNum === index) {
          return isStepDone(step) ? 'current-completed' : 'current';
        } else if (doneStepValues.some((done, i) => i < index && !done)) {
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
    [doneSteps, isPrevStepDone, isStepDone]
  );

  return (
    <WizardNavigation
      heading={heading}
      aria-label="Company establishment wizard steps"
      initiallyExpanded={false}
      variant={width > 1024 ? 'default' : 'smallScreen'}
    >
      {navSteps.map((item, index) => {
        const status = getItemStatus(item.step, index, step);

        return (
          <WizardNavigationItem key={item.step} status={status}>
            <RouterLink onClick={() => stepFunc(index)}>
              {item.label}
            </RouterLink>
          </WizardNavigationItem>
        );
      })}
    </WizardNavigation>
  );
}
