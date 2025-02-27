import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Blog} from "../interfaces/blog.interface";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly baseUrl = 'https://mudxobrmkwqmfckugxou.supabase.co/rest/v1'
  private readonly supabaseApiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11ZHhvYnJta3dxbWZja3VneG91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzNzkwNTcsImV4cCI6MjA1Mzk1NTA1N30.-YZdSQwccsrSkhfkUn68yaurbmwpzQve0VD0WyvitX4'

  private readonly httpClient = inject(HttpClient)

  list() {
    const headers = new HttpHeaders({
      'apikey': this.supabaseApiKey,
      'Authorization': `Bearer ${this.supabaseApiKey}`,
    });

    return this.httpClient.get<Blog[]>(`${this.baseUrl}/blogs?select=*`, { headers }).pipe(
      retry(2),
      catchError((error) => {
        console.error('Error al obtener la lista de blogs:', error);
        return throwError(() => new Error('No se pudo cargar la lista de blogs. Inténtalo de nuevo más tarde.'));
      })
    );
  }

  get(id: string | number): Observable<Blog[]> {
    const headers = new HttpHeaders({
      'apikey': this.supabaseApiKey,
      'Authorization': `Bearer ${this.supabaseApiKey}`,
    })

    return this.httpClient.get<Blog[]>(`${this.baseUrl}/blogs?id=eq.${id}&select=*`, { headers }).pipe(
      retry(2),
      catchError((error) => {
        console.error('Error al obtener el blog:', error);
        return throwError(() => new Error('No se pudo cargar el blog. Inténtalo de nuevo más tarde.'));
      })
    );
  }

  create(blog: Blog) {
    const headers = new HttpHeaders({
      'apikey': this.supabaseApiKey,
      'Authorization': `Bearer ${this.supabaseApiKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    });
    return this.httpClient.post(`${this.baseUrl}/blogs`, blog, { headers }).pipe(
      retry(2),
      catchError((error) => {
        console.error('Error al crear el blog:', error);
        return throwError(() => new Error('No se pudo crear el blog. Inténtalo de nuevo más tarde.'));
      })
    );
  }

  update(blog: Blog) {
    const headers = new HttpHeaders({
      'apikey': this.supabaseApiKey,
      'Authorization': `Bearer ${this.supabaseApiKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    });

    const url = `${this.baseUrl}/blogs?id=eq.${blog.id}`;

    return this.httpClient.patch(url, blog, { headers }).pipe(
      retry(2),
      catchError((error) => {
        console.error('Error al actualizar el blog:', error);
        return throwError(() => new Error('No se pudo actualizar el blog. Inténtalo de nuevo más tarde.'));
      })
    );
  }

  delete(blog: Blog) {
    const headers = new HttpHeaders({
      'apikey': this.supabaseApiKey,
      'Authorization': `Bearer ${this.supabaseApiKey}`
    });

    const url = `${this.baseUrl}/blogs?id=eq.${blog.id}`;

    return this.httpClient.delete(url, { headers }).pipe(
      retry(2),
      catchError((error) => {
        console.error('Error al eliminar el blog:', error);
        return throwError(() => new Error('No se pudo eliminar el blog. Inténtalo de nuevo más tarde.'));
      })
    );
  }
}
