import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RoomsService } from '../../../core/services/admin/rooms.service';
import { FacilityService } from '../../../core/services/admin/facility.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage-room',
  templateUrl: './manage-room.component.html',
  styleUrl: './manage-room.component.scss'
})
export class ManageRoomComponent implements OnInit{
  isViewMode: boolean = true;
  isEditMode: boolean = true;
  isAddMode: boolean = true;
  RoomsId: any;
  files: File[] = [];
  previewUrls: string[] = [];
  imgSrc: string[] = []
  facilities: any[] | any = [];
  facilityId: any[] | undefined = [];
  roomData: any;

  addRoomForm = new FormGroup({
    roomNumber: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    capacity: new FormControl(null, [Validators.required]),
    discount: new FormControl(null, [Validators.required]),
    facilities: new FormControl(null, [Validators.required]),
  })

  constructor(
    private _RoomsService: RoomsService,
    private _ToastrService: ToastrService,
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router,
    private _FacilityService: FacilityService
  ) {
    this.RoomsId = _ActivatedRoute.snapshot.params['id'];
    if (this.RoomsId) {
      this.isEditMode = true;
      this.getRoomById(this.RoomsId);
      _ActivatedRoute.url.subscribe(url => {
        this.isViewMode = url.some(segment => segment.path === 'view')
        this.disableFormControls()
      })
      this._ActivatedRoute.url.subscribe(url => {
        this.isEditMode = url.some(segment => segment.path === 'edit')
        this.enableFormControls()
      })
    } else {
      this.isAddMode = true;
      this.isEditMode = false;
      this.isViewMode = false
    }
  }

  ngOnInit(): void {
    this.getFacilities();
  }

  onSubmit(data: FormGroup) {
    let myData = new FormData();
    myData.append('roomNumber', data.value.roomNumber);
    myData.append('price', data.value.price);
    myData.append('capacity', data.value.capacity);
    myData.append('discount', data.value.discount);

    if (data.value.facilities && data.value.facilities.length > 0) {
      for (const f of data.value.facilities) {
        if (f) {
          myData.append('facilities', f);
        }
      }
    }

    if (this.files.length > 0) {
      for (const file of this.files) {
        myData.append('imgs', file, file.name);
      }
    }

    if (this.RoomsId) {
      this._RoomsService.editRoom(this.RoomsId, myData).subscribe({
        next: (res) => { 
          this._Router.navigate(['/admin/rooms-management/rooms']);
          this._ToastrService.success(res.message);
        },
        error: (err) => {
          console.log(err);
          
          this._ToastrService.error(err.error.message);
        }
      });
    } else {
      this._RoomsService.addRoom(myData).subscribe({
        next: (res) => {
          if (res.success) {
            this._Router.navigate(['/admin/rooms-management/rooms']);
            this._ToastrService.success(res.message);
          }
        },
        error: (err) => {
          console.log(err);
          this._ToastrService.error(err.error.message);
        }
      });
    }
  }

  getFacilities() {
    let params = {
      size: 300,
      page: 1
    }
    this._FacilityService.getFacilities(params).subscribe({
      next: (res: any) => {
        this.facilities = res.data?.facilities
      }
    })
  }

  getRoomById(id: string) {
    this._RoomsService.getRoomById(id).subscribe({
      next: (res: any) => {
        this.roomData = res.data.room;
      },
      error: (err) => {
        this._ToastrService.error(err.error.message)
      },
      complete: () => {
        if (this.roomData?.facilities) {
          this.roomData.facilities.forEach((facility: any) => {
            return this.facilities.push(facility);
          });
        }
        // Update to handle images array
        this.imgSrc = this.roomData?.images || [];
        // Add existing images to preview URLs
        this.previewUrls = [...this.imgSrc];

        this.addRoomForm.patchValue({
          roomNumber: this.roomData?.roomNumber,
          price: this.roomData?.price,
          capacity: this.roomData?.capacity,
          discount: this.roomData?.discount,
          facilities: this.roomData.facilities.map((facility: any) => facility._id)
        });
      }
    })
  }

  disableFormControls() {
    if (this.isViewMode) {
      this.addRoomForm.disable();
    }
  }

  enableFormControls() {
    if (this.isEditMode) {
      this.addRoomForm.enable();
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropzone = event.target as HTMLElement;
    dropzone.classList.add('dragover');
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropzone = event.target as HTMLElement;
    dropzone.classList.remove('dragover');
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropzone = event.target as HTMLElement;
    dropzone.classList.remove('dragover');

    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(Array.from(files));
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(Array.from(input.files));
    }
  }

  handleFiles(files: File[]) {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    this.files.push(...imageFiles);

    for (const file of imageFiles) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrls.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  onRemove(index: number) {
    // Remove from both files and previewUrls arrays
    if (index < this.files.length) {
      this.files.splice(index, 1);
    }
    this.previewUrls.splice(index, 1);
    
    // If it's an existing image, remove from imgSrc array
    if (index < this.imgSrc.length) {
      this.imgSrc.splice(index, 1);
    }
  }
}

