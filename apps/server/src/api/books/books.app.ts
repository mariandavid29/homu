import { AppFactory } from '@/server/shared/factory';

export const booksApp = AppFactory.createApp()
  .get('/', (c) => c.json('list books'))
  .post('/', (c) => c.json('create a book', 201));
