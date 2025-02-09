import { Component, inject, signal } from '@angular/core';
import { Blog } from '../../interfaces/blog.interface';
import { PostService } from '../../services/post.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { BlogFormComponent } from '../blog-form/blog-form.component';
import {Router} from "@angular/router";
import {TruncatePipe} from "./pipe-transform";

@Component({
  selector: 'app-blog-list',
  imports: [
    ButtonModule,
    DialogModule,
    CardModule,
    CommonModule,
    BlogFormComponent,
    TruncatePipe
  ],
  templateUrl: './blog-list.component.html',
})
export class BlogListComponent {
  public blogs = signal<Blog[]>([]);
  public visible = signal(false);
  public selectedBlog = signal<Blog | null>(null);

  private readonly blogsService = inject(PostService);

  private router = inject(Router)

  constructor() {
    this.fetchPosts();
  }

  showDialog() {
    this.visible.set(true);
  }

  fetchPosts() {
    this.blogsService.list().subscribe((data) => {
      this.blogs.set(data as Blog[]);
    });
  }

  createPost(newBlog: Blog) {
    this.blogsService.create(newBlog).subscribe(() => {
      this.fetchPosts();
      this.closeDialog();
    });
  }

  updatePost(updatedBlog: Blog) {
    this.blogsService.update(updatedBlog).subscribe(() => {
      const updatedBlogs = this.blogs().map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
      this.blogs.set(updatedBlogs);
      this.closeDialog();
    });
  }

  deletePost(blog: Blog) {
    this.blogsService.delete(blog).subscribe(() => {
      this.fetchPosts();
    });
  }

  closeDialog() {
    this.visible.set(false);
    this.selectedBlog.set(null);
  }

  onSave(blog: Blog) {
    if (this.selectedBlog()) {
      this.updatePost(blog);
    } else {
      this.createPost(blog);
    }
  }

  viewBlogDetails(blogId: number | string) {
    this.router.navigate(['/blogs', blogId]);
  }
}
