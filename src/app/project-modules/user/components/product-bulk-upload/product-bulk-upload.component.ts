import { Component, ElementRef, Inject, OnDestroy, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProfileService } from 'src/app/services/profile.service';
import { Iuser } from 'src/app/project-modules/shared/general-interface';
import { ApiConstant } from 'src/app/project-modules/shared/api.constants';
@Component({
  selector: 'app-product-bulk-upload',
  templateUrl: './product-bulk-upload.component.html',
  styleUrls: ['./product-bulk-upload.component.scss']
})
export class ProductBulkUploadComponent implements OnInit,OnDestroy {
  private unsubscribe = new Subject<void>();
  profileData: Iuser;
  formGroup : FormGroup;
  selectedTemplate:string='default';
  main:any;
  title:any;
  paymentPolicy:string='Payment Policy';
  shippingPolicy:string='Shipping Policy';
  returnPolicy:string='Return Policy';
  selectedDescription:boolean=false;
  paymentPolicyList: any[] = [];
  shippingPolicyList: any[] = [];
  returnPolicyList: any[] = [];
  constructor(
    private dialogRef : MatDialogRef<ProductBulkUploadComponent> ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder : FormBuilder,
    public toastr: ToastrService,
    private apiService: ApiService,
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
    if(this.data){
     this.shippingPolicyList = data?.shippingPolicy;
     this.paymentPolicyList = data?.paymentPolicy;
      this.returnPolicyList = data?.returnPolicy;
    }
    console.log('profileData',this.profileData);
  }

  ngOnInit(): void {
    // console.log('main',document.getElementById('main').offsetHeight,'title',document.getElementById('title').offsetHeight);
    // let content= document.getElementById('content')
    // let main = document.getElementById('main').offsetHeight
    // let title =document.getElementById('title').offsetHeight
    // content.style.height=`${main-title+200}px`
  }

  setProfileForm(data:Iuser){
    this.formGroup.patchValue({
      overseas_buyers_note: data?.overseas_buyers_note,
      payment_method: data?.payment_method,
      shipping_method: data?.shipping_method,
      transaction_matter: data?.transaction_matter,
    })
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  changeTemplate(template:string){
    this.selectedTemplate=template
  }
changeDescription(value:boolean){
  this.selectedDescription=value
}
  UploadProduct(data){
    let template={
      overseas_buyers_note: data?.overseas_buyers_note,
      payment_method: data?.payment_method,
      shipping_method: data?.shipping_method,
      transaction_matter: data?.transaction_matter,
    }
    if(this.selectedTemplate=='myTemplate'){
      this.UpdateMyTemplate(template)
    }
    else{
      this.toastr.success('product uploading')
      this.dialogRef.close({status:'success'});
    }
  }
  UpdateMyTemplate(data:any){
    this.apiService
    .ExecutePatch(this.apiService.baseUrl + ApiConstant.profileUpdate,data,this.profileData?.id.toString())
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(
      (response: any) => {
        this.toastr.success('product uploading')
        this.dialogRef.close({status:'success'});
      },
      (error: any) => {
        console.log('product upload template update error');

      }
    );
  }

  policy(type,status){
    if(status == 'payment'){
       this.paymentPolicy = type
    }
    else if(status == 'shipping'){
        this.shippingPolicy = type
      }
    else{
       this.returnPolicy =type
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
