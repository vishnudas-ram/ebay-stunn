import { Component, HostListener, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  isSidebarOpened: any;
  scrWidth: any;
  sidebarStatus: string = 'open';
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.scrWidth = window.innerWidth;
    console.log('ssss',this.scrWidth);
    if (this.scrWidth < 1120) this.isSidebarOpened = false;
    else this.isSidebarOpened = true;
  }

  constructor(private general: GeneralService) {}

  ngOnInit(): void {
    console.log(window.innerWidth);
    if (window.innerWidth < 1120) {
      this.isSidebarOpened = false;
    } else {
      this.isSidebarOpened = true;
    }

    this.general.sidebarStatus.subscribe((value: any) => {
      if (value == 'close') {
        this.isSidebarOpened = false;
        this.sidebarStatus = 'close';
      } else {
        this.sidebarStatus = 'open';
      }
    });
  }
  sidebarEvent(value) {
    console.log('sidebar state=>', value);
    this.isSidebarOpened = value;
  }
}
