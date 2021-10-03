import { Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DetailComponent } from './detail/detail.component';


export const ROUTES: Routes = [
  { path: '', component: AppComponent },
  {
    path: 'detail',
    component: DetailComponent,
  }
];