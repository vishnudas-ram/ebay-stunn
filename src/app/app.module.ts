import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './project-modules/shared/shared.module';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
import { InterceptInterceptor } from './services/intercept.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ToastrModule.forRoot(),
    HttpClientModule,
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : InterceptInterceptor,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
