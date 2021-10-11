import {Todo} from '../models/todo';
import {createReducer, on} from '@ngrx/store';
import {getOneAction, loadTodosSuccess, storeOneAction, toggleBoxTodosAction} from './actions';

export const featureKey = 'todosStore';

export interface State {
  todos: ReadonlyArray<Todo>;
  todo: Todo;
  title: string;
  creationDate: number;
}

export const initialState: State = {
  todos: [],
  todo: {creationDate: -1, id: -1, title: '',description:'', isClosed: false},
  title: '',
  creationDate: -1
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
    (state, {todo}) => ({
      ...state, 
      todos: state.todos.map(value => {
      if(value.id === todo.id){
        return {...value,id: value.id, title: value.title, description: value.description, isClosed: !todo.isClosed, creationDate: todo.creationDate}
        } else {
          return value;
        }
      })
    })   
  ),
  on(
    getOneAction,
    ( state,{ todo }) => ({
      ...state, todo
    })
  ),
  on(
    storeOneAction,
    (state, {todo}) => (
      {
      ...state,
      todos: [todo, ...state.todos]
      }
    )
  )
);

