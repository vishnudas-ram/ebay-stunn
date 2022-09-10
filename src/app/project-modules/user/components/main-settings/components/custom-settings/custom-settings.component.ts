import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { ApiConstant } from '../../../../../shared/api.constants';
import { ApiService } from '../../../../../../services/api.service';
import {  Subject } from 'rxjs';
@Component({
  selector: 'app-custom-settings',
  templateUrl: './custom-settings.component.html',
  styleUrls: ['./custom-settings.component.scss'],
})
export class CustomSettingsComponent implements OnInit,OnDestroy {
  private unsubscribe = new Subject<void>();
  toggleValue: boolean = false;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  keywordCtrl = new FormControl();
  filteredkeyword: Observable<string[]>;
  keyword: string[] = [];
  mercari: string[] = [];
  rakutenJapan: string[] = [];
  amazonJapan : string[] = [];
  yahooAuction : string[] = [];
  rakuten : string[] = [];
  paypal : string[] = [];
  netmall : string[] = [];
  digimall : string[] = []
  addOnBlur:boolean=true




  KeyWordList: string[] = [
    'keyword1',
    'keyword2',
    'keyword3',
    'keyword4',
    'keyword5',
  ];

  @ViewChild('keywordInput') keywordInput: ElementRef<HTMLInputElement>;

  constructor(
    private apiService: ApiService 
  ) {
    this.filteredkeyword = this.keywordCtrl.valueChanges.pipe(
      startWith(null),
      map((key: string | null) =>
        key ? this._filter(key) : this.KeyWordList.slice()
      )
    );
  }

  ngOnInit(): void {
    this.getCustomSettings()
  }
  add(event: MatChipInputEvent,platform?:string): void {

    if(event.value && event.value.trim()!=''){
      let value= event.value.trim()
      switch (platform) {
        case 'mercari':{
          this.mercari.push(value);
          break;
        }
        case 'rakutenJapan':{
          this.rakutenJapan.push(value);
          break;
        }
        case 'amazonJapan':{
          this.amazonJapan.push(value);
          break;
        }
        case 'yahooAuction':{
          this.yahooAuction.push(value);
          break;
        }
        case 'rakuten':{
          this.rakuten.push(value);
          break;
        }
        case 'paypal':{
          this.paypal.push(value);
          break;
        }
        case 'netmall':{
          this.netmall.push(value);
          break;
        }
        case 'digimall':{
          this.digimall.push(value);
          break;
        }
        case 'exclude':{
          this.keyword.push(value);
          break;
        }

        default:
          {
            break;
          }
      }
    }
    else{
      console.log('no value')
    }
    this.keywordCtrl.setValue(null);
  }

  remove(keys: string,platform? : string): void {

      switch (platform) {
        case 'mercari':{
          let index = this.mercari.indexOf(keys);
          this.mercari.splice(index, 1);
          break;
        }
        case 'rakutenJapan':{
          let index = this.rakutenJapan.indexOf(keys);
          this.rakutenJapan.splice(index, 1);
          break;
        }
        case 'amazonJapan':{
          let index = this.amazonJapan.indexOf(keys);
          this.amazonJapan.splice(index, 1);
          break;
        }
        case 'yahooAuction':{
          let index = this.yahooAuction.indexOf(keys);
          this.yahooAuction.splice(index, 1);
          break;
        }
        case 'rakuten':{
          let index = this.rakuten.indexOf(keys);
          this.rakuten.splice(index, 1);
          break;
        }
        case 'paypal':{
          let index = this.paypal.indexOf(keys);
          this.paypal.splice(index, 1);
          break;
        }
        case 'netmall':{
          let index = this.paypal.indexOf(keys);
          this.netmall.splice(index, 1);
          break;
        }
        case 'digimall':{
          let index = this.paypal.indexOf(keys);
          this.digimall.splice(index, 1);
          break;
        }
        case 'exclude':{
          let index = this.keyword.indexOf(keys);
          this.keyword.splice(index, 1);
          break;
        }
        default:
          {
            break;
          }
      }


  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.keyword.push(event.option.viewValue);
    this.keywordInput.nativeElement.value = '';
    this.keywordCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.KeyWordList.filter((keys) =>
      keys.toLowerCase().includes(filterValue)
    );
  }

  toggleButton() {
    this.toggleValue = !this.toggleValue;
  }

  getCustomSettings(){
    this.apiService
    .ExecuteGet(this.apiService.baseUrl + ApiConstant.customSettings)
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(
      (response: any) => {
        console.log('custom settings response', response);

      },
      (error: any) => {
        console.log('custom settings error', error);

      }
    );
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
