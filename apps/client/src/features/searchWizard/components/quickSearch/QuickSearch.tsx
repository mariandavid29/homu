import { ActionIcon, Box, Group } from '@mantine/core';
import { OctagonX, Search as SearchIcon } from 'lucide-react';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useNavigate } from '@tanstack/react-router';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { notifications } from '@mantine/notifications';
import { ListingTypeSelect } from '../listingTypeSelect/ListingTypeSelect';
import { BedroomsSelect } from '../bedroomsSelect/BedroomsSelect';
import { PropertyTypeSelect } from '../propertyTypeSelect/PropertyTypeSelect';
import { LocationSelect } from '../locationSelect/LocationSelect';
import { quickSearchSchema } from '../../helpers';
import styles from './QuickSearch.module.css';
import { geocodePlaceId } from '@/client/features/listings/helpers';

export function QuickSearch() {
  const navigate = useNavigate();
  const geocodingLib = useMapsLibrary('geocoding');
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

  const onSubmit = async (values: typeof form.values) => {
    try {
      if (!geocodingLib) {
        throw new Error('Missing geocoding deps');
      }

      const coords = await geocodePlaceId({
        placeId: values.location,
        geocodingLib,
      });

      void navigate({
        to: '/listings',
        search: {
          listingType: values.listingType,
          location: {
            latitude: coords.latitude,
            longitude: coords.longitude,
          },
          propertyType: values.propertyType,
          bedRooms: values.bedRooms,
        },
      });
    } catch (error) {
      console.error('Geocoding failed:', error);
      notifications.show({
        title: 'Quick search has failed',
        message: 'Please try again later',
        position: 'top-center',
        color: 'red',
        icon: <OctagonX />,
      });
    }
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
