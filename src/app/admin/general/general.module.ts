import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralRoutingModule } from './general-routing.module';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchUserPipe } from '../../shared/pipes/admin/searchUser.pipe';
import { SharedModule } from '../../shared/shared.module';
import { CuttextPipe } from '../../shared/pipes/admin/cuttext.pipe';
import { NgChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    UsersComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    GeneralRoutingModule,
    FormsModule,
    SharedModule,
    NgChartsModule
  ]
})
export class GeneralModule { }
