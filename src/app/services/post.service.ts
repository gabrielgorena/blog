import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Blog} from "../interfaces/blog.interface";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly baseUrl = 'https://mudxobrmkwqmfckugxou.supabase.co/rest/v1'
  private readonly supabaseApiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11ZHhvYnJta3dxbWZja3VneG91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzNzkwNTcsImV4cCI6MjA1Mzk1NTA1N30.-YZdSQwccsrSkhfkUn68yaurbmwpzQve0VD0WyvitX4'

  private readonly httpClient = inject(HttpClient)

  load() {
    const headers = new HttpHeaders({
      'apikey': this.supabaseApiKey,
      'Authorization': `Bearer ${this.supabaseApiKey}`,
    });

    return this.httpClient.get<Blog[]>(`${this.baseUrl}/blogs?select=*`, {headers});

  }
}
