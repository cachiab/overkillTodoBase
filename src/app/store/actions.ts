import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/todo';

export const loadTodos = createAction('[Todos] Load todos');

export const loadTodosSuccess = createAction(
  '[Todos] Load todos success',
  props<{ todos: Todo[] }>()
);

export const loadTodosFailed = createAction('[Todos] Load todos failed');

// Close the box when action happens...
export const toggleBoxTodosAction = createAction('[CheckBox] Toggle box', props<{ id: number, todo: Todo}>());

// Store the todo to retrieve in detail
export const storeOneAction = createAction('[Detail] Store on todo', props<{ todoTitle: string, todoDesc: string}>());

// Get the todo for details...
export const getOneAction = createAction('[Detail] Get one todo', props<{todo: Todo}>());
