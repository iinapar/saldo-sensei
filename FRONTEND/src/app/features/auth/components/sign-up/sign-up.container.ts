import { Component } from '@angular/core';

import { SignUpFormComponent } from './sign-up-form.component';
import { ConfirmSignUpComponent } from './confirm-sign-up.component';
import { AuthenticateService } from '../../services/cognito.service';
import { SignUpData } from '../../models/sign-up-data.model';

@Component({
  standalone: true,
  imports: [SignUpFormComponent, ConfirmSignUpComponent],
  templateUrl: './sign-up.container.html',
  styleUrl: './sign-up.container.css',
})
export class SignUpContainerComponent {
  signUpView: 'SignUpForm' | 'ConfirmForm' = 'SignUpForm';
  email: string = 'esim@mail.com';

  constructor(private authService: AuthenticateService) {}

  onSignUp(signUpData: SignUpData) {
    this.authService.signUp(signUpData);
    this.email = signUpData.email;
    this.signUpView = 'ConfirmForm';
  }

  onConfirmSignUp(confirmData: any) {
    this.authService.confirmSignUp(confirmData);
  }

  onResendCode() {
    this.authService.resendConfirmationCode(this.email);
  }
}
