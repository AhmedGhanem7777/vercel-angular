import { Component, OnInit } from '@angular/core';
import { AdsService } from '../../../core/services/admin/ads.service';
import { IAds } from '../../../core/models/admin/ads.interface';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrl: './ads.component.scss'
})
export class AdsComponent implements OnInit {
  // Array to store the most popular ads
  popularAds: IAds[] = []

  constructor(private _AdsService: AdsService) { }

  ngOnInit(): void {
    this.getMostPopularAds()
  }

  // Fetches the most popular ads from the AdsService
  getMostPopularAds() {
    let params = {
      size: 4,
      page: 1
    }
    this._AdsService.getAds(params).subscribe({
      next: (res) => {
        if (res.success) {
          // Store the fetched ads
          this.popularAds = res.data.ads
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
