import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup , FormBuilder ,Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiConstant } from 'src/app/project-modules/shared/api.constants';
import { IproductDetail } from 'src/app/project-modules/shared/general-interface';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-edit-single-product',
  templateUrl: './edit-single-product.component.html',
  styleUrls: ['./edit-single-product.component.scss']
})
export class EditSingleProductComponent implements OnInit,OnDestroy {
  private unsubscribe = new Subject<void>();
  formGroup : FormGroup ;
  list : any[]=[
    { image : '/assets/images/pokemon-4.png'},
    { image : '/assets/images/pokemon-2.png'},
    { image : '/assets/images/pokemon-3.png'},
    { image : '/assets/images/pokemon-1.png'},
    { image : '/assets/images/edit-product-1.png'},
  ]
  product:IproductDetail;
  scrapping_id:string;
  constructor(
    private dialogRef : MatDialogRef<EditSingleProductComponent> ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder : FormBuilder,
    public toastr: ToastrService,
    private apiService: ApiService,
    ) {
      this.formGroup = this.formBuilder.group({
        product_name:[null,Validators.required],
        category:[null,Validators.required],
        price:[null,Validators.required],
        brand:[null],
        condition:[null,Validators.required],
        description:[null],
      })
      if(this.data && this.data?.product && this.data?.scrapeID){
        this.scrapping_id = this.data?.scrapeID;
        this.product = this.data?.product;
        this.setProductForm(this.data?.product)
      }
    }
  file: any
  damage_images: any[] = [];
  damage_description: string;
  attachment: any

  ngOnInit(): void {
  }

  setProductForm(data:IproductDetail){
    this.formGroup.patchValue({
      product_name:data?.product_name,
      category:data?.category,
      price:data?.price,
      brand:data?.brand,
      condition:data?.condition,
      description:data?.description,
    })
  }
  editProduct(data:any){
    console.log('data before edit product',data);
    this.apiService
    .ExecutePatch(this.apiService.baseUrl + ApiConstant.scrapedProductList.replace('{{scrapeID}}',this.scrapping_id),data,this.product?.id)
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(
      (response: any) => {
        console.log('data after edit product',response);
        this.toastr.success('Product edited successfully')
        this.dialogRef.close({status:'success'});
      },
      (error: any) => {
        this.toastr.error('something went wrong')
        console.log('edit product error',error)
        this.closeDialog()
      }
    );
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  remove (i){
   this.list.splice(i,1)
  }

  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

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
    setTimeout(() => {
      // if (index === this.files.length) {
      //   return;
      // } else {
        const progressInterval = setInterval(() => {
          if (this.file.progress === 100) {
            clearInterval(progressInterval);
            let $this = this;
            console.log(this.file);
            let file = this.file;
            // if (file.size > 1000000) {
            //   this.toastr.error('Choose file less than 1MB');
            //   return;
            // }
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {

              $this.attachment={ url: reader.result }
              console.log($this.attachment);

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
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
   this.file=null
    for (const item of files) {
      item.progress = 0;
      this.file=item;
    }
    this.uploadFilesSimulator();
  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}


