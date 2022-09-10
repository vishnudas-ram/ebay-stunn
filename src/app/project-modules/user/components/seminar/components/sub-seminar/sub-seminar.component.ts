import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiConstant } from 'src/app/project-modules/shared/api.constants';
import { ApiService } from '../../../../../../services/api.service'

@Component({
  selector: 'app-sub-seminar',
  templateUrl: './sub-seminar.component.html',
  styleUrls: ['./sub-seminar.component.scss']
})
export class SubSeminarComponent implements OnInit,OnDestroy {
  private unsubscribe = new Subject<void>();
  buttonValue : any = 'all';
  buttonActive : any = 'active-all';
  List : any[] = [
    {
     video : '/assets/images/demo-video.mp4',
     date : 'May 21, 2021',
     videoName :'Complete Starter Guide',
     videoDescription :'Beginner’s starter guide video'
    },
    {
      video : '/assets/images/demo-video.mp4',
      date : 'May 21, 2021',
      videoName :'Complete Starter Guide',
      videoDescription :'Beginner’s starter guide video'
     },
     {
      video : '/assets/images/demo-video.mp4',
      date : 'May 21, 2021',
      videoName :'Complete Starter Guide',
      videoDescription :'Beginner’s starter guide video'
     },
     {
      video : '/assets/images/demo-video.mp4',
      date : 'May 21, 2021',
      videoName :'Complete Starter Guide',
      videoDescription :'Beginner’s starter guide video'
     },
  ];

  dashBoard : any[]=[
    {
      video : '/assets/images/demo-video.mp4',
      date : 'May 17, 2021',
      videoName :'Dashboard Settings Guide',
      videoDescription :'Dashboard setup guide video'
  }
]

  constructor( private apiService : ApiService ) { }

  ngOnInit(): void {
    this.subSeminar();
  }
 allFunction() {
   this.buttonValue = 'all';
   this.buttonActive = 'active-all';
 }
 dashboardFunction() {
  this.buttonValue = 'dashboard';
  this.buttonActive = 'active-dashboard';

 }
 subSeminar() {
  this.apiService
  .ExecuteGet(this.apiService.baseUrl + ApiConstant.seminarContent)
  .pipe(takeUntil(this.unsubscribe))
  .subscribe(
    (response: any) => {
      console.log('seminar response', response);
      
    },
    (error: any) => {
      console.log('seminar error', error);
    }
  );
 }
 ngOnDestroy() {
  this.unsubscribe.next();
  this.unsubscribe.complete();
}
}
