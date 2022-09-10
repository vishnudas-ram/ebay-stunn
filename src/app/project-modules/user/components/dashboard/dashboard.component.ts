import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as Chart from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiConstant } from 'src/app/project-modules/shared/api.constants';
import { Iscrape,scrapeStatus } from 'src/app/project-modules/shared/general-interface';
import { ApiService } from 'src/app/services/api.service';
import { ProfileService } from 'src/app/services/profile.service';
import { GeneralService } from '../../../../services/general.service';
import { ProductBulkUploadComponent } from '../product-bulk-upload/product-bulk-upload.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit,OnDestroy {
  private unsubscribe = new Subject<void>();
  linechart : Chart;
  loadIndex = 0;
  isLoaded = new BehaviorSubject(this.loadIndex);
  isLoading : boolean;
  scrappedList : Iscrape[] = [];
  paymentPolicyList :any[] = [];
  returnPolicyList : any[] = [];
  shippingPolicyList : any[] = [];
  constructor(
    private generalService: GeneralService,
    private toastr: ToastrService,
    private apiService: ApiService,
    private changeDetector: ChangeDetectorRef,
    private matdialog : MatDialog,
    private profile : ProfileService,
    ) {
      this.isLoading = true;
      this.isLoaded.subscribe((value) => {
        if (value == 4) {
          this.isLoading = false;
          this.changeDetector.detectChanges();
          this.getchartData();
        }
      });
    }

  ngOnInit(): void {
    this.getScrappedList();
    this.getPaymentPolicy();
    this.getShippingPolicy();
    this.getReturnPolicy();
  }

  getScrappedList(){
    this.apiService
    .ExecuteGet(this.apiService.baseUrl + ApiConstant.extractProduct)
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(
      (response: any) => {
        console.log('scraped list response', response);
        this.scrappedList=response;
        this.loadIndex++;
        this.isLoaded.next(this.loadIndex);
      },
      (error: any) => {
        console.log('scraped list error', error);
        this.loadIndex++;
        this.isLoaded.next(this.loadIndex);
      }
    );
  }

  getchartData() {
    // Chart.defaults.global.legend?.labels?.usePointStyle
    this.linechart = new Chart('line-chart', {
      type: 'line',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'],
        datasets: [
          {
            label: 'Product listing number',
            data: [0,2500,3500,2500,4600,3500,7000,8500,9300,11000,10000,13600,14800,11500,15000,16500,17000,16800,19500,18250],
            fill: false,
            radius: function (data) {
              let value = 0;
              if (data?.dataIndex == data?.dataset?.data.length - 1) {
                value = 10;
              }
              return value;
            },
            lineTension: 0,
            borderColor: '#8bc3f2',
            pointBackgroundColor: '#8bc3f2',
            borderWidth: 4,
            pointHoverRadius: 10,
          },
          {
            label: 'Active number',
            data: [0,1000,1500,2000,2500,3000,3500,4000,4500,5000,5500,6000,6500,7000,6500,6000,5800,5500,5000,4800],
            fill: false,
            radius: function (data) {
              let value = 0;
              if (data?.dataIndex == data?.dataset?.data.length - 1) {
                value = 10;
              }
              return value;
            },
            pointBackgroundColor: '#ef847b',
            lineTension: 0.3,
            borderColor: '#ef847b',
            borderWidth: 4,
            pointHoverRadius: 10,
          },
          {
            label: 'Rest inventory check number',
            data: [12000,12000,12000,12000,12000,12000,12000,12000,12000,12000,12000,12000,12000,12000,12000,12000,12000,12000,12000,12000,12000,12000,12000,12000,12000,12000,12000,12000,12000,12000,12000,12000],
            fill: false,
            lineTension: 0,
            radius: 0,
            borderColor: '#96eeb1',
            borderWidth: 4,
            borderDash: [15],
          },
        ],
      },
      options: {
        responsive: false,

        legend: {
          display: false,
        },

        scales: {
          yAxes: [
            {
              gridLines: {
                borderDash: [7],
              },
              ticks: {
                beginAtZero: true,
                fontSize: 16,
                fontFamily: 'NotoSansJP',
                fontColor: '#b7b7b7',
                callback: function (label: number, index, labels) {
                  let number = label.toString();
                  let numberSplit = number.split('');
                  if (numberSplit.length > 3) {
                    numberSplit.splice(numberSplit.length - 3, 0, ',');
                    number = numberSplit.join('');
                  }
                  return number;
                },
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                beginAtZero: true,
                fontSize: 16,
                fontFamily: 'NotoSansJP',
                fontColor: '#b7b7b7',
              },
            },
          ],
        },
      },
    });
  }

  getPaymentPolicy(){
    this.apiService
    .ExecuteGet(this.apiService.baseUrl + ApiConstant.paymentPolicy)
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(
      (response: any) => {
        console.log('payment policy response', response);
        this.paymentPolicyList = response?.paymentPolicies;
        this.loadIndex++;
        this.isLoaded.next(this.loadIndex);
      },
      (error: any) => {
        console.log('payment policy error', error);
        this.loadIndex++;
        this.isLoaded.next(this.loadIndex);
      }
    );
  }

  getShippingPolicy(){
    this.apiService
    .ExecuteGet(this.apiService.baseUrl + ApiConstant.shippingPolicy)
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(
      (response: any) => {
        console.log('shipping policy response', response);
        this.shippingPolicyList = response?.fulfillmentPolicies;
        this.loadIndex++;
        this.isLoaded.next(this.loadIndex);
      },
      (error: any) => {
        console.log('shipping policy error', error);
        this.loadIndex++;
        this.isLoaded.next(this.loadIndex);
      }
    );
  }

  getReturnPolicy(){
    this.apiService
    .ExecuteGet(this.apiService.baseUrl + ApiConstant.returnPolicy)
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(
      (response: any) => {
        console.log('return policy response', response);
        this.returnPolicyList = response?.returnPolicies;
        this.loadIndex++;
        this.isLoaded.next(this.loadIndex);
      },
      (error: any) => {
        console.log('return policy error', error);
        this.loadIndex++;
        this.isLoaded.next(this.loadIndex);
      }
    );
  }
  bulkUpload(scrapeItem:Iscrape){
    const dialogRef = this.matdialog.open(ProductBulkUploadComponent, {
      width: '85%',
      disableClose : true,
      data:{
        scrapeItem:scrapeItem?.id,
        shippingPolicy:this.shippingPolicyList,
        paymentPolicy:this.paymentPolicyList,
        returnPolicy:this.returnPolicyList
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result && result?.status=='success'){
        this.getScrappedList();
        this.profile.getProfileData()
        // this.getScrapedProductList(this.scrapping_id)
      }
    })
  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.isLoaded.next(0);
    this.isLoaded.complete();
  }
}
