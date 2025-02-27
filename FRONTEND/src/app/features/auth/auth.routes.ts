import { Routes } from '@angular/router';
import { AuthFeatureComponent } from './auth-feature.component';
import { SignInContainerComponent } from './components/sign-in/sign-in.container';
import { SignUpContainerComponent } from './components/sign-up/sign-up.container';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthFeatureComponent,
    providers: [],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'sign-in',
      },
      {
        path: 'sign-in',
        component: SignInContainerComponent,
        pathMatch: 'full',
      },
      {
        path: 'sign-up',
        component: SignUpContainerComponent,
        pathMatch: 'full',
      },
    ],
  },
];
