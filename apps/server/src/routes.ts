import { auth } from './lib/auth/handler';
import { AppFactory } from '@/server/shared/factory';
import { booksApp } from '@/server/api/books/books.app';
import { authorsApp } from '@/server/api/authors/authors.app';

const routesApp = AppFactory.createApp()
  .route('/books', booksApp)
  .route('/authors', authorsApp);

routesApp.on(['GET', 'POST'], '/auth/*', (c) => auth(c.env).handler(c.req.raw));

export { routesApp };
export type AppInterfaces = typeof routesApp;
