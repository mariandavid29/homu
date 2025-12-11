import { ActionIcon, Box, Group } from '@mantine/core';
import { Search as SearchIcon } from 'lucide-react';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useNavigate } from '@tanstack/react-router';
import { ListingTypeSelect } from '../listingTypeSelect/ListingTypeSelect';
import { BedroomsSelect } from '../bedroomsSelect/BedroomsSelect';
import { PropertyTypeSelect } from '../propertyTypeSelect/PropertyTypeSelect';
import { LocationSelect } from '../locationSelect/LocationSelect';
import { quickSearchSchema } from '../../helpers';
import styles from './QuickSearch.module.css';

export function QuickSearch() {
  const navigate = useNavigate();
  const form = useForm({
    mode: 'controlled',
    initialValues: {
      listingType: '',
      location: '',
      propertyType: '',
      bedRooms: [],
    },
    validate: zod4Resolver(quickSearchSchema),
  });

  const onSubmit = (values: typeof form.values) => {
    void navigate({
      to: '/listings',
      search: {
        listingType: values.listingType,
        location: values.location,
        propertyType: values.propertyType,
        bedRooms: values.bedRooms,
      },
    });
  };

  return (
    <Box className={styles.searchContainer}>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Group align='start'>
          <ListingTypeSelect
            {...form.getInputProps('listingType')}
            style={{ flex: 1 }}
          />
          <LocationSelect
            {...form.getInputProps('location')}
            style={{ flex: 1 }}
          />
          <PropertyTypeSelect
            {...form.getInputProps('propertyType')}
            style={{ flex: 1 }}
          />
          <BedroomsSelect
            {...form.getInputProps('bedRooms')}
            style={{ flexBasis: '400px', flexGrow: 0, flexShrink: 0 }}
          />
          <ActionIcon size='input-md' style={{ flex: '0' }} type='submit'>
            <SearchIcon />
          </ActionIcon>
        </Group>
      </form>
    </Box>
  );
}
