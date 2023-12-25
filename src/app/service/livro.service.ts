import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, map } from 'rxjs';
import { Item, LivroResultado } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  private readonly API = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {}

  buscar(value: string): Observable<LivroResultado> {
    const params = new HttpParams().append('q', value);
    return this.http.get<LivroResultado>(this.API, { params });
  }
}
