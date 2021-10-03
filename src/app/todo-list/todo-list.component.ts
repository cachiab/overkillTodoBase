import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Todo} from '../models/todo';
import {Store} from '@ngrx/store';
import {selectTodos} from '../store/selectors';
import {loadTodos, toggleBoxTodos, sortTodos} from '../store/actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos$: Observable<ReadonlyArray<Todo>>;

  constructor(private store: Store) {
    this.todos$ = this.store.select(selectTodos);
  }

  ngOnInit(): void {
     this.store.dispatch(loadTodos());
  }

  toggleBox(id: number, todo: Todo): void{
    console.log("toggleBox()")
    this.store.dispatch(toggleBoxTodos({id,todo}));
  }

  ngOnChange(): any {
  }

}
