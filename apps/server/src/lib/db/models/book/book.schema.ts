import { pgTable, integer, text } from 'drizzle-orm/pg-core';
export const book = pgTable('books', {
  id: integer(),
  title: text(),
});
