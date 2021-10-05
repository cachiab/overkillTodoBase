import {State} from './reducer';
import {selectTodos, toggleTodo} from './selectors';

describe('Selectors', () => {
  const initialState: State = {
   todos: [
     {creationDate: new Date().getTime(), description:"desc1", id: 1, title: 'todo1Title', isClosed: true},
     {creationDate: new Date().getTime(), description:"desc2", id: 2, title: 'todo2Title', isClosed: false},
   ],
   todo: {creationDate: -1, id: -1, title: '',description:'', isClosed: false},
   title: '',
   creationDate: -1

  };

  it('should select todos list', () => {
    const result = selectTodos.projector(initialState);
    expect(result).toEqual(initialState.todos);
  });

  it('should toggle todo from the list of todos', () => {
    const result = toggleTodo.projector(initialState);
    expect(result).toEqual(initialState.todos);
  });
});
