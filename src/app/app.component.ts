import {Component, inject, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';


import { MenuItem } from 'primeng/api';
import {PostService} from "./services/post.service";
import {Blog} from "./interfaces/blog.interface";


@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'blog';
  items: MenuItem[] | undefined;

  public blogs = signal<Blog[]>([]);
  private readonly blogsService = inject(PostService);

  ngOnInit() {

    this.fetchPosts();

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home'
      },
      {
        label: 'Features',
        icon: 'pi pi-star'
      },
      {
        label: 'Projects',
        icon: 'pi pi-search',
        items: [
          {
            label: 'Components',
            icon: 'pi pi-bolt'
          },
          {
            label: 'Blocks',
            icon: 'pi pi-server'
          },
          {
            label: 'UI Kit',
            icon: 'pi pi-pencil'
          },
          {
            label: 'Templates',
            icon: 'pi pi-palette',
            items: [
              {
                label: 'Apollo',
                icon: 'pi pi-palette'
              },
              {
                label: 'Ultima',
                icon: 'pi pi-palette'
              }
            ]
          }
        ]
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope'
      }
    ]
  }

  fetchPosts() {
    this.blogsService.list().subscribe((data) => {
      console.log(data);
      this.blogs.set(data as Blog[]);
    });
  }
}
