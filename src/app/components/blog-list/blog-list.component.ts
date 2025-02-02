import {Component, inject, signal} from '@angular/core';
import {Blog} from "../../interfaces/blog.interface";
import {PostService} from "../../services/post.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-blog-list',
  imports: [],
  templateUrl: './blog-list.component.html',
})
export class BlogListComponent {

  public blogs = signal<Blog[]>([]);

  private readonly blogsService = inject(PostService);

  constructor() {
    this.fetchBlogs();
  }

  fetchBlogs() {
    this.blogsService.load().subscribe((data) => {
      console.log(data);
      this.blogs.set(data as Blog[]);
    });
  }
}
