import { createSelectSchema } from 'drizzle-zod';
import { book } from './book.schema';

export const bookSelectSchema = createSelectSchema(book);
