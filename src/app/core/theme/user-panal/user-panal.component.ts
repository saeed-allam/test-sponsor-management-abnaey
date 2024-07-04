import { Component, inject } from '@angular/core';
import { AccountService } from '../../../account/account.service';

@Component({
  selector: 'app-user-panal',
  templateUrl: './user-panal.component.html',
})
export class UserPanalComponent {
  accountSer = inject(AccountService);
}
