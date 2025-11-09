import { AppFactory } from '@/server/shared/factory';
import { booksApp } from '@/server/api/books/books.app';
import { authorsApp } from '@/server/api/authors/authors.app';

const routesApp = AppFactory.createApp()
  .route('/books', booksApp)
  .route('/authors', authorsApp);

export { routesApp };
export type AppInterface = typeof routesApp;
