import { Component } from '@angular/core';
import { SignUpFormComponent } from './sign-up-form.component';

@Component({
  standalone: true,
  imports: [SignUpFormComponent],
  templateUrl: './sign-up.container.html',
  styleUrl: './sign-up.container.css',
})
export class SignUpContainerComponent {}
