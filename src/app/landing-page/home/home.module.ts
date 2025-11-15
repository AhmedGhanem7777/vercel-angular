import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from "../../shared/shared.module";
import { PopularAdsComponent } from './popular-ads/popular-ads.component';
import { HotelsComponent } from './hotels/hotels.component';
import { HousesComponent } from './houses/houses.component';
import { AdsComponent } from './ads/ads.component';
import { TestimonialComponent } from './testimonial/testimonial.component';


@NgModule({
  declarations: [
    HomeComponent,
    PopularAdsComponent,
    HotelsComponent,
    HousesComponent,
    AdsComponent,
    TestimonialComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
]
})
export class HomeModule { }
