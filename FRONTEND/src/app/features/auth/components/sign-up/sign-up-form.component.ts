import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  selector: 'sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.css',
})
export class SignUpFormComponent {
  @Output()
  signUp: EventEmitter<any> = new EventEmitter();

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    given_name: new FormControl('', [Validators.required]),
    family_name: new FormControl('', [Validators.required]),
  });

  onSignUp() {
    const { email, password, given_name, family_name } = this.signUpForm.value;
    this.signUp.emit({ email, password, given_name, family_name });
  }
}
