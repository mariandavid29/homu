import { Select } from '@mantine/core';
import type { SelectProps } from '@mantine/core';

type ListingTypeSelectProps = Omit<SelectProps, 'data'>;

export function ListingTypeSelect(props: ListingTypeSelectProps) {
  return (
    <Select
      placeholder='Listing Type'
      size='md'
      {...props}
      data={[
        { value: 'sale', label: 'Sale' },
        { value: 'rent', label: 'Rent' },
      ]}
    />
  );
}
