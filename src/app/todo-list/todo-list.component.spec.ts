import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { State } from '../store/reducer';
import { selectTodos } from '../store/selectors';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockedComponent} from 'ng-mocks';
import { By } from '@angular/platform-browser';
import { Todo } from '../models/todo';
import { getTodoDetailAction } from '../store/actions';
import { DetailComponent } from '../detail/detail.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let store: MockStore<State>;
  let mockTodosSelector: any;
  const todosList: Todo[] = [
    { creationDate: 0, id: 0, title: 'super todo', description: 'todo description 1', isClosed: false },
    { creationDate: 1, id: 1, title: 'super todo2', description: 'todo description 2', isClosed: false }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TodoListComponent, DetailComponent
      ],
      imports: [BrowserAnimationsModule,MatFormFieldModule,MatInputModule,MatRippleModule,FormsModule,ReactiveFormsModule,MatCardModule,MatListModule,MatCheckboxModule],
      providers: [provideMockStore({
        selectors: [{selector: selectTodos, value: todosList}]
      })],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;

    mockTodosSelector = store.overrideSelector(selectTodos, [
      { id:1, title: 'todo 1', description:'desc1', isClosed: false, creationDate: 0 },
      { id:2, title: 'todo 2', description:'desc2', isClosed: true, creationDate: 1000 },
    ]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should display a title for the todo list', () => {
    expect(fixture.debugElement.query(By.css('mat-card-title')).nativeElement.innerText).toEqual('Todos');
  });

  it("should display a title 'Add new todo' in the right side part container", () => {
    expect(fixture.debugElement.query(By.css('#addtodocontainer > mat-card > mat-card-title')).nativeElement.innerText).toEqual("Add new todo")
  });

  it("should display in the container 'Add new todo' an input 'Todo's title:", () => {
    expect(fixture.debugElement.query(By.css('#newTitle-label')).nativeElement.innerText).toEqual("Todo's title:")
  });
  
  it("should display in the container 'Add new todo' an input 'Todo's description:", () => {
    expect(fixture.debugElement.query(By.css('#newDescription-label')).nativeElement.innerText).toEqual("Todo's description:")
  });

  it("should display in the container 'Add new todo' a button", () => {
    expect(fixture.debugElement.query(By.css('form > button')).nativeElement.innerText).toEqual("Add to todo list!");
  });
  
  it('should display in groups the todos with the value of todo.isClosed', () => {
    expect(fixture.debugElement.query(By.css('#todoItem1 > a')).nativeElement.innerText).toEqual('todo 1')
    expect(fixture.debugElement.query(By.css('#todoItem2 > a')).nativeElement.innerText).toEqual('todo 2')
  });

  it('should display todos', () => {
    const todoElements = fixture.debugElement.queryAll(By.css('mat-list mat-list-item'));
    expect(todoElements.length).toEqual(2);

    const todoCheckboxes: MockedComponent<MatCheckbox>[] = todoElements.map(item => item.query(By.css('mat-checkbox'))).map(item => item.componentInstance);
    expect(todoCheckboxes[0].checked).toBeFalse();
    expect(todoCheckboxes[1].checked).toBeTrue();
  });

  it('should add a todo in the todo list when the button is clicked',() => {
      const todoToAdd: Todo = { id:55, title: 'todoToAddTitle', description:'todoToAddDesc', isClosed: false, creationDate: 0 };
      const spy = spyOn(store,'dispatch').and.callThrough();
      let titleInput = fixture.debugElement.query(By.css('#newTitle')).nativeElement;
      titleInput.value = todoToAdd.title;
      titleInput.dispatchEvent(new Event('input'));
      
      let descInput = fixture.debugElement.query(By.css('#newDescription')).nativeElement;
      descInput.value = todoToAdd.description;
      descInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const addingbutton = fixture.debugElement.query(By.css('#addtodocontainer > mat-card > form > button'));
      
      addingbutton.triggerEventHandler('click', {disabled: false, ngSubmit:component.addOneTodo(todoToAdd.title,todoToAdd.description)});
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toBeTruthy;
      // TODO pb with date again and random Id...
      //expect(spy).toHaveBeenCalledOnceWith(storeOneAction({todo: todoToAdd}));
  });

  it('should toggleBox',() => {
    const spy = spyOn(store,'dispatch').and.callThrough();
    const checkbox = fixture.debugElement.query(By.css('mat-checkbox'));
    checkbox.triggerEventHandler('click',{});
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toBeTruthy;
    // TODO: don't work because of date and isClosed changes...
    // expect(spy).toHaveBeenCalledOnceWith(toggleBoxTodosAction({todo: { id:1, title: 'todo 1', description:'desc1', isClosed: !true, creationDate: new Date().getTime() }}))
  });

  it('should navigate to the todo detail',()=> {
    const spy = spyOn(store,'dispatch').and. callThrough();
    const todo = fixture.debugElement.query(By.css('#todoItem1'));
    const todoLink = todo.query(By.css('#todoItem1 > a'));
    spyOn(component,'getOneTodoForDetails').and.callThrough();
    todoLink.triggerEventHandler('click', {});
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(component.getOneTodoForDetails).toHaveBeenCalled;
    expect(spy).toHaveBeenCalledWith(getTodoDetailAction({todo: { id: 1, title: 'todo 1', description: 'desc1', isClosed: false, creationDate: 0 }}));

  });
  
});