import { Component } from '@angular/core';
import { SignUpFormComponent } from './sign-up-form.component';
import { AuthenticateService } from '../../services/cognito.service';
import { SignUpData } from '../../models/sign-up-data.model';

@Component({
  standalone: true,
  imports: [SignUpFormComponent],
  templateUrl: './sign-up.container.html',
  styleUrl: './sign-up.container.css',
})
export class SignUpContainerComponent {
  constructor(private authService: AuthenticateService) {}

  onSignUp(signUpData: SignUpData) {
    this.authService.signUp(signUpData);
  }
}
