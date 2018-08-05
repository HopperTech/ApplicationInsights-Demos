import { NgModule, Injectable } from '@angular/core';
import {
  Routes,
  RouterModule,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ActivitiesComponent } from './activities/activities.component';
import { LoginComponent } from './login/login.component';

import { AuthGuardService } from './auth/app-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'activities', component: ActivitiesComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule {}
