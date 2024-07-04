import { Component, OnInit } from '@angular/core';
import { SponsersService } from '../../sponsers.service';
import { FixedService } from '../../../core/service/fixed.service';
import { GlobalService } from '../../../core/service/global.service';
import { ResponseEnum } from '../../../core/enums/response.enum';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html'
})
export class ContactListComponent  implements OnInit {
  contactList: any;
  search = new FormControl();
  constructor(public sponsorSer: SponsersService, public fixed: FixedService,private global:GlobalService) {}
  ngOnInit(): void {
    this.fixed.subheader="Contact List";
    this.global.loading(true);
    this.sponsorSer.getSponsor();
    this.sponsorSer.getContact().subscribe({
      next: (response) => {
        this.contactList = response['data'];
        this.global.loading(false);
      },
      error: (err) => {
        console.log(err);
        this.global.loading(false);
        this.global.notificationMessage(ResponseEnum.Failed, 'contact list', err.message, err);
      },
    });
  }

}
