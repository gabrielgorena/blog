import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/blog-list/blog-list.component').then(m => m.BlogListComponent)
  }
];
