import { Component } from '@angular/core';
import { SignInFormComponent } from './sign-in-form.component';

@Component({
  standalone: true,
  imports: [SignInFormComponent],
  templateUrl: './sign-in.container.html',
  styleUrl: './sign-in.container.css',
})
export class SignInContainerComponent {}
