import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const AUTH_ROUTES: Route[] = [
  {
    path: 'login',
    loadComponent: () => LoginComponent,
  },
  {
    path: 'signup',
    loadComponent: () => SignupComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
