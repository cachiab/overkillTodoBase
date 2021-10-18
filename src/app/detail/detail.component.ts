import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo';
import { Store } from '@ngrx/store';
import { getOneSelector } from '../store/selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  todo$?: Observable<Todo>;
  constructor(private store: Store) { 
  }

  ngOnInit(): void {
    this.todo$ = this.store.select(getOneSelector);
  }

}

