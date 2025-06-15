import { RenderMode, ServerRoute } from '@angular/ssr';
import { MenuComponent } from './pages/menu/menu';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender
  },

  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];