import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { tap, catchError } from 'rxjs/operators';
// import { GlobalService } from './global.service';
// import { FixedService } from './fixed.service';
// import { TranslateService } from '@ngx-translate/core';
// import { ResponseEnum } from '../enums/response.enum';
// import { AccountService } from 'src/app/account/account.service';
// import { PendingRequest } from '../model/pending-request.model';
import { Observable, Subject } from 'rxjs';
import { AccountService } from '../../account/account.service';
import { PendingRequest } from '../model/pending-request.model';
import { FixedService } from './fixed.service';
import { CookieEnum } from '../enums/cookie.enum';
// import { CookieEnum } from 'src/app/core/enums/cookie.enum';

@Injectable({ providedIn: 'root' })
export class Interceptor implements HttpInterceptor {
  private newToken = '';
  private queue: PendingRequest[] = [];

  constructor(
    private http: HttpClient,
    private accountSer: AccountService,
    private cookieSer: CookieService,
    // private translate: TranslateService,
    public fixed: FixedService,
    // public global: GlobalService
  ) {

  }

  private applyCredentials = req => {
    return req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + this.newToken),
    });
  };

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const allowAnonymous = this.fixed.allowAnonymous.filter(s => s === req.url.split('?')[0])[0];
    if (req.url.indexOf('assets') > -1 || req.url.indexOf('.json') > -1) {
      return next.handle(req).pipe(
        catchError(error => {
          throw 'error in source. Details: ' + error;
        })
      );
    } else if (allowAnonymous != null) {
      req = req.clone({ url: this.fixed.sysConfig.serverUrl + req.url });
      return next.handle(req).pipe(
        catchError(error => {
          throw 'error in source. Details: ' + error;
        })
      );
    } else {
      if (this.cookieSer.check("token")) {
        this.newToken = this.cookieSer.get("token");
      } else if (this.cookieSer.check(CookieEnum.ClinicRefresh)) {
        if (!this.fixed.tokenRequestSent) {
          this.fixed.tokenRequestSent = true;
          this.queue = [];
          // this.accountSer.obtainRefreshToken().subscribe({
          //   next: (response: any) => {
          //     this.accountSer.refreshToken(response);
          //     this.newToken = response.token;
          //     this.fixed.tokenRequestSent = false;
          //     this.queue.forEach(ele => {
          //       this.execute(ele);
          //     });
          //   },
          //   error: e => {
          //     this.accountSer.logout();
          //   },
          // });
        }
        return this.addRequestToQueue(req);
      } else {
        this.newToken = '';
        this.accountSer.logout();
      }
      req = req.clone({ url: this.fixed.sysConfig.serverUrl + req.url });
      return next.handle(this.applyCredentials(req)).pipe(
        catchError(error => {
          throw 'error in source. Details: ' + error;
        }),
        tap({
          error: err => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                this.accountSer.logout();
              }
            }
          },
        })
      );
    }
  }

  private addRequestToQueue(req: HttpRequest<any>) {
    let sub = new Subject<any>();
    let request = new PendingRequest(req, sub);
    this.queue.push(request);
    return sub;
  }

  private execute(requestData: PendingRequest) {
    this.http.request(requestData.req).subscribe({
      next: res => {
        const sub = requestData.subscription;
        sub.next(res);
      },
      error: () => {
      },
    });
  }
}
