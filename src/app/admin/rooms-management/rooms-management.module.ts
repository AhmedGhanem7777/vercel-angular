import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsManagementRoutingModule } from './rooms-management-routing.module';
import { RoomsComponent } from './rooms/rooms.component';
import { FacilitiesComponent } from './facilities/facilities.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ManageRoomComponent } from './manage-room/manage-room.component';


@NgModule({
  declarations: [
    RoomsComponent,
    FacilitiesComponent,
    ManageRoomComponent,
  ],
  imports: [
    CommonModule,
    RoomsManagementRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule
  ]
})
export class RoomsManagementModule { }
