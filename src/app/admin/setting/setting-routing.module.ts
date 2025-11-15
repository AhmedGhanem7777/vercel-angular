import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { NotFoundComponent } from '../../shared/components/not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { FeadbackComponent } from './feadback/feadback.component';

const routes: Routes = [
  { path: '', redirectTo: 'change-pass', pathMatch: 'full' },
  { path: 'change-pass', component: ChangePassComponent, title: 'Change Password' },
  { path: 'profile', component: ProfileComponent, title: 'Profile' },
  { path: 'feadback', component: FeadbackComponent, title: 'FeadBack' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
