import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GeneralService } from 'src/app/services/general.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  selctedPlan:number
  count:any[]=[
    {active:1,logo:"/assets/images/baloon.png",price:'5,500',label:1000,label1:2,label2:50,label3:200},
    {active:2,logo:"/assets/images/rocket.png",price:'11,000',label:10000,label1:3,label2:800,label3:500},
    {active:3,logo:"/assets/images/space-ship.png",price:'22,000',label:25000,label1:4,label2:1000,label3:500}
  ]
  check:boolean=false
    constructor(
      private profile: ProfileService,
      private toastr: ToastrService,
      private general: GeneralService
    ) { }

    ngOnInit(): void {
    }
    selectPlan(id){
      this.selctedPlan=id
    }
    checkStatus(){
     this.check=!this.check
    }
    onSubmit(){
      this.profile.getProfileData('redirect');
     }
  }
