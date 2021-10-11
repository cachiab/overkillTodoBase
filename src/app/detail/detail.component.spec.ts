import { ComponentFixture, TestBed } from '@angular/core/testing';
import {  MockStore, provideMockStore } from '@ngrx/store/testing';
import { DetailComponent } from './detail.component';
import { State } from '../store/reducer';
import { By } from '@angular/platform-browser';
import { Todo } from '../models/todo';
import { MatToolbarModule } from '@angular/material/toolbar';
import { getOneSelector } from '../store/selectors';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let store: MockStore<State>;
  const todoEx: Todo = { id:2, title: 'todo 2', description:'desc2', isClosed: true, creationDate: 1000 };
  let mockTodosSelector;
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DetailComponent,
      ],
      imports: [MatToolbarModule],
      providers: [provideMockStore({
        selectors: [{selector: getOneSelector, value: todoEx}]
      })],
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;

    mockTodosSelector = store.overrideSelector(getOneSelector,
      todoEx,
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a todo with onInit()', async () => {
    const spy = spyOn(component,'ngOnInit').and.callThrough();
    expect(component.todo$).toBeNull;
    component.ngOnInit();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(component.todo$).toEqual((component.todo$), {todoEx});

  });

  it('should display the page title', () => {
    expect(fixture.debugElement.query(By.css('h1')).nativeElement.innerText).toEqual('Detail of the todo');
  });

  it('should display a todo id text', () => {
    expect(fixture.debugElement.query(By.css('li')).nativeElement.innerText).toEqual("todo's id: 2");
  });

  it('should display a todo title text', () => {
    expect(fixture.debugElement.query(By.css('li:nth-of-type(2)')).nativeElement.innerText).toEqual("todo's title: todo 2");
  });

  it('should display a todo description text', () => {
    expect(fixture.debugElement.query(By.css('li:nth-of-type(3)')).nativeElement.innerText).toEqual("todo's description: desc2");
  });
});
