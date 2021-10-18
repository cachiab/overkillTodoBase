import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Todo } from '../models/todo';
import { featureKey, State } from './reducer';

export const getState = createFeatureSelector<State>(featureKey);

export const selectTodos = createSelector(
  getState,
  (state: State) => {
    const resultTrue = state.todos.filter((todo: Todo) => todo.isClosed === false);
    const resultFalse = state.todos.filter((todo: Todo) => todo.isClosed === true).sort((a,b) => a.creationDate - b.creationDate);
    return resultTrue.concat(resultFalse)
  });

export const toggleTodo = createSelector(
  getState,
  (state: State) => state.todos,
)

export const getOneSelector = createSelector(
  getState,
  (state: State) => state.todo,
);
