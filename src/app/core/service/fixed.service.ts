import { Injectable, inject } from '@angular/core';
import { SystemConfigModel } from '../model/system-config.model';
@Injectable()
export class FixedService {
  toastrOptions: any;
  public tokenRequestSent = false;
  public sysConfig = new SystemConfigModel();
  public pageList: any;
  public currentURL: string;
  public subheader;
  public allowAnonymous = ['token', 'Token/Refresh', 'User/ForgotPassword', 'User/ResetPassword', 'User/Logout'];
  public datePickerConfig = {
    dateInputFormat: 'YYYY/MM/DD',
    containerClass: 'theme-dark-blue',
    showWeekNumbers: false,
  };
  public dateTimePickerConfig = {
    dateInputFormat: 'YYYY/MM/DD, hh:mm a',
    containerClass: 'theme-dark-blue',
    showWeekNumbers: false,
  };
  public recordPerPage = [
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '30', value: 30 },
    { label: '40', value: 40 },
    { label: '50', value: 50 },
    { label: '100', value: 100 },
    { label: '150', value: 150 },
  ];
}
