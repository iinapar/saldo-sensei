import { Component } from '@angular/core';
import { AuthenticateService } from '../auth/services/cognito.service';

@Component({
  standalone: true,
  imports: [],
  templateUrl: './dashboard-feature.component.html',
  styleUrl: './dashboard-feature.component.css',
})
export class DashboardFeatureComponent {
  constructor(private authService: AuthenticateService) {}

  logout() {
    this.authService.signOut();
  }
}
