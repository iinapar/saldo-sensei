import { Component } from '@angular/core';
import { SignInFormComponent } from './sign-in-form.component';
import { AuthenticateService } from '../../services/cognito.service';
import { SignInData } from '../../models/sign-in-data.model';

@Component({
  standalone: true,
  imports: [SignInFormComponent],
  templateUrl: './sign-in.container.html',
  styleUrl: './sign-in.container.css',
})
export class SignInContainerComponent {
  constructor(private authService: AuthenticateService) {}

  onSignIn(signInData: SignInData) {
    this.authService.signIn(signInData.email, signInData.password);
  }
}
