import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LogInComponent } from './settings/log-in/log-in.component';
import { SignupComponent } from './settings/signup/signup.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    title: 'Login',
    component: LogInComponent
  },

  {
    path: 'signup',
    title: 'Signup',
    component: SignupComponent
  },

  {
    path: 'navbar',
    title: 'Nav-Bar',
    component: NavbarComponent
  },

  {
    path: 'dashboard',
    title: 'Dashboard',
    component: DashboardComponent
  },

  // KEEPING FEATURE MODULE LAZY LOADING
  {
    path: 'project',
    loadChildren: () =>
      import('./featured/featured.module')
        .then(m => m.FeaturedModule)
  }
];