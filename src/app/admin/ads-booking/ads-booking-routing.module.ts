import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdsComponent } from './ads/ads.component';
import { BookingComponent } from './booking/booking.component';
import { NotFoundComponent } from '../../shared/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'ads', pathMatch: 'full' },
  { path: 'ads', component: AdsComponent, title: 'advertisements' },
  { path: 'booking', component: BookingComponent ,title:'Booking'},
  { path: '**', component: NotFoundComponent ,title:'Error 404'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdsBookingRoutingModule { }
