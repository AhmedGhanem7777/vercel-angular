
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RoomDetailsService } from '../../../core/services/room-details.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-review',
  templateUrl: './form-review.component.html',
  styleUrl: './form-review.component.scss'
})
export class FormReviewComponent implements OnInit {

  @Input() roomId: string = '';
  
  stars: number[] = [1, 2, 3, 4, 5];
  rating: number = 0;
  hoverRating: number = 0;
  starStates: string[] = ['inactive', 'inactive', 'inactive', 'inactive', 'inactive'];
  formReview!: FormGroup;

  constructor(private _RoomDetailsService: RoomDetailsService,private _ToastrService:ToastrService) { }

  ngOnInit(): void {
    this.initForm();
  }
  
  initForm() {
    this.formReview = new FormGroup({
      roomId: new FormControl(this.roomId, [Validators.required]),
      rating: new FormControl(0, [Validators.required, Validators.min(1)]),
      review: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  // Function to submit the review form
  submitForm(): void {
    if (this.formReview.valid) {
      this._RoomDetailsService.setReview(this.formReview.value).subscribe({
        next: (res) => {
          console.log('res',res);
          
          this._ToastrService.success(res.message)
          this.resetForm();
        },
        error: (err) => {
          this._ToastrService.error(err.error.message)
        }
      });
    }
  }

  // Function to set the selected rating
  setRating(star: number): void {
    this.rating = star;
    this.formReview.patchValue({ rating: star });
    this.updateStarStates();
  }

  // Function to handle star hover effect
  setHoverRating(star: number): void {
    this.hoverRating = star;
    this.updateStarStates();
  }

  // Function to reset the hover effect when the mouse leaves the stars
  resetHoverRating(): void {
    this.hoverRating = 0;
    this.updateStarStates();
  }

  // Function to update the visual state of stars based on rating/hover
  updateStarStates(): void {
    const activeRating = this.hoverRating || this.rating;
    this.starStates = this.stars.map(star =>
      star <= activeRating ? 'active' : 'inactive'
    );
  }

  // Function to reset the form while keeping the room ID
  resetForm(): void {
    this.formReview.reset({ roomId: this.roomId, rating: 0, review: '' });
    this.rating = 0;
    this.updateStarStates();
  }
}
