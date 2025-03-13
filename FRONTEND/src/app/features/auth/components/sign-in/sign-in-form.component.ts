import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  selector: 'sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.css',
})
export class SignInFormComponent {
  @Output()
  login: EventEmitter<any> = new EventEmitter();

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  onLogin() {
    this.login.emit(this.loginForm.value);
  }
}
