import { Component, OnInit } from '@angular/core';
import { AdsUserService } from '../../../core/services/ads-user.service';

interface IAds{
  createdBy:{userName:string},
  room:{
    roomNumber:number,
    images:string[],
    price:number
  }
}

@Component({
  selector: 'app-popular-ads',
  templateUrl: './popular-ads.component.html',
  styleUrl: './popular-ads.component.scss'
})
export class PopularAdsComponent implements OnInit{
  ads:IAds[] = []

  constructor(private _AdsUserService:AdsUserService){}

  ngOnInit(): void {
    this.getAds()
  }

  // Get all ads
  getAds(){
    this._AdsUserService.getAllAds().subscribe({
      next:(res)=>{
        this.ads = res.data.ads        
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
