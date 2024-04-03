import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/shared/data-access/auth.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-signout-btn',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `<button
    mat-raised-button
    color="accent"
    (click)="authService.signOut()"
  >
    Sign Out
  </button>`,
})
export class SignOutBtnComponent {
  public authService = inject(AuthService);
}
