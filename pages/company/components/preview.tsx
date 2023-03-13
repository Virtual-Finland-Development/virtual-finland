import { useRouter } from 'next/router';
import CustomHeading from '@/components/ui/custom-heading';
import PreviewExpander from './preview-expander/preview-expander';

interface Props {
  previewType: 'all' | 'company' | 'beneficialOwners' | 'signatoryRights';
}

export default function Preview(props: Props) {
  const { previewType } = props;
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 w-full">
      {previewType !== 'all' && (
        <CustomHeading variant="h2">Preview</CustomHeading>
      )}

      {['all', 'company'].includes(previewType) && (
        <PreviewExpander
          type="company"
          title={previewType === 'all' ? '1. Details' : 'Details'}
          showEditButtons={previewType === 'all'}
          onEditClick={() => router.push('/company/establishment/details')}
          onClearClick={() => {}}
        />
      )}

      {['all', 'beneficialOwners'].includes(previewType) && (
        <PreviewExpander
          type="beneficialOwners"
          title={
            previewType === 'all' ? '2. Beneficial owners' : 'Beneficial owners'
          }
          showEditButtons={previewType === 'all'}
          onEditClick={() =>
            router.push('/company/establishment/beneficial-owners')
          }
          onClearClick={() => {}}
        />
      )}

      {['all', 'signatoryRights'].includes(previewType) && (
        <PreviewExpander
          type="signatoryRights"
          title={
            previewType === 'all' ? '3. Signatory rights' : 'Signatory rights'
          }
          showEditButtons={previewType === 'all'}
          onEditClick={() =>
            router.push('/company/establishment/signatory-rights')
          }
          onClearClick={() => {}}
        />
      )}
    </div>
  );
}
