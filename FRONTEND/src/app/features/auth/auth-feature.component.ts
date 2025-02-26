import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './auth-feature.component.html',
  styleUrl: './auth-feature.component.css',
})
export class AuthFeatureComponent {}
