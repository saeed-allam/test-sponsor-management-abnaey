import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from '../core/service/global.service';
import { ResponseEnum } from '../core/enums/response.enum';

@Injectable()
export class SponsersService {
  sponsorList:any;
  constructor(private http: HttpClient,private global:GlobalService) {}

  getSponsor() {
    this.global.loading(true);
    this.http.get('billing/sponsors').subscribe({
      next: res => {
        this.sponsorList = res['data'];
    this.global.loading(false);
      },
      error: (err) => {
    this.global.loading(false);
        this.global.notificationMessage(ResponseEnum.Failed,'sponsors List',err.message,err);
      },
    });
  }

  getSponsorById(id: any): Observable<any> {
    return this.http.get('billing/sponsors/' + id);
  }
  operation(model): Observable<any> {
    return model['id'] == null
      ? this.http.post('billing/sponsors/', model)
      : this.http.post('billing/sponsors/', model);
  }

  getContact(): Observable<any> {
    return this.http.get('billing/sponsor-contact-officers');
  }
  getContactById(id: any): Observable<any> {
    return this.http.get('billing/sponsor-contact-officers/' + id);
  }
  contactOperation(model): Observable<any> {
    return model['id'] == null
      ? this.http.post('billing/sponsor-contact-officers/', model)
      : this.http.post('billing/sponsor-contact-officers/', model);
  }
}
