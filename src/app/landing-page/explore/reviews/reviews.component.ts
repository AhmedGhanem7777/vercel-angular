import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent implements OnInit {
  roomId: string = ''

  constructor(private _ActivatedRoute:ActivatedRoute){}
  
  ngOnInit(): void {
    this.getRoomId()
  }

  // Function to get the room ID from the route parameters
  getRoomId() {
    this._ActivatedRoute.paramMap.subscribe((param) => {
      this.roomId = param.get('id') || '';
    });
  }
}
