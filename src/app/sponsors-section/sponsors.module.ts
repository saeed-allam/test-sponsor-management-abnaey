import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SponsorsRoutingModule } from './sponsors-routing.module';
import { CoreModule } from '../core/core.module';
import { SponsersService } from './sponsers.service';
import { SponsorListComponent } from './sponsors/sponsor-list/sponsor-list.component';
import { SponsorOperationComponent } from './sponsors/sponsor-operation/sponsor-operation.component';
import { ContactOperationComponent } from './sponsors-contact/contact-operation/contact-operation.component';
import { ContactListComponent } from './sponsors-contact/contact-list/contact-list.component';
import { PaginationModule } from './pagination/pagination.module';


@NgModule({
  declarations: [
    SponsorListComponent,
    SponsorOperationComponent,
    ContactOperationComponent,
    ContactListComponent,
  ],
  imports: [
    CommonModule,
    SponsorsRoutingModule,
    CoreModule.forRoot(),
    PaginationModule
  ],
  providers:[SponsersService]

})
export class SponsorsModule { }
