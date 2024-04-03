import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextLogoComponent } from 'src/app/shared/ui/text-logo/text-logo.component';
import { SignOutBtnComponent } from 'src/app/shared/ui/signout-btn/logout-btn.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TextLogoComponent, SignOutBtnComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {}
