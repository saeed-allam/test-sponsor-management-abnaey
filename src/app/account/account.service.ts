import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CookieEnum } from '../core/enums/cookie.enum';
import { ResponseEnum } from '../core/enums/response.enum';
import { FixedService } from '../core/service/fixed.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  loginForm: FormGroup;
  submitted = false;
  loading: boolean;
  constructor(
    private router: Router,
    private cookieSer: CookieService,
    private http: HttpClient,
    public fixed: FixedService,
    private formBuilder: FormBuilder
  ) {}
  obtainAccessToken(loginData): Observable<any> {
    return this.http.post('login', loginData);
  }

  isAuthenticated() {
    console.log(this.cookieSer.check('token'));
    return !this.cookieSer.check('token') ? false : true;
  }

  logout() {
    this.cookieSer.deleteAll();
    this.router.navigate(['/login']);
  }
  saveToken(data) {
    this.cookieSer.deleteAll();
    this.cookieSer.set(
      "token",
      data.token,
      new Date(data.expiration),
      '/'
    );
    this.cookieSer.set(
      CookieEnum.ClinicRefresh,
      data.refresh.token,
      new Date(data.refresh.expiresUtc),
      '/'
    );
  }
  loginAnyWay() {
    this.cookieSer
      .set(
        "token",
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNDk2ZDcwMTFkOTYxYTJmZGE5YTFmZmFlMzBmZWY4YjBjODFkM2VhYTI4MGYwNjFjNDYwNDgyMWYyMTYzYmE3NWQ1MDE0ODBhMzYyOGQ2NmUiLCJpYXQiOjE3MTA4MDY1ODMuNTQzOTA0LCJuYmYiOjE3MTA4MDY1ODMuNTQzOTA2LCJleHAiOjE3NDIzNDI1ODMuNTM1MTE2LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.oP7QVMkmhJwcWTTCnhQhLnL972Zhkd-OLh2RitSwhiqspebHo-2X1fSNs2zxwUwtJqC2xQRiamA5vcSF2CcKsAxbWwx86ELpCAUCFeApgu93mSdp50aEK-At5RgYZa1H0H9IT5L-eRqBJ5I9UkcZF9TkSU22aRbjIWsIZEZOft4nfkYopMC1YXWiG9kxgqEOF7mZ144M-XWvywnQ94VYj2-7rscYI9rXPpOzqhO7zqpW2uoBtp5fUyiHJ49aH5ZFBvF6n-OVnfLis3rPYoO8IOkCUP2q3Ig1WZGIDwumOfeUamTEOe-rH9ICg0nkSFFGYw_CLC5k7Eb5vc4JmAG0nFsbJOnDKVIrbFVg9StZ3chx-K8lVc3VrGUflf-R_hfKxHtk03xqunqfePdlzH2kWg9oPwCIXz-mUa8kr6SypMw6cb3kQHEzNzzQp5o3aK8iuNpwKXTvMjz0Z4o81qwIqwHBiraaEwk7gtVuf4-Of1ndKLph5KLUf5xNNJW4A8_wC8OWzvRWpmW4EkV4Kb-0NKMEI6da1--xHBl6QCV7_cL0OfokZ08_jlJs64662FP8lcE_pZ1Y0DsaCF7B5SY8qriF3EWvwzTtKbbP492mW-Ma0BTQM1aMuBnS4t7dDXtaQUTDY9YUrUhAx9aaJeQFcbFSvyFFejL1puO8Na-3skU'
      );
      this.router.navigate(['/']);
  }
}
