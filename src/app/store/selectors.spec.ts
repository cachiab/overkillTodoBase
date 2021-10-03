import {State} from './reducer';
import {selectTodos, toggleTodo} from './selectors';

describe('Selectors', () => {
  const initialState: State = {
   todos: [
     {id: 1, title: 'todo1Title', isClosed: true},
     {id: 2, title: 'todo2Title', isClosed: false},
   ]
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
