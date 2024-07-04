import { Component } from '@angular/core';
import { FixedService } from '../../service/fixed.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
constructor(public fixed:FixedService){}
}
