import {Todo} from '../models/todo';
import {createReducer, on} from '@ngrx/store';
import {getOneAction, loadTodosSuccess, toggleBoxTodosAction} from './actions';

export const featureKey = 'todosStore';

export interface State {
  todos: ReadonlyArray<Todo>;
  todo: Todo;
}

export const initialState: State = {
  todos: [],
  todo: {id: -1, title: '', isClosed: false},
};

export const todosReducer = createReducer(
  initialState,
  on(
    loadTodosSuccess,
    (state, { todos }) => ({
      ...state,
      todos
    })
  ),

  on(toggleBoxTodosAction,
    // Ugly code which works without entity...
    (state, {id}) => ({
      ...state, 
      todos: state.todos.map(value => {
      if(value.id === id){
        return {...value,id: id, title: value.title, isClosed: !value.isClosed}
        } else {
          return value;
        }
      })
    })    
  ),
  on(
    getOneAction,
    (state,{ todo }) => ({
      ...state, todo
    })
  )
);

