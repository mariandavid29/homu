import { MultiSelect, Text } from '@mantine/core';
import type { MultiSelectProps } from '@mantine/core';

type BedroomsSelectProps = Omit<MultiSelectProps, 'data'>;

export function BedroomsSelect(props: BedroomsSelectProps) {
  const bedroomOptions = [
    { value: '1', label: '1', fullLabel: '1 bedroom' },
    { value: '2', label: '2', fullLabel: '2 bedrooms' },
    { value: '3', label: '3', fullLabel: '3 bedrooms' },
    { value: '4+', label: '4+', fullLabel: '4 bedrooms' },
  ];

  return (
    <MultiSelect
      placeholder='Bedrooms'
      size='md'
      data={bedroomOptions}
      renderOption={({ option }) => {
        const item = option as (typeof bedroomOptions)[number];
        return <Text>{item.fullLabel}</Text>;
      }}
      {...props}
    />
  );
}
