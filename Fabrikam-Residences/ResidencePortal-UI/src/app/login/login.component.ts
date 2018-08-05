import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  get user(): User { return this.auth.getAuthenticatedUser(); }

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {}

  login() {
    this.auth.login(this.username, this.password);
  }

  logout() {
    this.auth.logout();
  }
}
