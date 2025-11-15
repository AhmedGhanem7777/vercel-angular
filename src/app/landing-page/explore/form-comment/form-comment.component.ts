import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RoomDetailsService } from '../../../core/services/room-details.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-comment',
  templateUrl: './form-comment.component.html',
  styleUrl: './form-comment.component.scss'
})
export class FormCommentComponent implements OnInit {

  @Input() roomId: string = '';
  addComment!: FormGroup;

  constructor(private _RoomDetailsService: RoomDetailsService, private _ToastrService: ToastrService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.addComment = new FormGroup({
      roomId: new FormControl(this.roomId, [Validators.required]),
      comment: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  // Function to submit the form
  submitForm(): void {
    if (this.addComment.valid) {
      this._RoomDetailsService.addComment(this.addComment.value).subscribe({
        next: (res) => {
          console.log(res);
          this._ToastrService.success(res.message)
          this.resetForm();
        },
        error: (err) => {
          console.error(err);
          this._ToastrService.error(err.error.message)
        }
      });
    }
  }

  // Reset only the comment field without affecting the room ID
  resetForm(): void {
    this.addComment.patchValue({ comment: '' });
  }

  // Function to check if the form is valid
  isFormValid(): boolean {
    return this.addComment.valid;
  }
}
