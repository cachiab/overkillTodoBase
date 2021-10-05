import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Todo} from '../models/todo';
import {Store} from '@ngrx/store';
import {loadTodos, getOneAction, toggleBoxTodosAction, storeOneAction} from '../store/actions';
import { selectTodos } from '../store/selectors';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';



/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos$: Observable<ReadonlyArray<Todo>>;
  todoTitleToAddCtrl$: FormControl;
  todoDescToAddCtrl$: FormControl;
  newTitleForm: FormGroup;
  isTitleEmpty: boolean = false;
  matcher: MyErrorStateMatcher;
  

  constructor(fb: FormBuilder, private store: Store) {
    this.todoTitleToAddCtrl$ = fb.control('', Validators.required);
    this.todoDescToAddCtrl$ = fb.control('',null);
    this.todos$ = this.store.select(selectTodos);
    this.newTitleForm = fb.group({
      newTitle: this.todoTitleToAddCtrl$,
      newDescription: this.todoDescToAddCtrl$
    });

    this.matcher = new MyErrorStateMatcher();
  }

  ngOnInit(): void {
     this.store.dispatch(loadTodos());
  }

  toggleBox(id: number, todo: Todo): void{
    console.log("toggleBox()")
    this.store.dispatch(toggleBoxTodosAction({id,todo}));
  }
  
  getOneTodoForDetails(todo: Todo): void {
    console.log('mon todo :', todo);
    this.store.dispatch(getOneAction({todo}));
  }
  onSubmit(): void{
     this.addOneTodo(this.todoTitleToAddCtrl$.value, this.todoDescToAddCtrl$.value);
  }
  async addOneTodo(newTitle: string, newDescription: string){
    console.log('add a new todo: ' + newTitle);
    this.store.dispatch(storeOneAction({todoTitle: newTitle, todoDesc: newDescription}));
  }
}
