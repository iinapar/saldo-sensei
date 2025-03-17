import { Injectable } from '@angular/core';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { SignUpData } from '../models/sign-up-data.model';
import { from, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  userPool: any;
  cognitoUser: any;

  constructor(private router: Router) {
    this.userPool = new CognitoUserPool({
      UserPoolId: environment.cognitoUserPoolId,
      ClientId: environment.cognitoAppClientId,
    });
  }

  // Sign up new user
  signUp(signUpData: SignUpData) {
    const attributeList = [
      new CognitoUserAttribute({ Name: 'email', Value: signUpData.email }),
      new CognitoUserAttribute({
        Name: 'given_name',
        Value: signUpData.given_name,
      }),
      new CognitoUserAttribute({
        Name: 'family_name',
        Value: signUpData.family_name,
      }),
    ];

    this.userPool.signUp(
      signUpData.email,
      signUpData.password,
      attributeList,
      [],
      (err: any, result: any) => {
        if (err) {
          console.error('Sign Up Error:', err);
        } else {
          console.log('Sign Up Success:', result);
          this.cognitoUser = result?.user || null;
          console.log('User registered:', this.cognitoUser.getUsername());
        }
      }
    );
  }

  // Confirm new user
  confirmSignUp(confirmData: any) {
    const userData = { Username: confirmData.email, Pool: this.userPool };
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmRegistration(confirmData.code, true, (err, result) => {
      if (err) {
        console.error('Confirm Error:', err);
      } else {
        console.log('Confirm Success:', result);
        this.router.navigate(['/auth/sign-in']);
      }
    });
  }

  // Resend confirmation code
  resendConfirmationCode(email: string) {
    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.resendConfirmationCode((err, result) => {
        if (err) {
          console.error('Resend Code Error:', err);
          reject(err);
        } else {
          console.log('Resend Code Success:', result);
          resolve(result);
        }
      });
    });
  }

  // Login
  signIn(emailaddress: any, password: any) {
    let authenticationDetails = new AuthenticationDetails({
      Username: emailaddress,
      Password: password,
    });

    let userData = { Username: emailaddress, Pool: this.userPool };
    this.cognitoUser = new CognitoUser(userData);

    this.cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result: any) => {
        this.router.navigate(['/dashboard']);
        console.log('Success Results : ', result);
      },
      onFailure: (error: any) => {
        console.log('error', error);
      },
    });
  }

  // Logout
  signOut() {
    this.cognitoUser = this.userPool.getCurrentUser();
    if (this.cognitoUser) {
      this.cognitoUser.signOut();
      this.router.navigate(['auth/sign-in']);
    }
  }

  // Get the current authenticated user
  getCurrentUser(): Observable<CognitoUser | null> {
    return of(this.userPool.getCurrentUser());
  }

  // Get the current user session
  getCurrentUserSession(): Promise<any> {
    const currentUser = this.userPool.getCurrentUser();

    if (!currentUser) {
      return Promise.resolve(null);
    }

    return new Promise((resolve, reject) => {
      currentUser.getSession((err: any, session: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(session);
        }
      });
    });
  }

  // Check if the user session is valid
  isSessionValid(): Observable<boolean> {
    return from(this.getCurrentUserSession()).pipe(
      map((session) => session !== null && session.isValid())
    );
  }
}
