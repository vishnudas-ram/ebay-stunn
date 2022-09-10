import { Component, OnDestroy, OnInit } from '@angular/core';
import { GeneralService } from '../../../../services/general.service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../../services/api.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ApiConstant } from '../../../shared/api.constants';
import { IfleaMarket, Iproduct,productScrapeStatus} from 'src/app/project-modules/shared/general-interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-scraping-screen',
  templateUrl: './scraping-screen.component.html',
  styleUrls: ['./scraping-screen.component.scss'],
})
export class ScrapingScreenComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject<void>();
  formGroup: FormGroup;
  status: string = 'initial';
  FleaMarketLIst: IfleaMarket[] = [];
  selectedMarket: IfleaMarket;
  selectedproducts: Iproduct[] = [];
  repeatCall: any;
  listProduct: Iproduct[] = [];
  searchURl:string;
  //   {
  //     image: '/assets/images/product-1.png',
  //     name: 'Stuffed Toy',
  //     price: '530',
  //     id: 1,
  //   },
  //   {
  //     image: '/assets/images/product-2.png',
  //     name: 'フシギソウぬいぐるみ',
  //     price: '1200',
  //     id: 2,
  //   },
  //   {
  //     image: '/assets/images/product-3.png',
  //     name: 'ツタージャ ポケモン',
  //     price: '999',
  //     id: 3,
  //   },
  //   {
  //     image: '/assets/images/product-4.png',
  //     name: 'ポケモン ぬいぐるみ パチ...',
  //     price: '530',
  //     id: 4,
  //   },
  //   {
  //     image: '/assets/images/product-5.png',
  //     name: 'フシギソウぬいぐるみ',
  //     price: '1444',
  //     id: 5,
  //   },
  //   {
  //     image: '/assets/images/product-5.png',
  //     name: 'フシギソウぬいぐるみ',
  //     price: '1444',
  //     id: 6,
  //   },
  // ];

  contentIcon = [
    {
      image: '/assets/icons/t-shirt.png',
      name: 'T-shirt',
      amount: '¥ 1,100',
    },
    {
      image: '/assets/icons/bag.png',
      name: 'Bags',
      amount: '¥ 4,300',
    },
    {
      image: '/assets/icons/shoes.png',
      name: 'Shoes',
      amount: '¥ 11,000',
    },
  ];
  constructor(
    private general: GeneralService,
    private toastr: ToastrService,
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      platform: [null, Validators.required],
      url: [null, Validators.required],
      product_count: [null, Validators.required],
      type: ['search'],
      matching: [false],
      countValidate:[false]
    });

    this.general.changeSidebarStatus('close');
    this.getFleaMarketlist();
    this.formGroup.get('url').valueChanges.subscribe((value) => {
      if (value && this.selectedMarket) {
        let linkvalidation=this.selectedMarket?.link.split('.')
        if (value.includes(linkvalidation[1])) {
          this.formGroup.patchValue({
            matching: true,
          });
        } else {
          this.formGroup.patchValue({
            matching: false,
          });
        }
      } else {
        this.formGroup.patchValue({
          matching: false,
        });
      }
    });

    this.formGroup.get('product_count').valueChanges.subscribe((value) => {
      if (!value || value < 0) {
        this.formGroup.patchValue({
          product_count: ' ',
          countValidate:false
        });
      } else if (value > 500) {
        this.formGroup.patchValue({
          product_count: 500,
          countValidate:true
        });
      }
      else{
        this.formGroup.patchValue({
          countValidate:true
        });
      }
    });
  }

  ngOnInit(): void {}

  getFleaMarketlist() {
    this.apiService
      .ExecuteGet(this.apiService.baseUrl + ApiConstant.fleaMarket)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (response: any) => {
          this.FleaMarketLIst = response;
          console.log('flea market list', response);
        },
        (error: any) => {
          console.log('flea market list error', error);
        }
      );
  }

  openFleaMarket(market: IfleaMarket) {
    this.selectedMarket = market;
    clearInterval(this.repeatCall);
    this.selectedproducts=[];
    this.status = 'initial';
    this.formGroup.patchValue({
      platform: market?.name,
      url: null,
      product_count: null,
      matching: false,
      countValidate:false
    });
    window.open(market.link);
  }

  scrapeProduct(data) {
    this.selectedproducts=[];
    this.listProduct=[];
    this.status = 'loading';
    console.log('data before scrape', data);
    this.apiService
      .ExecutePost(this.apiService.baseUrl + ApiConstant.searchProduct, [data])
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (response: any) => {
          console.log('response after scrape', response);
          this.searchURl=data?.url;
          if (response?.message == 'success' && response?.api_request_id) {
            this.repeatCall = setInterval(() => {
              this.getProductList(response?.api_request_id,response?.task_id);
            }, 1000);
          }
        },
        (error: any) => {
          clearInterval(this.repeatCall);
          this.status = 'initial';
          this.toastr.warning('Scraping coundnot not be completed');
          console.log('scrape error', error);
        }
      );
  }

  getProductList(api_request_id: string,task_id:string) {
    // "7e155a44-eb45-4b0a-8f32-51c777bd182c"
    let queryParams = new HttpParams();
    queryParams = queryParams.set('api_request_id', api_request_id);
    queryParams = queryParams.set('task_id', task_id);
    this.apiService
      .ExecuteGet(
        this.apiService.baseUrl + ApiConstant.searchProduct,
        null,
        queryParams
      )
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (response: any) => {
          console.log('response product list', response);
          if (response.message==productScrapeStatus.SUCCESS) {
            clearInterval(this.repeatCall);
            this.listProduct = response?.products;
            this.selectedproducts = response?.products.slice(0);
            this.status = 'product';
          } else if (response.message==productScrapeStatus.PENDING){
            console.log('waiting for product', this.status);
          }
          else{
            clearInterval(this.repeatCall);
            this.status = 'initial';
            this.toastr.warning('Scraping failed please try again later');
          }
        },
        (error: any) => {
          clearInterval(this.repeatCall);
          this.status = 'initial';
          this.toastr.warning('Scraping failed please try again later');
          console.log('getting product error', error);
        }
      );
  }
  selectProduct(product:Iproduct) {
    if (!this.selectedproducts.includes(product)) {
      this.selectedproducts.push(product);
    } else {
      let index = this.selectedproducts.indexOf(product);
      this.selectedproducts.splice(index, 1);
    }
    console.log(this.selectedproducts);

  }

  extractProduct() {
    let scrapping_url_list=[]
    for(const data of this.selectedproducts){
      let item ={
        platform:data?.platform,
        url:data?.url,
        type:'scrapping',
        product_count:1
      }
      scrapping_url_list.push(item)
    }
    let products ={
      platform:this.selectedMarket?.id,
      count:scrapping_url_list.length,
      url:this.searchURl,
      scrapping_url_list:scrapping_url_list
    }
    console.log('extract product before',products);

    this.apiService
      .ExecutePost(
        this.apiService.baseUrl + ApiConstant.extractProduct,
        products
      )
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (response: any) => {
          console.log('response extract product', response);
          this.toastr.success('Product extraction started')
          window.history.back();
        },
        (error: any) => {
          this.toastr.error('Product extraction failed')
          console.log('extract product error', error);
        }
      );
  }

  ngOnDestroy() {
    this.general.changeSidebarStatus('open');
    clearInterval(this.repeatCall);
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
