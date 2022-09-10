import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { AccessCodeComponent } from './components/access-code/access-code.component' ;
import { CompleteProfileComponent } from './components/complete-profile/complete-profile.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component'
import { AuthguardGuard } from '../shared/guard/authguard.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [

      {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
      },

      {
        path: 'login',
        component: LoginComponent
      },

      {
        path: 'complete-profile',
        component: CompleteProfileComponent,
        canActivate : [AuthguardGuard],
      },

      {
        path: 'access-code',
        component: AccessCodeComponent,
        canActivate : [AuthguardGuard],
      },
      {
        path: 'subscription',
        component:SubscriptionComponent,
        canActivate : [AuthguardGuard],
      },
      {
        path: 'loading-screen',
        component:LoadingScreenComponent,
        canActivate : [AuthguardGuard],
      }
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
