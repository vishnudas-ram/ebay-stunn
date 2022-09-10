import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiConstant } from 'src/app/project-modules/shared/api.constants';
import { Iuser } from 'src/app/project-modules/shared/general-interface';
import { ApiService } from 'src/app/services/api.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-my-template',
  templateUrl: './my-template.component.html',
  styleUrls: ['./my-template.component.scss']
})
export class MyTemplateComponent implements OnInit,OnDestroy {
  private unsubscribe = new Subject<void>();
  formGroup: FormGroup;
  profileData: Iuser;
  constructor(
    private apiService: ApiService,
    public toastr: ToastrService,
    private formBuilder: FormBuilder,
    private profile : ProfileService,
  ) {
    this.formGroup = this.formBuilder.group({
      overseas_buyers_note: [null],
      payment_method: [null],
      shipping_method: [null],
      transaction_matter: [null],
    })
    this.profile.profileData
    .pipe(takeUntil(this.unsubscribe))
    .subscribe((response:any)=>{
    if (response) {
      this.profileData=response;
      this.setProfileForm(this.profileData)
    }
    })
    console.log('profileData',this.profileData);
  }

  ngOnInit(): void {
  }

  setProfileForm(data:Iuser){
    this.formGroup.patchValue({
      overseas_buyers_note: data?.overseas_buyers_note,
      payment_method: data?.payment_method,
      shipping_method: data?.shipping_method,
      transaction_matter: data?.transaction_matter,
    })
  }

  UpdateMyTemplate(data:any){
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
    this.toastr.success('Template updated successfully')
  }
  handleError(error){
    console.log(error);
    this.toastr.error('Failed to update template')
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
