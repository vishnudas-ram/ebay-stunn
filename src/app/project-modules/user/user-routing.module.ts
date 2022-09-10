import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditProductsComponent } from './components/edit-products/edit-products.component';
import { SeminarComponent } from './components/seminar/seminar.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ScrapingScreenComponent } from './components/scraping-screen/scraping-screen.component';
import { EditSingleProductComponent } from './components/edit-single-product/edit-single-product.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {FaqsComponent} from './components/faqs/faqs.component';
import {LastestNewsComponent} from './components/lastest-news/lastest-news.component';
import { ScrapingScreen1Component } from './components/scraping-screen1/scraping-screen1.component';
import { SubSeminarComponent } from './components/seminar/components/sub-seminar/sub-seminar.component';
import { MainSettingsComponent } from './components/main-settings/main-settings.component';
import { CustomSettingsComponent } from './components/main-settings/components/custom-settings/custom-settings.component';
import { SubscriptionPlanComponent } from './components/main-settings/components/subscription-plan/subscription-plan.component';
import { MyTemplateComponent } from './components/main-settings/components/my-template/my-template.component';
import {AuthguardGuard} from '../shared/guard/authguard.guard';
import { MessageComponent } from './components/message/message.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    canActivate : [AuthguardGuard],
    children:[

      {
        path : '',
        redirectTo : 'dashboard',
        pathMatch : 'full'
      },

      {
        path : 'dashboard',
        component : DashboardComponent,
        canActivate : [AuthguardGuard]
      },

      {
        path : 'seminar',
        component : SeminarComponent,
        canActivate : [AuthguardGuard],
        children : [
          {
            path : '',
            redirectTo : 'sub-seminar',
            pathMatch : 'full'
          },
          {
            path : 'sub-seminar',
            component : SubSeminarComponent,
            canActivate : [AuthguardGuard]
          }
        ]
      },

      {
        path : 'profile-settings',
        component : SettingsComponent,
        canActivate : [AuthguardGuard],
        children : [
          {
            path : '',
            redirectTo : 'update-profile',
            pathMatch : 'full'
          },
          {
            path : 'latest-news',
            component : LastestNewsComponent,
            canActivate : [AuthguardGuard]
          },
          {
            path : 'update-profile',
            component : UserProfileComponent,
            canActivate : [AuthguardGuard]
          },
          {
            path : 'faqs',
            component : FaqsComponent,
            canActivate : [AuthguardGuard]
          }
        ]
      },

      {
        path : 'settings',
        component : MainSettingsComponent,
        canActivate : [AuthguardGuard],
        children : [
          {
            path : '',
            redirectTo : 'CustomSettings',
            pathMatch : 'full'
          },
          {
            path : 'CustomSettings',
            component : CustomSettingsComponent,
            canActivate : [AuthguardGuard]
          },
          {
            path : 'SubscriptionPlan',
            component : SubscriptionPlanComponent,
            canActivate : [AuthguardGuard]
          },
          {
            path : 'MyTemplate',
            component : MyTemplateComponent,
            canActivate : [AuthguardGuard]
          }
        ]
      },


      {
        path : 'edit-product/:id',
        component : EditProductsComponent,
        canActivate : [AuthguardGuard]
      },

      {
        path : 'scraping-screen',
        component : ScrapingScreenComponent,
        canActivate : [AuthguardGuard]
      },

      {
        path:'edit-single-product',
        component:EditSingleProductComponent,
        canActivate : [AuthguardGuard]
      },
      {
        path:'messages',
        component:MessageComponent,
        canActivate : [AuthguardGuard]
      },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
