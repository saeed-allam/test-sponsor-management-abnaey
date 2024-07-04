import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import {  RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    CoreModule.forRoot(),
    RouterModule.forChild([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: AccountComponent },
    ]),
  ],
})
export class AccountModule {}
