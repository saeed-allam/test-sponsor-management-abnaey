import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullLayoutComponent } from './core/theme/full-layout/full-layout.component';
import { SimpleLayoutComponent } from './core/theme/simple-layout/simple-layout.component';
import { AuthGuard } from './core/gards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sponsor',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'sponsor',
    },
    children: [
      {
        path: 'sponsor',
        loadChildren: () =>
          import('./sponsors-section/sponsors.module').then(
            (m) => m.SponsorsModule
          ),
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: SimpleLayoutComponent,
    data: {
      title: 'login',
    },
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./account/account.module').then((m) => m.AccountModule),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
