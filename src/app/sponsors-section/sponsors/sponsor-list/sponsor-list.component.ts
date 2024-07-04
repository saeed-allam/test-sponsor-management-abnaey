import { Component, OnInit } from '@angular/core';
import { SponsersService } from '../../sponsers.service';
import { FixedService } from '../../../core/service/fixed.service';
import { GlobalService } from '../../../core/service/global.service';
import { ResponseEnum } from '../../../core/enums/response.enum';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-sponsor-list',
  templateUrl: './sponsor-list.component.html'
})
export class SponsorListComponent implements OnInit {
  sponsorList: any;
  search = new FormControl();
  constructor(public sponsorSer: SponsersService, public fixed: FixedService,private global:GlobalService) {}
  ngOnInit(): void {
    this.fixed.subheader="Sponsor List";
    this.sponsorSer.getSponsor();
  }
}
