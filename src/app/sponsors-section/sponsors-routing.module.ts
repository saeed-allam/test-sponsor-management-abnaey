import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SponsorOperationComponent } from './sponsors/sponsor-operation/sponsor-operation.component';
import { SponsorListComponent } from './sponsors/sponsor-list/sponsor-list.component';
import { ContactListComponent } from './sponsors-contact/contact-list/contact-list.component';
import { ContactOperationComponent } from './sponsors-contact/contact-operation/contact-operation.component';

const routes: Routes = [
  { path: '', redirectTo: 'list' ,pathMatch:"full" },
  { path: 'list', component: SponsorListComponent },
  { path: 'operation', component: SponsorOperationComponent },
  { path: 'operation/:id', component: SponsorOperationComponent },
  { path: 'contact-list', component: ContactListComponent },
  { path: 'contact-operation', component: ContactOperationComponent },
  { path: 'contact-operation/:id', component: ContactOperationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SponsorsRoutingModule {}
