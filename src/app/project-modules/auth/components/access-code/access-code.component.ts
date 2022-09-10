import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GeneralService } from 'src/app/services/general.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-access-code',
  templateUrl: './access-code.component.html',
  styleUrls: ['./access-code.component.scss']
})
export class AccessCodeComponent implements OnInit {
  check:boolean=false
  selectedcard:string
item={active:3,logo:"/assets/images/space-ship.png",price:'22,000',label:25000,label1:4,label2:1000,label3:500}
  constructor(
    private profile: ProfileService,
    private toastr: ToastrService,
    private general: GeneralService
  ) { }

  ngOnInit(): void {
  }
  checkStatus(){
    this.check=!this.check
   }
   accessCode(){
    this.selectedcard='card1'
   }
   checkSubscription(){
    this.selectedcard='card2'
   }
   onSubmit(){
    this.profile.getProfileData('redirect');
   }
}
