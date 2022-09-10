import { Injectable } from '@angular/core';
import { Router} from '@angular/router'
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  sidebarStatus = new BehaviorSubject (null)

  constructor(
    private router : Router ) { }
  changeSidebarStatus (value : any)
  {
    this.sidebarStatus.next(value)
  }
  set setToken(token: any){

    localStorage.setItem('ebayToken',token)
  }

  get getToken(){
    if(localStorage.getItem('ebayToken'))
    {
       return localStorage.getItem('ebayToken')
    }
    else
    {
      return null
    }
  }

  logOut()
  {
    localStorage.clear()
    console.log('logout');

    this.router.navigate(['/'])
  }





}
