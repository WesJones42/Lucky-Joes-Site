import { Routes } from '@angular/router';
import { Home } from './home';
import { MenuComponent } from './pages/menu/menu';
import { DrinksComponent } from './pages/drinks/drinks';
import { CalendarComponent } from './pages/calendar/calendar';
import { MerchComponent } from './pages/merch/merch';
import { Merch1Component } from './pages/merch1/merch1';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'calendar', component: CalendarComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'drinks', component: DrinksComponent },
  { path: 'merch', component: MerchComponent },
  { path: 'merch1', component: Merch1Component },
  { path: '**', redirectTo: '' },
];
