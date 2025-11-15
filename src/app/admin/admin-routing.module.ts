import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';
import { adminGuard } from '../core/guards/admin/admin.guard';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '', component: MainComponent, canActivate: [adminGuard], children: [
      { path: '', redirectTo: 'general', pathMatch: 'full' },
      { path: 'general', loadChildren: () => import('./general/general.module').then(m => m.GeneralModule) },
      { path: 'rooms-management', loadChildren: () => import('./rooms-management/rooms-management.module').then(m => m.RoomsManagementModule) },
      { path: 'ads-booking', loadChildren: () => import('./ads-booking/ads-booking.module').then(m => m.AdsBookingModule) },
      { path: 'setting', loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule) },
      { path: '**', component: NotFoundComponent, title: 'Error 404' }
    ]
  },
  { path: '**', component: NotFoundComponent, title: 'Error 404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
