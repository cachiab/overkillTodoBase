import { Todo } from '../models/todo';
import { toggleBoxTodosAction } from './actions';
import {State} from './reducer';
import {getOneSelector, selectTodos, toggleTodo} from './selectors';

describe('Selectors', () => {
  const initialState: State = {
   todos: [
     { id: 0, title: 'todo1Title', description:"desc1", isClosed: false, creationDate: 0},
     { id: 1, title: 'todo2Title', description:"desc2",  isClosed: true,creationDate: 1000},
     { id: 2, title: 'todo3Title', description:"desc3",  isClosed: false,creationDate: 2000},
     { id: 3, title: 'todo4Title', description:"desc4",  isClosed: true,creationDate: 3000},
   ],
   todo: { id: 1, title: 'todoTitle',description:'desc', isClosed: true, creationDate: -1},
   title: '',
   creationDate: -1
  };

  const newState: State = {
    todos: [
      { id: 0, title: 'todo1Title', description:"desc1", isClosed: false, creationDate: 0},
      { id: 2, title: 'todo3Title', description:"desc3",  isClosed: false,creationDate: 2000},
      { id: 1, title: 'todo2Title', description:"desc2",  isClosed: true,creationDate: 1000},
      { id: 3, title: 'todo4Title', description:"desc4",  isClosed: true,creationDate: 3000}
    ],
    todo: { id: 1, title: 'todo2Title',description:'desc', isClosed: true, creationDate: 1000},
    title: '',
    creationDate: -1
  };

  it('should select todos list', () => {
    const result = selectTodos.projector(initialState);
    const resultTrue = result.filter((todo: Todo) => todo.isClosed === false);
    const resultFalse = result.filter((todo: Todo) => todo.isClosed === true).sort((a,b) => a.creationDate - b.creationDate);
    expect(resultFalse).toEqual([newState.todos[2],newState.todos[3]])
    expect(resultTrue.concat(resultFalse)).toEqual(newState.todos);
  });

  it('toggle should return the list of todos', () => {
    const action = toggleBoxTodosAction({todo: initialState.todos[1]})
    const result = toggleTodo.projector(initialState,action);
    expect(result).toEqual(initialState.todos); 
  });

  it('should select one todo from the todoList', () => {
    const result = getOneSelector.projector(initialState);
    expect(result).toEqual(initialState.todo);
  });
});
