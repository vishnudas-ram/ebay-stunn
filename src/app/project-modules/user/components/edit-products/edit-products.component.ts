import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GeneralService } from '../../../../services/general.service';
import { MatDialog } from '@angular/material/dialog';
import { EditSingleProductComponent } from '../../components/edit-single-product/edit-single-product.component'
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ApiConstant } from 'src/app/project-modules/shared/api.constants';
import { takeUntil } from 'rxjs/operators';
import { Subject,BehaviorSubject } from 'rxjs';
import { IproductDetail } from 'src/app/project-modules/shared/general-interface';
import { ConfirmationDialogComponent } from 'src/app/project-modules/shared/components/confirmation-dialog/confirmation-dialog.component';
import { Options,LabelType } from "@angular-slider/ngx-slider";
import { ProductBulkUploadComponent } from '../product-bulk-upload/product-bulk-upload.component';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.scss'],
})
export class EditProductsComponent implements OnInit,OnDestroy {
  private unsubscribe = new Subject<void>();
  productList: IproductDetail[] = [];
  value: number = 0;
  formGroup: FormGroup;
  deliveryDate: string[] = ['Less than 7 days', 'Less than 14 days'];
  selectedType = 'select';
  scrapping_id:string;
  loadIndex = 0;
  isLoaded = new BehaviorSubject(this.loadIndex);
  isLoading: boolean;

  minValue: number = 0;
  maxValue: number = 250;
  options: Options = {
    floor: 0,
    ceil: 250,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "$" + value;
        case LabelType.High:
          return "$" + value;
        default:
          // return "$" + value;
      }
    }
  };

  conditionType="new"
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private general: GeneralService,
    private matdialog : MatDialog,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private changeDetector: ChangeDetectorRef,
    private profile : ProfileService,
  ) {
    this.general.changeSidebarStatus('close');
    this.isLoading = true;
    this.isLoaded.subscribe((value) => {
      if (value >= 1) {
        this.isLoading = false;
        this.changeDetector.detectChanges();
      }
    });
    this.activatedRoute.params.subscribe((params) => {
      if(params.id)
      this.scrapping_id=params.id.toString()
      this.getScrapedProductList(this.scrapping_id)
    });
    this.formGroup = this.formBuilder.group({
      slider: [null, Validators.required],
    });
  }
  ngOnInit(): void {}

  getScrapedProductList(id:string){
    this.apiService
    .ExecuteGet(this.apiService.baseUrl + ApiConstant.scrapedProductList.replace('{{scrapeID}}',id))
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(
      (response: any) => {
        for (const product of response){
          if(product.photos){
              product.photos=product.photos.split("'")[1]
          }
        }
        this.productList=response;
        console.log('scraped product list response', this.productList);
        this.loadIndex++;
        this.isLoaded.next(this.loadIndex);
      },
      (error: any) => {
        console.log('scraped product list error', error);
        this.loadIndex++;
        this.isLoaded.next(this.loadIndex);
      }
    );
  }

  selectType(unit) {
    this.selectedType = unit;
  }

  editProduct(product:IproductDetail) {
    const dialogRef = this.matdialog.open(EditSingleProductComponent, {
      width: '85%',
      disableClose : true,
      data:{product:product,scrapeID:this.scrapping_id}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result && result?.status=='success'){
        this.getScrapedProductList(this.scrapping_id)
      }
    })
  }

openConfirmationDialog(id:any){
  let data= {
    message:
    'You are about to delete this product. Are you sure?',
  };
  const dialogRef = this.matdialog.open(ConfirmationDialogComponent, {
    width: '600px',
    maxWidth: '90%',
    data:data
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result && result?.status=='yes'){
      this.deleteProduct(id)
    }

  })
}

deleteProduct(id:any){
  this.apiService
  .ExecuteDelete(this.apiService.baseUrl + ApiConstant.scrapedProductList.replace('{{scrapeID}}',this.scrapping_id),id)
  .pipe(takeUntil(this.unsubscribe))
  .subscribe(
    (response: any) => {
      this.getScrapedProductList(this.scrapping_id)
      this.toastr.success('Product deleted successfully')
      console.log('Product deleted', response);
    },
    (error: any) => {
      console.log('product delete error', error);
    }
  );
}
changeConditionType(type:string){
this.conditionType=type
}

bulkUpload(){
  const dialogRef = this.matdialog.open(ProductBulkUploadComponent, {
    width: '85%',
    disableClose : true,
    data:{scrapeItem:this.scrapping_id}
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result && result?.status=='success'){
      this.profile.getProfileData()
      window.history.back()
      // this.getScrapedProductList(this.scrapping_id)
    }
  })
}
  ngOnDestroy() {
    this.general.changeSidebarStatus('open');
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.isLoaded.next(0);
    this.isLoaded.complete();
  }
}
