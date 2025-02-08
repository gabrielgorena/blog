import {Component, inject, signal} from '@angular/core';
import {Card} from "primeng/card";
import {Button} from "primeng/button";
import {Blog} from "../../interfaces/blog.interface";
import {PostService} from "../../services/post.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-blog-detail',
  imports: [
    Card,
    Button
  ],
  templateUrl: './blog-detail.component.html',
})
export class BlogDetailComponent {
  blog = signal<Blog | null>(null);

  private postService = inject(PostService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadBlog(id);
      }
    });
  }

  private loadBlog(id: string | number) {
    this.postService.get(id).subscribe(
      blog => this.blog.set(blog[0]),
    );
  }

  goBack() {
    this.router.navigate(['/blogs']);
  }
}
