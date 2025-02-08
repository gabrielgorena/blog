import { Routes } from '@angular/router';
import {BlogDetailComponent} from "./components/blog-detail/blog-detail.component";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/blog-list/blog-list.component').then(m => m.BlogListComponent)
  },
  {
    path: 'blogs/:id',
    component: BlogDetailComponent
  }
];
