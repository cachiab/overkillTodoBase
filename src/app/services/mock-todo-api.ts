import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Todo} from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class MockTodoApi implements InMemoryDbService {

  createDb(): {} {
    const todos: Todo[] = [
      { creationDate: 0, id: 0, title: 'todo in memory 1', description: 'todo description 1', isClosed: false },
      { creationDate: 1, id: 1, title: 'todo in memory 2', description: 'todo description 2', isClosed: false },
      { creationDate: 2, id: 2, title: 'todo in memory 3', description: 'todo description 3', isClosed: true },
      { creationDate: 3, id: 3, title: 'todo in memory 4', description: '', isClosed: false },
    ];
    return { todos };
  }

}
