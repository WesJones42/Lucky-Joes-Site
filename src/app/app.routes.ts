import { Routes } from '@angular/router';
import { Home } from './home';
import { Calenders } from './calenders';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'calenders', component: Calenders }
];
