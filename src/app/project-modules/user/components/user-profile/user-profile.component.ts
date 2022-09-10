import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiConstant } from 'src/app/project-modules/shared/api.constants';
import { Iuser } from 'src/app/project-modules/shared/general-interface';
import { ApiService } from 'src/app/services/api.service';
import { ProfileService } from 'src/app/services/profile.service';
import { GeneralService } from '../../../../services/general.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Console } from 'console';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  private unsubscribe = new Subject<void>();
  file: any;
  damage_images: any[] = [];
  damage_description: string;
  attachment: any;
  uploadSpinner:boolean= false;
  formGroup: FormGroup;
  profileData: Iuser;
  dpchanged:boolean=false;
  progressInterval:any;
  imageChangedEvent: any='';
  croppedImage: any='';

  constructor(
    public general : GeneralService,
    private apiService: ApiService,
    public toastr: ToastrService,
    private formBuilder: FormBuilder,
    private profile : ProfileService,
    private dialogRef : MatDialogRef<UserProfileComponent> ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    this.formGroup = this.formBuilder.group({
      avatar:[null],
      first_name:[null,Validators.required],
      email:[null,Validators.required],
      phone_no:[null,Validators.required],
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
      avatar:data?.avatar,
      first_name:data?.first_name,
      email:data?.email,
      phone_no:data?.phone_no,
    })
  }

  onSubmit(data) {
    console.log('complete profiledata',data);
    let value:Iuser={
      first_name:data?.first_name,
      email:data?.email,
      phone_no:data?.phone_no,
    }
    if(this.dpchanged){
      value.avatar=data?.avatar
    }
    this.apiService
      .ExecutePatch(this.apiService.baseUrl + ApiConstant.profileUpdate,value,this.profileData?.id.toString())
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
  }
  handleError(error){
    console.log(error);

    this.toastr.error('Failed to update profile')
  }


  // fileBrowseHandler(files) {
  //   this.prepareFilesList(files);
  // }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  // deleteFile() {

  //   this.file=null;
  // }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator() {
    // setTimeout(() => {
      // if (index === this.files.length) {
      //   return;
      // } else {
        this.progressInterval= setInterval(() => {
          if (this.file.progress === 100) {
            clearInterval(this.progressInterval);
            let $this = this;
            let file = this.file;
            // if (file.size > 1000000) {
            //   this.toastr.error('Choose file less than 1MB');
            //   return;
            // }
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {

              $this.attachment=reader.result
              $this.formGroup.patchValue({
                avatar:reader.result
              })
              $this.dpchanged=true
              $this.uploadSpinner=false
              console.log('new');

            };
            reader.onerror = function (error) {
              console.log('Error: ', error);
            };
            this.uploadFilesSimulator();
          } else {
            this.file.progress += 5;
          }
        }, 200);
      // }
    // }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
   this.uploadSpinner=true
   this.file=null
    for (const item of files) {
      item.progress = 0;
      this.file=item;
    }
    this.uploadFilesSimulator();
  }

  fileChangeEvent(event: any): void {
   console.log('fileChangeEvent');
   
    this.imageChangedEvent = event;
    
 }
 imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
 }

  ngOnDestroy() {
    clearInterval(this.progressInterval);
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
