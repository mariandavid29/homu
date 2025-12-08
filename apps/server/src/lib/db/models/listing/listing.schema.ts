import {
  pgTable,
  text,
  integer,
  smallint,
  numeric,
  doublePrecision,
  uuid,
} from 'drizzle-orm/pg-core';
import { user } from '../auth/auth.schema';

export const listing = pgTable('listings', {
  id: uuid().primaryKey().defaultRandom(),
  title: text('title').notNull(),
  propertyTypeId: integer('property_type_id')
    .notNull()
    .references(() => propertyType.id),
  listingTypeId: integer('listing_type_id')
    .notNull()
    .references(() => listingType.id),
  price: numeric('price', { precision: 12, scale: 2 }).notNull(),
  latitude: doublePrecision('latitude').notNull(),
  longitude: doublePrecision('longitude').notNull(),
  description: text('description'),
  floorNumber: smallint('floor_number'),
  numberOfRooms: smallint('number_of_rooms'),
  usableArea: numeric('usable_area'),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
});

export const listingType = pgTable('listing_types', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: text('name').notNull(),
});

export const propertyType = pgTable('property_types', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: text('name').notNull(),
});

export const listingImages = pgTable('listing_images', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  key: text('key').notNull(),
  bucket: text('bucket').notNull(),
  displayOrder: integer('display_order').notNull(),
  listingId: uuid('listing_id')
    .notNull()
    .references(() => listing.id, { onDelete: 'cascade' }),
});

export const userListingFavorites = pgTable('user_listing_favorites', {
  userId: uuid('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  listingId: uuid('listing_id')
    .notNull()
    .references(() => listing.id, { onDelete: 'cascade' }),
});
