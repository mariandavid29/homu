import { AppFactory } from '@/server/shared/factory';
import { verifySession } from '@/server/shared/middleware/authenticator';

export const booksApp = AppFactory.createApp()
  .use(verifySession)
  .get('/', (c) => {
    return c.json('list books');
  })
  .post('/', (c) => c.json('create a book', 201));
