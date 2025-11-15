import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  {path:'',redirectTo:'auth',pathMatch:'full'},
  {path:'auth',loadChildren:()=>import('./auth/auth.module').then((m)=>m.AuthModule)},
  {path:'landing-page',loadChildren:()=>import('./landing-page/landing-page.module').then((m)=>m.LandingPageModule)},
  {path:'admin',loadChildren:()=>import('./admin/admin.module').then((m)=>m.AdminModule)},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
