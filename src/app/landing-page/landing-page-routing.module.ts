import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';
import { userGuard } from '../core/guards/user/user.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [userGuard], title: 'Home' },
  { path: 'explore', loadChildren: () => import('./explore/explore.module').then(m => m.ExploreModule), canActivate: [userGuard], title: 'Explore' },
  { path: 'favorites', loadChildren: () => import('./favorites/favorites.module').then(m => m.FavoritesModule), canActivate: [userGuard], title: 'Favorites' },
  { path: 'payment/:id', loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule), canActivate: [userGuard], title: 'Payment' },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule), canActivate: [userGuard], title: 'Profile' },
  { path: '**', component: NotFoundComponent, title: 'Error 404' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }
