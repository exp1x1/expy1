import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupService } from './data-access/signup.service';
import { AuthService } from 'src/app/shared/data-access/auth.service';
import { Router } from '@angular/router';
import { SignupFormComponent } from './ui/signup-form.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  providers: [SignupService],
  imports: [CommonModule, SignupFormComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  public signUpService = inject(SignupService);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    effect(() => {
      if (this.authService.user()) {
        this.router.navigate(['dashboard']);
      }
    });
  }
}
