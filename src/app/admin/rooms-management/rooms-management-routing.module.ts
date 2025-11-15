import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './rooms/rooms.component';
import { FacilitiesComponent } from './facilities/facilities.component';
import { NotFoundComponent } from '../../shared/components/not-found/not-found.component';
import { ManageRoomComponent } from './manage-room/manage-room.component';

const routes: Routes = [
  { path: '', redirectTo: 'rooms', pathMatch: 'full' },
  { path: 'rooms', component: RoomsComponent ,title:'Rooms'},
  { path: 'manage-room/:id', component: ManageRoomComponent ,title:'Edit Room'},
  { path: 'manage-room', component: ManageRoomComponent ,title:'Add Room'},
  { path: 'facilities', component: FacilitiesComponent ,title:'Facilities'},
  { path: '**', component: NotFoundComponent ,title:'Error 404'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsManagementRoutingModule { }
