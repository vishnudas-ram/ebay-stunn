import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Iuser } from 'src/app/project-modules/shared/general-interface';
import { GeneralService } from 'src/app/services/general.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  sidebatStatus: string;
  scrWidth: any;
  specificTab: boolean;
  @Input() isSidebarOpened: boolean;
  @Output() sideOpenEvent = new EventEmitter<boolean>();
  profileData: Iuser;
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.scrWidth = window.innerWidth;
    console.log(this.scrWidth);
    if (this.scrWidth < 1120) {
      this.specificTab = false;
    } else {
      this.specificTab = true;
    }
  }
  constructor(
    private general: GeneralService,
     private toastr: ToastrService,
     private profile : ProfileService,

     ) {
    this.general.sidebarStatus.subscribe((value: any) => {
      if (value == 'close') {
        this.sidebatStatus = 'close';
      } else {
        this.sidebatStatus = 'open';
      }
    });
    this.profile.profileData
    .subscribe((response:any)=>{
    if (response) {
      if(response?.avatar){
        response.avatar=response.avatar+ "?" + Date.now()
      }
      this.profileData=response
    }
    })
    console.log('profileData',this.profileData);
  }

  ngOnInit(): void {
    if (this.scrWidth < 1120) {
      this.specificTab = false;
    } else {
      this.specificTab = true;
    }
  }

  onToggle() {
    console.log(this.isSidebarOpened);
    if (this.sidebatStatus == 'close' && this.specificTab == true) {
      this.toastr.warning('cannot Toggle sidebar in this page');
    } else {
      this.isSidebarOpened = !this.isSidebarOpened;
      this.sideOpenEvent.emit(this.isSidebarOpened);
    }
  }
  scrapeButtonObjects() {
   console.log('helloi');

  }
}
