import { Group, MultiSelect } from '@mantine/core';
import { Bed } from 'lucide-react';
import type { MultiSelectProps } from '@mantine/core';

type BedroomsSelectProps = Omit<MultiSelectProps, 'data'>;

export function BedroomsSelect(props: BedroomsSelectProps) {
  const renderSelectOption: MultiSelectProps['renderOption'] = ({ option }) => (
    <Group gap='xs'>
      <Bed size={16} />
      <span>{option.label}</span>
    </Group>
  );

  return (
    <MultiSelect
      placeholder='Number of Bedrooms'
      size='md'
      data={[
        { value: '1', label: '1 bedroom' },
        { value: '2', label: '2 bedrooms' },
        { value: '3', label: '3 bedrooms' },
        { value: '4', label: '4 bedrooms' },
        { value: '5+', label: '5+ bedrooms' },
      ]}
      renderOption={renderSelectOption}
      {...props}
    />
  );
}
