import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { InfoComponent } from './info/info.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    InfoComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
