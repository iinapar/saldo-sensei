import { Component } from '@angular/core';
import { SignInFormComponent } from './sign-in-form.component';
import { AuthenticateService } from '../../services/cognito.service';

@Component({
  standalone: true,
  imports: [SignInFormComponent],
  templateUrl: './sign-in.container.html',
  styleUrl: './sign-in.container.css',
})
export class SignInContainerComponent {
  constructor(private authService: AuthenticateService) {}

  onLogin(loginForm: any) {
    this.authService.login(loginForm.email, loginForm.password);
  }
}
