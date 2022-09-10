import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import {SharedModule} from '../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditProductsComponent } from './components/edit-products/edit-products.component';
import { SeminarComponent } from './components/seminar/seminar.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { ScrapingScreenComponent } from './components/scraping-screen/scraping-screen.component';
import { EditSingleProductComponent } from './components/edit-single-product/edit-single-product.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { LastestNewsComponent } from './components/lastest-news/lastest-news.component';
import { ScrapingScreen1Component } from './components/scraping-screen1/scraping-screen1.component';
import { SubSeminarComponent } from './components/seminar/components/sub-seminar/sub-seminar.component';
import { MainSettingsComponent } from './components/main-settings/main-settings.component';
import { CustomSettingsComponent } from './components/main-settings/components/custom-settings/custom-settings.component';
import { SubscriptionPlanComponent } from './components/main-settings/components/subscription-plan/subscription-plan.component';
import { MyTemplateComponent } from './components/main-settings/components/my-template/my-template.component';
import { ProductBulkUploadComponent } from './components/product-bulk-upload/product-bulk-upload.component';
import { MessageComponent } from './components/message/message.component'

@NgModule({
  declarations: [UserComponent, DashboardComponent, EditProductsComponent, SeminarComponent, SettingsComponent, SidebarComponent, HeaderComponent, ScrapingScreenComponent, EditSingleProductComponent, UserProfileComponent, FaqsComponent, LastestNewsComponent, ScrapingScreen1Component, SubSeminarComponent, MainSettingsComponent, CustomSettingsComponent, SubscriptionPlanComponent, MyTemplateComponent, ProductBulkUploadComponent, MessageComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
