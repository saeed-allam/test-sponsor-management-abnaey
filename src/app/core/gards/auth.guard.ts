import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AccountService } from '../../account/account.service';

@Injectable()
export class AuthGuard  {
  constructor(private router: Router, private accountSer: AccountService) { }

  canActivate() {
    if (this.accountSer.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
