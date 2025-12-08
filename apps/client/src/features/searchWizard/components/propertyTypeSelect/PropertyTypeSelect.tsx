import { Select } from '@mantine/core';
import type { SelectProps } from '@mantine/core';

type PropertyTypeSelectProps = Omit<SelectProps, 'data'>;

export function PropertyTypeSelect(props: PropertyTypeSelectProps) {
  return (
    <Select
      placeholder='Property Type'
      size='md'
      data={[
        { value: 'apartment', label: 'Apartment' },
        { value: 'house', label: 'House' },
      ]}
      {...props}
    />
  );
}
