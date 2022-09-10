import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { ApiConstant } from '../project-modules/shared/api.constants';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  profileData = new BehaviorSubject (null)

  constructor(
    private router : Router,
    private apiService : ApiService,
  ) { }

  getProfileData (isRedirect?:string) {
    this.apiService
      .ExecuteGet(this.apiService.baseUrl + ApiConstant.profileData)
      .subscribe(
        (response: any) => {
          this.handleResponse(isRedirect,response)
          console.log('profile response',response);         
        },
        (error: any) => {
         console.log('profile error',error);
        }
      );
    console.log(isRedirect);

  }

  handleResponse(isRedirect:any,response:any) {
    this.profileData.next(response)
    if(isRedirect=='redirect')
      {
        this.redirectTo(response)
      }
    else {
      console.log('updation works');
      
    }
  }
  redirectTo(response:any){
    if (response?.is_profile_completed) {
      this.router.navigate(['user'])
    }
    else {
      this.router.navigate(['auth/complete-profile'])
    }
  }
}
