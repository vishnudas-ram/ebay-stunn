import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scraping-screen1',
  templateUrl: './scraping-screen1.component.html',
  styleUrls: ['./scraping-screen1.component.scss']
})
export class ScrapingScreen1Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  buttonIcon : any[] = [
    {
      Active : 1,
      logo : '/assets/icons/mercari-round-logo.png',
      fullLogo :'/assets/icons/Mercari-logo.png'
    },

    {
      Active : 2,
      logo : '/assets/icons/testing.png',
      fullLogo :'/assets/icons/japanese-logo.png'
    },

    {
      Active : 3,
      logo : '/assets/icons/testing-1.png',
      fullLogo :'/assets/icons/Mercari-logo.png'
    },

    {
      Active : 4,
      logo : '/assets/icons/netmall-round-logo.png',
      fullLogo :'/assets/icons/Mercari-logo.png'
    },

    {
      Active : 5,
      logo : '/assets/icons/rakuten-round-logo.png',
      fullLogo :'/assets/icons/rakuten-logo.png'
    },

    {
      Active : 6,
      logo : '/assets/icons/netmall-round-logo.png',
      fullLogo :'/assets/icons/Mercari-logo.png'
    },

    {
      Active : 7,
      logo : '/assets/icons/netmall-round-logo.png',
      fullLogo :'/assets/icons/Mercari-logo.png'
    },

    {
      Active : 8,
      logo : '/assets/icons/netmall-round-logo.png',
      fullLogo :'/assets/icons/Mercari-logo.png'
    },
];



}
