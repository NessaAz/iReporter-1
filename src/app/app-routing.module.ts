import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminSignupComponent } from './components/admin-signup/admin-signup.component';
import { PostsComponent } from './components/posts/posts.component';
import { InterventionsComponent } from './components/interventions/interventions.component';
import { ProfilesComponent } from "./components/profiles/profiles.component";
import { LandingComponent } from './components/landing/landing.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent },
  {path: 'adminsignup', component: AdminSignupComponent },
  {path: 'redflags', component: PostsComponent },
  {path: 'interventions', component: InterventionsComponent },
  {path: 'clients', component: ProfilesComponent },
  {path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
