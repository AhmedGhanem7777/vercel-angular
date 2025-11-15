import { NgModule } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './components/loading/loading.component';
import { SearchPipe } from './pipes/search.pipe';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardNavComponent } from './components/dashboard-nav/dashboard-nav.component';
import { SearchUserPipe } from './pipes/admin/searchUser.pipe';
import { CuttextPipe } from './pipes/admin/cuttext.pipe';
import { SearchRoomsPipe } from './pipes/admin/search-rooms.pipe';
import { SearchFacilityPipe } from './pipes/admin/search-facility.pipe';
import { FormatDatePipe } from './pipes/admin/format-date.pipe';
import { SearchBookingPipe } from './pipes/admin/search-booking.pipe';
import { SearchAdsPipe } from './pipes/admin/search-ads.pipe';



@NgModule({
  declarations: [
    NotFoundComponent,
    NavbarComponent,
    FooterComponent,
    LoadingComponent,
    SearchPipe,
    SidebarComponent,
    DashboardNavComponent,
    SearchUserPipe,
    CuttextPipe,
    SearchRoomsPipe,
    SearchFacilityPipe,
    FormatDatePipe,
    SearchBookingPipe,
    SearchAdsPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    NotFoundComponent,
    FooterComponent,
    LoadingComponent,
    SearchPipe,
    SidebarComponent,
    DashboardNavComponent,
    SearchUserPipe,
    CuttextPipe,
    SearchRoomsPipe,
    SearchFacilityPipe,
    FormatDatePipe,
    SearchBookingPipe,
    SearchAdsPipe
  ]
})
export class SharedModule { }
