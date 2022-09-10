import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  List : any[]=[
    {
     name : 'Shane Martine',
     color : '#9CCCE9',
     letter : 'S'
    },
    { 
      name : 'robert',
      color : '#BBEE61',
      letter : 'R'
    },
    {
       name : 'mary',
       color : '#EEB061',
       letter : 'M'
    },
    { 
      name : 'david',
      color : '#A8E5A3 ',
      letter : 'D'
    },
    { 
      name : 'david',
      color : 'green',
      letter : 'D'
    },
    { 
      name : 'david',
      color : 'green',
      letter : 'D'
    },
 
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
