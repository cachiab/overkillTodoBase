import {Todo} from '../models/todo';
import {createReducer, on} from '@ngrx/store';
import {loadTodosSuccess, toggleBoxTodosSuccess} from './actions';

export const featureKey = 'todosStore';

export const featuredCheckBoxKey = 'checkBox';

export interface State {
  todos: ReadonlyArray<Todo>;
}


export const initialState: State = {
  todos: [],
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

    on(toggleBoxTodosSuccess,
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
    )
);

