import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralService } from './general.service'
import { tap } from 'rxjs/operators';

@Injectable()
export class InterceptInterceptor implements HttpInterceptor {

  constructor(
    private general : GeneralService,
  ) {}

  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   request = request.clone({
  //     setHeaders: {
  //       Authorization: `Token ${this.general.getToken}`,
  //       'Access-Control-Allow-Origin': '*',
  //       'Access-Control-Allow-Headers': 'origin, content-type, accept',
  //       'Access-Control-Allow-Methods': '*'
  //     }
  //   });
  //   return next.handle(request).pipe(
  //     tap(
  //       (ev: HttpEvent<any>) => {
  //         if (ev instanceof HttpErrorResponse) {
  //           console.log('No authorisarion');
  //         }
  //       }
  //     )
  //   );
  // }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.headers.get('Skip')) {
      const newHeaders = request.headers.delete('Skip')
      const newRequest = request.clone({ headers: newHeaders });
      return next.handle(newRequest);
    }
    else if (this.general.getToken) {
      const modified = request.clone({
        setHeaders: {
          Authorization: `Token ${this.general.getToken}`
        }
      });
      return next.handle(modified);
    } else {
      return next.handle(request);
    }
  }


}
