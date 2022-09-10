import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { ApiConstant } from '../../../shared/api.constants';
@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss'],
})
export class FaqsComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject<void>();
  faqList: any[] = [
    {
      question: 'what is the return policy?',
      answer:
        'You can return a product for upto 30 days from the date you purchased it.',
    },
    {
      question: 'what are the shipping options?',
      answer: 'You will get the product within 5 working days.',
    },
    {
      question:
        'what is the international duties,taxes etc that i have to pay?',
      answer: 'No such duties that you want to pay.',
    },
    {
      question: 'when will I receive my order?',
      answer: 'You will get the product within 5 working days.',
    },
    {
      question: 'what do I do if I never received my order?',
      answer: 'You can contact us through our contact number.',
    },
    {
      question: 'what do I do when I  received a defective order?',
      answer: 'You can exchange the order.',
    },
    {
      question: 'How do I make changes to an order I have already placed?',
      answer: 'You can change it whenever you want.',
    },
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // this.getFaq()
  }
  getFaq() {
    this.apiService
      .ExecuteGet(this.apiService.baseUrl + ApiConstant.getFaq)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (response: any) => {
          console.log('FAQ list response', response);
          this.faqList = response;
        },
        (error: any) => {
          console.log('FAQ list error', error);
        }
      );
  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
