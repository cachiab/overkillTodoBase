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
    console.log("Dans service toggle la box!");
    console.log(JSON.stringify(todo));
    const option = {id: id, title: todo.title, isClosed: todo.isClosed};
    return this.http.put<Todo>(`${environment.baseUrl}/api/todos/${id}`, option).pipe(catchError(this.handleError));
  }

  private handleError (error: any) {
    console.error(error);
    return throwError(error);
  }
}
