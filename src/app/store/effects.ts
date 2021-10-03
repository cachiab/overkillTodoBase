import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadTodos, loadTodosFailed, loadTodosSuccess, toggleBoxTodos, toggleBoxTodosFailed, toggleBoxTodosSuccess} from './actions';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { TodoService } from '../services/todo.service';

@Injectable()
export class Effects {
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      mergeMap(() =>
        this.todoService.list().pipe(
          map((todos) => loadTodosSuccess({ todos })),
          catchError(() => [loadTodosFailed()])
        )
      )
    )
  );

  toggleTodos$ = createEffect (() =>
    this.actions$.pipe(
      ofType(toggleBoxTodos),
      mergeMap(action =>
        this.todoService.toggle(action.todo.id, action.todo).pipe(
          map(() => toggleBoxTodosSuccess({id:action.id, todo:action.todo}),
          catchError(() => [toggleBoxTodosFailed()])
          )
        )    
      ) 
    )
  );

  constructor(private actions$: Actions, private todoService: TodoService) {}
}

