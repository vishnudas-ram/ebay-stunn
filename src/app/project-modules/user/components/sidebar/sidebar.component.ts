import { Component, HostListener, Input, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() isSidebarOpened: boolean;
  scrWidth: number;
  hidden:boolean=false
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.scrWidth = window.innerWidth;
    console.log(this.scrWidth);
    if (this.scrWidth < 1120)
    this.hidden = true;
    else
    this.hidden = false;
  }
  constructor( public general : GeneralService) { }

  ngOnInit(): void {
    if (window.innerWidth < 1120)
    this.hidden = true;
    else
    this.hidden = false;
  }

}
