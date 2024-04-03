import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextLogoComponent } from 'src/app/shared/ui/text-logo/text-logo.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TextLogoComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {}
