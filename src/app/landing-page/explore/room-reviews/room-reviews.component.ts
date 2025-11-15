import { Component, OnInit } from '@angular/core';
import { IRoomReview } from '../../../core/models/roomDetails.interface';
import { RoomDetailsService } from '../../../core/services/room-details.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room-reviews',
  templateUrl: './room-reviews.component.html',
  styleUrl: './room-reviews.component.scss'
})
export class RoomReviewsComponent implements OnInit {
  roomReviews: IRoomReview[] = [];
  totalCount: number = 0;
  isLoading: boolean = true;
  roomId: string = ''

  constructor(private _RoomDetailsService: RoomDetailsService, private _ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getRoomId()
    this.fetchRoomReviews();
  }

  // Function to fetch reviews for the specified room
  fetchRoomReviews(): void {
    this._RoomDetailsService.getRoomReviews(this.roomId).subscribe({
      next: (res) => {
        console.log(res);

        setTimeout(() => {
          this.roomReviews = res.data.roomReviews;
          this.totalCount = res.data.totalCount;
          this.isLoading = false;
        }, 500);
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  // Function to get the room ID from the route parameters
  getRoomId() {
    this._ActivatedRoute.paramMap.subscribe((param) => this.roomId = param.get('id') || '')
  }

  // Function to generate an array representing star ratings
  generateStars(rating: number): number[] {
    return Array(rating).fill(0);
  }

  // Function to format the date into a readable format
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
