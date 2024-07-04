import { AfterViewInit, Component } from '@angular/core';
import KTUtil from '../../js/components/util';
import KTMenu from '../../js/components/menu';
import KTDrawer from '../../js/components/drawer';
import KTScroll from '../../js/components/scroll';
import KTSticky from '../../js/components/sticky';
import KTSwapper from '../../js/components/swapper';
import KTToggle from '../../js/components/toggle';
import KTScrolltop from '../../js/components/scrolltop';
import KTDialer from '../../js/components/dialer';
import KTThemeMode from '../../js/layout/theme-mode';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
})
export class FullLayoutComponent  implements AfterViewInit {
  jsLoaded = false;

  ngAfterViewInit() {
    if (!this.jsLoaded) {
      this.jsLoaded = true;
      KTUtil.init();
      KTDrawer.init();
      KTMenu.init();
      KTScroll.init();
      KTSticky.init();
      KTSwapper.init();
      KTToggle.init();
      KTScrolltop.init();
      KTDialer.init();
      KTThemeMode.init();
    }
  }
}
