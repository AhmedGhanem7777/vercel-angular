import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdsUserService } from '../../../core/services/ads-user.service';
import { IRoom } from '../../../core/models/adsUser.interface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.scss'
})
export class RoomDetailsComponent implements OnInit {
  roomId: string | null = '';
  roomData!: IRoom;
  selectedImageIndex = 0;
  visibleThumbnails: number[] = [];
  readonly thumbnailsToShow = 4;
  showBookingForm = false;
  isLoading: boolean = false

  constructor(private _ActivatedRoute: ActivatedRoute, private _Location: Location, private _AdsUserService: AdsUserService, private _Router: Router) { }

  ngOnInit(): void {
    this.getRoomId();
    if (this.roomId != null) {
      this.getRoomById(this.roomId);
    }
  }
  // Function to extract the room ID from the route parameters
  getRoomId() {
    this._ActivatedRoute.paramMap.subscribe(
      (param) => {
        this.roomId = param.get('id');
        this.updateVisibleThumbnails();
      }
    );
  }

  // Function to fetch room details based on the room ID
  getRoomById(id: string) {
    this.isLoading = true
    this._AdsUserService.getRoomById(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.isLoading = false
          this.roomData = res.data.room;
          this.updateVisibleThumbnails();
          console.log(res);
        }
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false
      }
    });
  }

  // Function to update the selected image index in the gallery
  setSelectedImage(index: number) {
    this.selectedImageIndex = index;
    this.updateVisibleThumbnails();
  }

  // Function to update the array of visible thumbnail indexes
  updateVisibleThumbnails() {
    if (this.roomData?.images) {
      const start = Math.max(0, Math.min(
        this.selectedImageIndex - Math.floor(this.thumbnailsToShow / 2),
        this.roomData.images.length - this.thumbnailsToShow
      ));
      this.visibleThumbnails = Array.from(
        { length: Math.min(this.thumbnailsToShow, this.roomData.images.length) },
        (_, i) => start + i
      );
    }
  }

  // Function to navigate through the image gallery
  moveGallery(direction: 'prev' | 'next') {
    if (direction === 'prev' && this.selectedImageIndex > 0) {
      this.selectedImageIndex--;
    } else if (direction === 'next' && this.selectedImageIndex < (this.roomData?.images?.length || 0) - 1) {
      this.selectedImageIndex++;
    }
    this.updateVisibleThumbnails();
  }

  // Function to calculate the price after applying a discount
  calculateDiscountedPrice(price: number, discount: number): number {
    return price - (price * discount / 100);
  }

  // Function to toggle the booking form visibility
  toggleBookingForm() {
    if (!this.roomData.isBooked) {
      this.showBookingForm = !this.showBookingForm;
    }
  }

  // Function to navigate back to the previous page
  goBack() {
    this._Location.back()
  }
}
