import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/todo';

export const loadTodos = createAction('[Todos] Load todos');

export const loadTodosSuccess = createAction(
  '[Todos] Load todos success',
  props<{ todos: Todo[] }>()
);

export const loadTodosFailed = createAction('[Todos] Load todos failed');

//export const toggleBoxTodos = createAction('[Todos] Toggle box', props<{ isClosed: boolean}>());

//export const toggleBoxTodosSuccess = createAction('[Todos] Toggle box success', props<{  isClosed: boolean}>());

export const toggleBoxTodos = createAction('[CheckBox] Toggle box', props<{ id: number, todo: Todo}>());

export const toggleBoxTodosSuccess = createAction('[CheckBox] Toggle box success', props<{id: number, todo: Todo}>());

export const toggleBoxTodosFailed = createAction('[CheckBox] Toggle box failed');

export const sortTodos = createAction('[SortTodos] Sort the list of todos');

export const sortTodosSuccess = createAction('[SortTodos] Sort the list of todos is in success', props<{ todos: Todo[] }>());

export const sortTodosFailed = createAction('[SortTodos] Sort the list of todos failed');
