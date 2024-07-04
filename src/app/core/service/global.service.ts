import { Injectable, inject } from '@angular/core';
import { ResponseEnum } from '../enums/response.enum';
import { forkJoin } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({ providedIn: 'root' })
export class GlobalService {
  toastrOptions: any;

  constructor(
    private translate: TranslateService,
    private toastrSer: ToastrService,) {}

  loading(type?: boolean) {
    const body = document.getElementsByTagName('body')[0] as HTMLBodyElement;
    type === true ? body.classList.add('page-loading') : body.classList.remove('page-loading');
  }

  notificationMessage(type: ResponseEnum, title?: string, message: string='check the internet connection', err?: any, position=null) {
    if (err != null && err.status === 403) return;
    this.toastrOptions = {
      positionClass: position == null ? ('toast-top-right') : position,
      progressBar: true,
      progressAnimation: 'increasing',
      closeButton: true,
    };
    let severity;
    if (type === ResponseEnum.Success) {
        severity = 'toast-success';
        this.toastrSer.show(message, title, this.toastrOptions, severity);

    } else if (type === ResponseEnum.Failed) {
        severity = 'toast-error';
        this.toastrSer.show(message, title, this.toastrOptions, severity);
    }
  }
  removeSpacesinFormControl(f) {
    const keys = Object.keys(f.controls);
    keys.forEach(key => {
      const value = f.controls[key].value;
      if (typeof value == 'string' && value != null) {
        f.controls[key].setValue(f.controls[key].value.trim());
      }
      if (/^ *$/.test(f.controls[key].value)) {
        f.controls[key].setValue(null);
      }
    });
  }
}
