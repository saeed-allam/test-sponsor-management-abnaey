import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPanalComponent } from './theme/user-panal/user-panal.component';
import { SimpleLayoutComponent } from './theme/simple-layout/simple-layout.component';
import { ScrollTopComponent } from './theme/scroll-top/scroll-top.component';
import { HeaderComponent } from './theme/header/header.component';
import { FullLayoutComponent } from './theme/full-layout/full-layout.component';
import { AsideComponent } from './theme/aside/aside.component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './gards/auth.guard';
import { Interceptor } from './service/interceptor.service';
import { FixedService } from './service/fixed.service';
import { FooterComponent } from './theme/footer/footer.component';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FilterByIdPipe } from './pipes/filter-by-id.pipe';
import { FilterPipe } from './pipes/filter.pipe';

const fixed = new FixedService();

@NgModule({
  declarations: [
    UserPanalComponent,
    SimpleLayoutComponent,
    ScrollTopComponent,
    HeaderComponent,
    FullLayoutComponent,
    AsideComponent,
    FooterComponent,
    FilterByIdPipe,
    FilterPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgSelectModule,
    TranslateModule,
    ToastrModule.forRoot(),
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TranslateModule,
    HttpClientModule,
    NgSelectModule,
    ReactiveFormsModule,
    FilterByIdPipe,
    FilterPipe
  ],
  providers: [
    { provide: FixedService, useValue: fixed },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
    AuthGuard,
  ],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
    };
  }
}
