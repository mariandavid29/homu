import { ActionIcon, Box, Group } from '@mantine/core';
import { Search as SearchIcon } from 'lucide-react';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';

import { ListingTypeSelect } from '../listingTypeSelect/ListingTypeSelect';
import { BedroomsSelect } from '../bedroomsSelect/BedroomsSelect';
import { PropertyTypeSelect } from '../propertyTypeSelect/PropertyTypeSelect';
import { LocationSelect } from '../locationSelect/LocationSelect';
import styles from './QuickSearch.module.css';

export function QuickSearch() {
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      listingType: '',
      location: '',
      propertyType: '',
      bedRooms: [],
    },
    validate: zod4Resolver({}),
  });

  return (
    <Box className={styles.searchContainer}>
      <form>
        <Group>
          <ListingTypeSelect {...form.getInputProps('listingType')} />
          <LocationSelect {...form.getInputProps('location')} />
          <PropertyTypeSelect {...form.getInputProps('propertyType')} />
          <BedroomsSelect {...form.getInputProps('bedRooms')} />
          <ActionIcon size='input-md' style={{ flex: '0' }}>
            <SearchIcon />
          </ActionIcon>
        </Group>
      </form>
    </Box>
  );
}
