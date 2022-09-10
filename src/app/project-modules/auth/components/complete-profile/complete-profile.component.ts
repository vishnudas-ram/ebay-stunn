import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProfileService } from '../../../../services/profile.service';
import { Iuser } from '../../../shared/general-interface';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { ApiConstant } from '../../../shared/api.constants';
import { ApiService } from '../../../../services/api.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss']
})
export class CompleteProfileComponent implements OnInit,OnDestroy {
  private unsubscribe = new Subject<void>();
  profileData : Iuser;
  formGroup : FormGroup ;
  constructor(
     private profile : ProfileService,
     public toastr : ToastrService,
     private formBuilder : FormBuilder,
     private apiService : ApiService,
     private router : Router,
     private activatedRoute : ActivatedRoute
    ) {
    this.profile.profileData
    .pipe(takeUntil(this.unsubscribe))
    .subscribe((response:any)=>{
    if (response) {
      this.profileData=response
    }
    })
    console.log('profileData',this.profileData);
    this.formGroup = this.formBuilder.group({
      first_name:[this.profileData?.first_name,Validators.required],
      email:[this.profileData?.email,Validators.required],
      phone_no:[this.profileData?.phone_no,Validators.required],
      is_profile_completed:[true]
    })

  }
  ngOnInit(): void {
  }
  onSubmit(data) {
    console.log('complete profiledata',data);
    this.apiService
      .ExecutePatch(this.apiService.baseUrl + ApiConstant.profileUpdate,data,this.profileData?.id.toString())
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (response: any) => {
          this.handleResponse(response);
        },
        (error: any) => {
          this.handleError(error);
        }
      );
  }
  handleResponse(response){
    this.profile.getProfileData()
    this.toastr.success('profile updated successfully')
    this.router.navigate(['auth/subscription'])
  }
  handleError(error){
    this.toastr.error(error.error.message)
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
