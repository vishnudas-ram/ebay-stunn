import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import {SharedModule} from '../shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { AccessCodeComponent } from './components/access-code/access-code.component';
import { CompleteProfileComponent } from './components/complete-profile/complete-profile.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component'

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    AccessCodeComponent,
    CompleteProfileComponent,
    SubscriptionComponent,
    LoadingScreenComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
