import {Todo} from '../models/todo';
import {createReducer, on} from '@ngrx/store';
import {getOneAction, loadTodosSuccess, storeOneAction, toggleBoxTodosAction} from './actions';
import { TodoListComponent } from '../todo-list/todo-list.component';

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
    (state, {id}) => ({
      ...state, 
      todos: state.todos.map(value => {
      if(value.id === id){
        return {...value,creationDate: new Date().getTime(), id: id, title: value.title, description: value.description, isClosed: !value.isClosed}
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
    (state, {todoTitle,todoDesc}) => (
      {
      ...state,
      todos: [{creationDate: new Date().getTime(), id: Math.floor(Math.random()*100), title: todoTitle, description: todoDesc, isClosed: false},...state.todos
      ]
    }
    )
  )
);

