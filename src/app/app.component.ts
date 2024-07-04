import { Component } from '@angular/core';
import { FixedService } from './core/service/fixed.service';
import { SystemConfigService } from './core/service/system-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(public fixed: FixedService, private configSer: SystemConfigService) {
    this.fixed.sysConfig = this.configSer.getSystemConfig();
  }
}
