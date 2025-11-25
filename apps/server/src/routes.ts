import { AppFactory } from '@/server/shared/factory';
import { booksApp } from '@/server/api/books/books.app';
import { authorsApp } from '@/server/api/authors/authors.app';
import { authApp } from './api/auth/auth.app';

const routesApp = AppFactory.createApp()
  .route('/books', booksApp)
  .route('/authors', authorsApp);

routesApp.route('/auth', authApp);
export { routesApp };
export type AppInterface = typeof routesApp;
