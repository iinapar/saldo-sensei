import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  selector: 'confirm-sign-up',
  templateUrl: './confirm-sign-up.component.html',
  styleUrl: './confirm-sign-up.component.css',
})
export class ConfirmSignUpComponent {
  @Input()
  email = '';

  @Output()
  confirmSignUp: EventEmitter<any> = new EventEmitter();

  confirmSignUpForm = new FormGroup({
    code: new FormControl('', [Validators.required]),
  });

  onConfirmSignUp() {
    const { code } = this.confirmSignUpForm.value;
    const email = this.email;
    this.confirmSignUp.emit({ email, code });
  }
}
