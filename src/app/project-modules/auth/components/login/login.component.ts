import { Component, HostListener, OnInit } from '@angular/core';
import { ProfileService } from '../../../../services/profile.service';
import { ToastrService } from 'ngx-toastr';
import { GeneralService } from '../../../../services/general.service';
import { ApiService } from '../../../../services/api.service'
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ApiConstant } from '../../../shared/api.constants'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private unsubscribe = new Subject<void>();
  image: string = '/assets/images/login.png';
  scrWidth: any;
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.scrWidth = window.innerWidth;
    if (this.scrWidth <= 600) {
      this.image = '/assets/images/mobile-login.png';
    } else {
      this.image = '/assets/images/login.png';
    }
  }
  constructor(
    private profile: ProfileService,
    private toastr: ToastrService,
    private general: GeneralService,
    private apiService : ApiService
  ) {
    this.general.setToken = '1239a2d133012f1fef7a9284fb2191158c963a66';
  }

  ngOnInit(): void {
    if (window.innerWidth <= 600) {
      this.image = '/assets/images/mobile-login.png';
    } else {
      this.image = '/assets/images/login.png';
    }
  }
  // onSubmit() {
  //   this.general.setToken = '123456';
  //   this.profile.getProfileData('redirect');
  // }
  onLogin(){
    this.apiService
      .ExecuteGet(this.apiService.baseUrl + ApiConstant.logIn,)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (response: any) => {

          this.handleLoginResponse(response);
        },
        (error: any) => {
          this.handleLoginError(error);
        }
      );
  }
  handleLoginResponse(response){
    console.log('Login response',response);
    window.open(response?.authentication_url,'_self');
  }
  handleLoginError(error){
    console.log('Login error',error);
  }
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
