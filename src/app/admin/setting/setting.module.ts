import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { SharedModule } from "../../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { FeadbackComponent } from './feadback/feadback.component';


@NgModule({
  declarations: [
    ChangePassComponent,
    ProfileComponent,
    FeadbackComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
]
})
export class SettingModule { }
