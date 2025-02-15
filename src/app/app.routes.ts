import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/blog-list/blog-list.component').then
      (m => m.BlogListComponent)
  },
  {
    path: 'blogs/:id',
    loadComponent: () =>
      import('./components/blog-detail/blog-detail.component').then(
        (m) => m.BlogDetailComponent
      ),
  },
  {
    path: 'blogs',
    loadComponent: () =>
      import('./components/blog-list/blog-list.component').then(
        (m) => m.BlogListComponent
      ),
  }
];
