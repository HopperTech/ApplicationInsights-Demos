import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { User } from './auth/user';
import { AppInsights } from 'applicationinsights-js';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fabrikam Residences';

  get user(): User {
    return this.auth.getAuthenticatedUser();
  }

  constructor(private auth: AuthService) {
    if (!AppInsights.config) {
      AppInsights.downloadAndSetup({
        instrumentationKey: environment.appInsights.instrumentationKey,
        enableCorsCorrelation: true
      });
    }
  }
}
