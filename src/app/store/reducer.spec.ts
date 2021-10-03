import * as fromReducer from './reducer';
import { State } from './reducer';
import { loadTodosSuccess, toggleBoxTodosSuccess } from './actions';
import { Todo } from '../models/todo';

describe('Reducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('loadTodosSuccess action', () => {
    it('should retrieve all todos and update the state', () => {
      const { initialState } = fromReducer;
      const newState: State = { todos: [{ id: 1, title: 'aTitle', isClosed: false }] };
      const action = loadTodosSuccess({
        todos: [...newState.todos],
      });

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('toggleBoxTodosSuccess action', () => {
    it('should toggle checkbox of one todo and update the state', () => {
      const initialState: State = { todos: [{id: 1, title: 'aTitle', isClosed: false}] };
      let todo: Todo = {id: 1, title: 'aTitle', isClosed: true};
      const newState: State = { todos: [{ id: 1, title: 'aTitle', isClosed: true }] };
      let id: number = 1;
      //const newState: State = { todos: { title: 'aTitle', isClosed: false } };
      const action = toggleBoxTodosSuccess({id,todo});

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });
});
