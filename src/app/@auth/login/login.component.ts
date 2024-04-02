import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from './data-access/login.service';
import { AuthService } from 'src/app/shared/data-access/auth.service';
import { Router, RouterModule } from '@angular/router';
import { LoginFormComponent } from './ui/login-form.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [LoginService],
  imports: [
    CommonModule,
    LoginFormComponent,
    MatProgressSpinnerModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public loginService = inject(LoginService);
  public authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    effect(() => {
      if (this.authService.user()) {
        this.router.navigate(['dashboard']);
      }
    });
  }
}
