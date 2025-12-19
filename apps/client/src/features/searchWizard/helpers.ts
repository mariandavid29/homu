import * as z from 'zod';

export const quickSearchSchema = z.object({
  listingType: z.string().min(1, { error: 'Please select a listing type' }),
  location: z.string().min(1, { error: 'Please select a location' }),
  propertyType: z.string().min(1, { error: 'Please select a property type' }),
  bedRooms: z
    .string()
    .array()
    .min(1, { error: 'Please select at least one option' }),
});
