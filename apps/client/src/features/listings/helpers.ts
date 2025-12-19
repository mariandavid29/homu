import * as z from 'zod';
import type { Coordinates } from '@/client/shared/types';

export const listingsSearchSchema = z.object({
  listingType: z.string().optional(),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  propertyType: z.string().optional(),
  bedRooms: z.array(z.string()),
});

type GeocodePlaceIdOptions = {
  placeId: string;
  geocodingLib: google.maps.GeocodingLibrary | null;
};

export async function geocodePlaceId({
  placeId,
  geocodingLib,
}: GeocodePlaceIdOptions): Promise<Coordinates> {
  if (!geocodingLib) {
    throw new Error('Geocoding library not loaded');
  }

  const geocoder = new geocodingLib.Geocoder();

  const response = await geocoder.geocode({ placeId });

  if (!response.results[0]) {
    throw new Error('No results found');
  }

  const { lat, lng } = response.results[0].geometry.location;

  return {
    latitude: lat(),
    longitude: lng(),
  };
}
