import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Home } from './home';
import { MenuComponent } from './pages/menu/menu';
import { DrinksComponent } from './pages/drinks/drinks';
import { CalendarComponent } from './pages/calendar/calendar';
import { MerchComponent } from './pages/merch/merch';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'calendar', component: CalendarComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'drinks', component: DrinksComponent },
  { path: 'merch', component: MerchComponent},
  // { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
