import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreComponent } from './explore/explore.component';
import { NotFoundComponent } from '../../shared/components/not-found/not-found.component';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { RoomReviewsComponent } from './room-reviews/room-reviews.component';
import { ReviewsComponent } from './reviews/reviews.component';

const routes: Routes = [
    {path:'',redirectTo:'',pathMatch:'full'},
    {path:'',component:ExploreComponent},
    {path:'room-details/:id',component:RoomDetailsComponent,title:'Room Details'},
    {path:'all-reviews/:id',component:RoomReviewsComponent,title:'All Room Reviews'},
    {path:'reviews/:id',component:ReviewsComponent,title:'Reviews'},
    {path:'**',component:NotFoundComponent,title:'Error 404'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExploreRoutingModule { }
