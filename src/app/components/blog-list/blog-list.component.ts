import {Component, inject, signal} from '@angular/core';
import {FormControl, FormsModule, Validators} from "@angular/forms";
import {ReactiveFormsModule} from '@angular/forms';

import {Blog} from "../../interfaces/blog.interface";
import {PostService} from "../../services/post.service";

import {Button} from "primeng/button";
import {Dialog} from "primeng/dialog";
import {InputTextModule} from 'primeng/inputtext';
import {Card} from "primeng/card";
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-blog-list',
  imports: [
    Button,
    Dialog,
    InputTextModule,
    Card,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './blog-list.component.html',
})
export class BlogListComponent {

  public blogs = signal<Blog[]>([]);
  public visible = signal(false);
  public selectedBlog = signal<Blog | null>(null);

  public newTitle = new FormControl('', Validators.required);
  public newContent = new FormControl('', Validators.required);
  public newImages = new FormControl('');

  private readonly blogsService = inject(PostService);

  constructor() {
    this.fetchPosts();
  }

  showDialog() {
    this.visible.set(true);
  }

  closeDialog() {
    this.visible.set(false);
    this.selectedBlog.set(null);
    this.newTitle.setValue('');
    this.newContent.setValue('');
    this.newImages.setValue('');
  }

  fetchPosts() {
    this.blogsService.list().subscribe((data) => {
      console.log(data);
      this.blogs.set(data as Blog[]);
    });
  }

  createPost() {
    const newBlog: Blog = {
      title: this.newTitle.value || '',
      content: this.newContent.value || '',
      image_url: this.newImages.value || '',
      is_published: true,
    };

    this.blogsService.create(newBlog).subscribe((data: any) => {
      console.log(data);
      this.fetchPosts();
      this.closeDialog();
      this.newTitle.setValue('');
      this.newContent.setValue('');
      this.newImages.setValue('');
    });

    console.log(newBlog);
  }

  updatePost(blog: Blog | null) {
    if (blog) {
      const updatedBlog: Blog = {
        ...blog,
        title: this.newTitle.value || '',
        content: this.newContent.value || '',
        image_url: this.newImages.value || '',
      };

      this.blogsService.update(updatedBlog).subscribe(() => {
        console.log('Blog actualizado:', updatedBlog);
        this.fetchPosts();
        this.closeDialog();
      });
    } else {
      this.createPost();
    }
  }

  editPost(blog: Blog) {
    this.selectedBlog.set(blog);
    this.newTitle.setValue(blog.title);
    this.newContent.setValue(blog.content);
    this.newImages.setValue(blog.image_url);
    this.showDialog();
  }


  deletePost(blog: Blog) {
    this.blogsService.delete(blog).subscribe(() => {
      console.log(`Blog eliminado: ${blog.id}`);
      this.fetchPosts();
    });
  }
}
