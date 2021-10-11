import * as fromReducer from './reducer';
import { State } from './reducer';
import { getTodoDetailAction, loadTodosSuccess, storeOneAction, toggleBoxTodosAction } from './actions';
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
      const newState: State = { 
        todos: [{ id: -1, title: 'aTitle', description: 'aDesc', isClosed: false, creationDate: new Date().getTime()}],
        todo: {creationDate: -1, id: -1, title: '',description:'', isClosed: false}, 
        title: '',
        creationDate: -1
      };

      const action = loadTodosSuccess({
        todos: [...newState.todos],
      });

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('toggleBoxTodosAction action', () => {
    it('should toggle checkbox of one todo and update the state', () => {
      const todoTest: Todo =  {id: 0, title: 'todoTitle1', description: 'descTodo1', isClosed: true, creationDate: 1000};
      const todosExample: Todo[] = [
        {id: 0, title: 'todoTitle1', description: 'descTodo1', isClosed: true, creationDate: 1000},
        {id: 1, title: 'todoTitle2', description: 'descTodo1', isClosed: false, creationDate: 1000}
      ];

      const initialState: State = {
        todos: todosExample, 
        todo: {creationDate: -1, id: -1, title: '',description:'', isClosed: false}, 
        title: '',
        creationDate: 0
      };
      
      const newState: State = {
         todos: [
          {id: 0, title: 'todoTitle1', description: 'descTodo1', isClosed: false, creationDate: 1000},
          {id: 1, title: 'todoTitle2', description: 'descTodo1', isClosed: false, creationDate: 1000}
        ],
          todo: {creationDate: -1, id: -1, title: '',description:'', isClosed: false}, 
        title: '',
        creationDate: 0 
        };
      let id: number = 1;
      //const newState: State = { todos: { title: 'aTitle', isClosed: false } };
      const action = toggleBoxTodosAction({todo: todoTest});
      const state = fromReducer.todosReducer(initialState, action);

      expect(state.todos).toEqual(newState.todos);
    });
  });

  describe('getOneAction action', () => {
    it('should get one todo from the toto list', () => {
      const todoTest: Todo =  {id: 0, title: 'todoTitle1', description: 'descTodo1', isClosed: true, creationDate: 1000};
      const todosExample: Todo[] = [
        {id: 0, title: 'todoTitle1', description: 'descTodo1', isClosed: true, creationDate: 1000},
        {id: 1, title: 'todoTitle2', description: 'descTodo1', isClosed: false, creationDate: 1000}
      ];

      const initialState: State = {
        todos: todosExample, 
        todo: {creationDate: -1, id: -1, title: '',description:'', isClosed: false}, 
        title: '',
        creationDate: 0
      };

      const newState: State = {
        todos: [{ id: 0, title: 'todoTitle', description: 'descTodo', isClosed: true, creationDate: new Date().getTime()}],
        todo: todoTest, 
        title: '',
        creationDate: 0 
      };

      const action = getTodoDetailAction({todo: todoTest});
      const state = fromReducer.todosReducer(initialState, action);

      expect(state.todo).toEqual(newState.todo);
    });
  });

  describe('storeOneAction action',() => {
    it('should store a new title to add a new todo in the list', () => {
    const newTodo =  {creationDate: -1, id: -1, title: 'newTodoTitle',description: 'newTodoDesc', isClosed: false};
    const { initialState } = fromReducer;

    const newState: State = {
      ...initialState,
      todos: [...initialState.todos, newTodo],
    };

    expect(fromReducer.todosReducer(initialState,storeOneAction({todo: newTodo}))).toEqual(newState);
    });
  })
});
