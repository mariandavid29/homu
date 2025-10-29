import { AppFactory } from '@/server/shared/factory';

export const authorsApp = AppFactory.createApp()
  .get('/', (c) => c.json('list authors'))
  .post('/', (c) => c.json('create an author', 201))
  .delete('/', (c) => c.json('delete an author', 201));
