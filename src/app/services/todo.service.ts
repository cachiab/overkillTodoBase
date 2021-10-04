import {Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {Todo} from '../models/todo';
import {environment} from '../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
 

  list(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${environment.baseUrl}/api/todos`);
  }
  constructor(private http: HttpClient) { }

  toggle(id: number, todo: Todo): Observable<Todo> {
    console.log("toggle todo:" + todo.id);
    console.log(JSON.stringify(todo));
    const option = {id: id, title: todo.title, isClosed: todo.isClosed};
    return this.http.put<Todo>(`${environment.baseUrl}/api/todos/${id}`, option).pipe(catchError(this.handleError));
  }

  storeOne(todo: Todo): Observable<Todo> {
    console.log("selectOne todo:" + todo.id);
    const option = {id: todo.id, title: todo.title, isClosed: todo.isClosed};
    return this.http.post<Todo>(`${environment.baseUrl}/api/todos/${todo.id}`, option).pipe(catchError(this.handleError));
  }

  private handleError (error: any) {
    console.error(error);
    return throwError(error);
  }
}
