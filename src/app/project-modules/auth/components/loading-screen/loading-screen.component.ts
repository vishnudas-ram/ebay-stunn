import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GeneralService } from 'src/app/services/general.service';
import { ProfileService } from 'src/app/services/profile.service';


@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss']
})
export class LoadingScreenComponent implements OnInit {
    isAuthSuccessful : boolean;
    token : any;
  constructor(
     public route: ActivatedRoute,
     private profile: ProfileService,
     private toastr: ToastrService,
     private general: GeneralService,
    ) {
   this.route.queryParams.subscribe((query)=>{
    this.isAuthSuccessful = query['isAuthSuccessful'];
    this.token = query['token'];
    console.log('query',query);
    
    if (this.isAuthSuccessful && this.token) {
      this.handleLogin()
    }
    else {
      console.log('login failed');
      this.toastr.error('Login failed')    
    }
   })
  }

  ngOnInit(): void {
  }
  handleLogin(){
    this.general.setToken = this.token;
    this.profile.getProfileData('redirect');
  }
}
