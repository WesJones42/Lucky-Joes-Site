import { Routes } from '@angular/router';
import { Home } from './home';
import { Calenders } from './calenders';
import { MenuComponent } from './pages/menu/menu';
import { DrinksComponent } from './pages/drinks/drinks';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'calenders', component: Calenders },
  { path: 'menu', component: MenuComponent },
  { path: 'drinks', component: DrinksComponent },

];
