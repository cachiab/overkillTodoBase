import {createFeatureSelector, createSelector} from '@ngrx/store';
import { Todo } from '../models/todo';
import {featuredCheckBoxKey, featureKey, State, todosReducer} from './reducer';

export const getState = createFeatureSelector<State>(featureKey);
export const getCheckBoxState = createFeatureSelector<State>(featuredCheckBoxKey);
export const selectTodos = createSelector(
  getState,
  (state: State) => {
    const resultTrue = state.todos.filter((todo: Todo) => todo.isClosed === false)
    const resultFalse = state.todos.filter((todo: Todo) => todo.isClosed === true);
    return resultTrue.concat(resultFalse)
  });

export const toggleTodo = createSelector(
  getState,
  (state: State) => state.todos,
)
