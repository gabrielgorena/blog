import {Component, effect, input, output} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Blog } from '../../interfaces/blog.interface';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-blog-form',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    CommonModule],
  templateUrl: './blog-form.component.html',
})
export class BlogFormComponent {

  public blog = input<Blog | null>();

  save = output<Blog>();
  cancel = output<void>();

  public blogForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    image: new FormControl(''),
  })

  constructor() {
    effect(() => {
      const currentBlog = this.blog();
      if (currentBlog) {
        this.blogForm.patchValue({
          title: currentBlog.title,
          content: currentBlog.content,
          image: currentBlog.image_url,
        });
      } else {
        this.blogForm.reset({
          title: '',
          content: '',
          image: '',
        });
      }
    });
  }

  onSubmit() {
    if (this.blogForm.valid) {
      const formValue = this.blogForm.value;
      const currentBlog = this.blog();
      const newBlog: Blog = {
        id: currentBlog?.id,
        title: formValue.title || '',
        content: formValue.content || '',
        image_url: formValue.image || '',
        is_published: true,
      };
      this.save.emit(newBlog);
      this.blogForm.reset();
      this.blogForm.patchValue({
        title: '',
        content: '',
        image: ''
      })
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
