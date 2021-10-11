import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Todo} from '../models/todo';
import {Store} from '@ngrx/store';
import {loadTodos, getTodoDetailAction, toggleBoxTodosAction, storeOneAction} from '../store/actions';
import { selectTodos } from '../store/selectors';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos$: Observable<ReadonlyArray<Todo>>;
  todoTitleToAddCtrl$: FormControl;
  todoDescToAddCtrl$: FormControl;
  newTodoForm: FormGroup;
  isdisableCheckBox: boolean =  false;

  constructor(fb: FormBuilder, private store: Store) {
    this.todoTitleToAddCtrl$ = fb.control('', Validators.required);
    this.todoDescToAddCtrl$ = fb.control('',null);
    this.todos$ = this.store.select(selectTodos);
    this.newTodoForm = fb.group({
      newTitle: this.todoTitleToAddCtrl$,
      newDescription: this.todoDescToAddCtrl$
    });
  }

  ngOnInit(): void {
     this.store.dispatch(loadTodos());
  }

  toggleBox(todo: Todo): void{
    this.store.dispatch(toggleBoxTodosAction({todo: {id:todo.id, title: todo.title, description: todo.description, isClosed: todo.isClosed , creationDate: new Date().getTime()}}));
    this.isdisableCheckBox = true
  }
  
  getOneTodoForDetails(todo: Todo): void {
    this.store.dispatch(getTodoDetailAction({todo}));
  }

  addOneTodo(newTitle: string, newDescription: string): void{
    this.store.dispatch(storeOneAction({todo: {id: Math.floor(Math.random()*100), title: newTitle, description: newDescription, isClosed: false, creationDate: new Date().getTime()}}));
  }
}
