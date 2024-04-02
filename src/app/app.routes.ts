import { Route } from '@angular/router';
import { isAuthenticatedGuard } from './shared/guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./@auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'home',
    loadComponent: () => HomeComponent,
  },
  {
    path: 'dashboard',
    canActivate: [isAuthenticatedGuard()],
    loadComponent: () => DashboardComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
