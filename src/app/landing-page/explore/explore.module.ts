import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExploreRoutingModule } from './explore-routing.module';
import { ExploreComponent } from './explore/explore.component';
import { SharedModule } from "../../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { RoomReviewsComponent } from './room-reviews/room-reviews.component';
import { FormReviewComponent } from './form-review/form-review.component';
import { FormCommentComponent } from './form-comment/form-comment.component';
import { ReviewsComponent } from './reviews/reviews.component';


@NgModule({
  declarations: [
    ExploreComponent,
    RoomDetailsComponent,
    BookingFormComponent,
    RoomReviewsComponent,
    FormReviewComponent,
    FormCommentComponent,
    ReviewsComponent
  ],
  imports: [
    CommonModule,
    ExploreRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
]
})
export class ExploreModule { }
