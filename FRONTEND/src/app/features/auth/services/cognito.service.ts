import { Injectable } from '@angular/core';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

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
  signUp(
    email: string,
    password: string,
    given_name: string,
    family_name: string
  ) {
    const attributeList = [
      new CognitoUserAttribute({ Name: 'email', Value: email }),
      new CognitoUserAttribute({ Name: 'given_name', Value: given_name }),
      new CognitoUserAttribute({ Name: 'family_name', Value: family_name }),
    ];

    this.userPool.signUp(
      email,
      password,
      attributeList,
      [],
      (err: any, result: any) => {
        if (err) {
          console.error('Sign Up Error:', err);
        } else {
          console.log('Sign Up Success:', result);
          this.cognitoUser = result?.user || null;
          console.log('User registered:', this.cognitoUser?.getUsername());
        }
      }
    );
  }

  // Confirm user
  confirmSignUp(email: string, code: string) {
    const userData = { Username: email, Pool: this.userPool };
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        console.error('Confirm Error:', err);
      } else {
        console.log('Confirm Success:', result);
        this.router.navigate(['/auth/sign-in']);
      }
    });
  }

  // Login
  login(emailaddress: any, password: any) {
    let authenticationDetails = new AuthenticationDetails({
      Username: emailaddress,
      Password: password,
    });

    let userData = { Username: emailaddress, Pool: this.userPool };
    this.cognitoUser = new CognitoUser(userData);

    this.cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result: any) => {
        this.router.navigate(['/']);
        console.log('Success Results : ', result);
      },
      onFailure: (error: any) => {
        console.log('error', error);
      },
    });
  }

  // Logout
  logOut() {
    this.cognitoUser = this.userPool.getCurrentUser();
    if (this.cognitoUser) {
      this.cognitoUser.signOut();
      this.router.navigate(['auth/sign-in']);
    }
  }
}
