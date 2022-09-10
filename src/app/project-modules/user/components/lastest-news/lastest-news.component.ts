import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiConstant } from '../../../shared/api.constants';
import { ApiService } from '../../../../services/api.service';
import {  Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-lastest-news',
  templateUrl: './lastest-news.component.html',
  styleUrls: ['./lastest-news.component.scss']
})
export class LastestNewsComponent implements OnInit,OnDestroy {
  private unsubscribe = new Subject<void>();
  date=new Date()
   dd = String(this.date.getDate());
   mm = String(this.date.getMonth() + 1);
   yyyy = this.date.getFullYear();
   page:number=1;
  latestNews = [
    {
      image: '/assets/images/latestNews.png',
      date:  this.yyyy + '/' + this.mm + '/' + this.dd,
      description: 'Description about the latest news added my the admin from admin panels. Dummy text dummy text dummy text dummy text dumm dummy text dummy text dummy text dummy text dummy text dummy text dummy text Description about the latest news added my the admin from admin panels. Dummy text dummy text dummy text dummy text',
    },
    {
      image: '/assets/images/latestNews.png',
      date:  this.yyyy + '/' + this.mm + '/' + this.dd,
      description: 'Description about the latest news added my the admin from admin panels. Dummy text dummy text dummy text dummy text dumm dummy text dummy text dummy text dummy text dummy text dummy text dummy text Description about the latest news added my the admin from admin panels. Dummy text dummy text dummy text dummy text ',
    },
    {
      image: '/assets/images/latestNews.png',
      date:  this.yyyy + '/' + this.mm + '/' + this.dd,
      description: 'Description about the latest news added my the admin from admin panels. Dummy text dummy text dummy text dummy text dumm dummy text dummy text dummy text dummy text dummy text dummy text dummy text Description about the latest news added my the admin from admin panels. Dummy text dummy text dummy text dummy text',
    },
    {
      image: '/assets/images/latestNews.png',
      date:  this.yyyy + '/' + this.mm + '/' + this.dd,
      description: 'Description about the latest news added my the admin from admin panels. Dummy text dummy text dummy text dummy text dumm dummy text dummy text dummy text dummy text dummy text dummy text dummy text Description about the latest news added my the admin from admin panels. Dummy text dummy text dummy text dummy text ',
    },
    {
      image: '/assets/images/latestNews.png',
      date:  this.yyyy + '/' + this.mm + '/' + this.dd,
      description: 'Description about the latest news added my the admin from admin panels. Dummy text dummy text dummy text dummy text dumm dummy text dummy text dummy text dummy text dummy text dummy text dummy text Description about the latest news added my the admin from admin panels. Dummy text dummy text dummy text dummy text ',
    },
    {
      image: '/assets/images/latestNews.png',
      date:  this.yyyy + '/' + this.mm + '/' + this.dd,
      description: '6 Description about the latest news added my the admin from admin panels. Dummy text dummy text dummy text dummy text dumm dummy text dummy text dummy text dummy text dummy text dummy text dummy text Description about the latest news added my the admin from admin panels. Dummy text dummy text dummy text dummy text',
    },
     {
      image: '/assets/images/latestNews.png',
      date:  this.yyyy + '/' + this.mm + '/' + this.dd,
      description: '7 Description about the latest news added my the admin from admin panels. Dummy text dummy text dummy text dummy text dumm dummy text dummy text dummy text dummy text dummy text dummy text dummy text Description about the latest news added my the admin from admin panels. Dummy text dummy text dummy text dummy text ',
    },
    {
      image: '/assets/images/latestNews.png',
      date:  this.yyyy + '/' + this.mm + '/' + this.dd,
      description: '8 Description about the latest news added my the admin from admin panels. Dummy text dummy text dummy text dummy text dumm dummy text dummy text dummy text dummy text dummy text dummy text dummy text Description about the latest news added my the admin from admin panels. Dummy text dummy text dummy text dummy text ',
    },
    {
      image: '/assets/images/latestNews.png',
      date:  this.yyyy + '/' + this.mm + '/' + this.dd,
      description: '9 Description about the latest news added my the admin from admin panels. Dummy text dummy text dummy text dummy text dumm dummy text dummy text dummy text dummy text dummy text dummy text dummy text Description about the latest news added my the admin from admin panels. Dummy text dummy text dummy text dummy text',
    },
  ];
  totalPages:number=17;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  //  this.getLatestNews()
  }

  getLatestNews(){
    this.apiService
    .ExecuteGet(this.apiService.baseUrl + ApiConstant.latestNews)
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(
      (response: any) => {
        console.log('latest news response', response);
        this.latestNews = response;

      },
      (error: any) => {
        console.log('latest news error', error);

      }
    );
  }
  pagination(page:number){
    this.page=page
  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
