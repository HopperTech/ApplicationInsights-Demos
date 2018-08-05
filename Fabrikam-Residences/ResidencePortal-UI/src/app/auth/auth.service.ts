import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

import { environment } from '../../environments/environment';
import { AppInsights } from 'applicationinsights-js';

const api = environment.baseApiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user = new User();
  public hasError = false;
  public errorMessage = '';

  constructor(private http: HttpClient) {}

  private loadUser(authenticateUser: User): User {
    // tslint:disable-next-line
    Object.assign(this.user, authenticateUser);

    if (this.user.isAuthenticated) {
      AppInsights.setAuthenticatedUserContext(this.user.userId, this.user.role);
    } else {
      AppInsights.clearAuthenticatedUserContext();
    }

    return this.user;
  }

  public isAuthenticated(): boolean {
    return this.user != null && this.user.isAuthenticated;
  }

  public getAuthenticatedUser(): User {
    return this.user;
  }

  public login(username: string, password: string) {
    this.hasError = false;
    this.errorMessage = '';
    return this.http.post<any>(`${api}/auth/login`, {
      username: username,
      password: password
    })
    .subscribe(user => {
      const userObj: User = {
        isAuthenticated: true,
        userId: user.userId,
        name: user.name,
        role: user.group
      };
      this.loadUser(userObj);
    }, error => {
      this.errorMessage = 'Invalid Login';
      this.hasError = true;
    });
  }

  public logout() {
    this.loadUser(new User());
  }
}
