import { Component, OnInit } from '@angular/core';
import { AdsUserService } from '../../../core/services/ads-user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  capacity: number = 0;



  constructor(private _AdsUserService: AdsUserService) { }

  ngOnInit(): void {
  }

  decreaseCapacity() {
    if (this.capacity > 0) {
      this.capacity--;
    }
  }

  increaseCapacity() {
    this.capacity++;
  }
}
