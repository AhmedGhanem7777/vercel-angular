import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../../../core/services/admin/rooms.service';
import { IRooms } from '../../../core/models/admin/rooms.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})

export class RoomsComponent implements OnInit {

  searchInput: string = '';
  rooms: IRooms[] = [];
  selectedRoom!: IRooms;
  isLoading: boolean = false;
  showModal: boolean = false;
  data: any

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages!: number;
  pages: number[] = [];
  totalNumOfRooms: number = 0;
  startItem: number = 1;
  endItem: number = 10;

  roomForm!: FormGroup
  roomId: string = ''

  constructor(private _RoomsService: RoomsService) { }

  ngOnInit(): void {
    this.getALlRooms();
  }

  initForm() {
    this.roomForm = new FormGroup({
      roomNumber: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      capacity: new FormControl(null, [Validators.required]),
      discount: new FormControl(null, [Validators.required]),
      facilities: new FormControl(null, [Validators.required]),
    })
  }

  // Fetch all rooms from the API with pagination
  getALlRooms() {
    this.isLoading = true;
    let params = {
      size: this.itemsPerPage,
      page: this.currentPage
    };

    this._RoomsService.getAllRooms(params).subscribe({
      next: (res) => {
        if (res.success) {
          this.rooms = res.data.rooms;
          this.totalNumOfRooms = res.data.totalCount;
          this.calculatePagination();
          this.updateItemRange();
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      }
    });
  }

  // Get details of a specific room by ID
  getSpecificRoomDetails(roomId: string) {
    this._RoomsService.getRoomById(roomId).subscribe({
      next: (res) => {
        console.log("Room", res);

        if (res.success) {
          this.selectedRoom = res.data.room;
          console.log(this.selectedRoom);

          // Show modal with specific details
          this.showModal = true;
        }
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  // Delete a room by ID and refresh the room list
  deleteRoom(id: any) {
    this._RoomsService.deleteRoom(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getALlRooms()
      }, error: (err) => {
        console.log(err);

      }
    })
  }


  calculateDiscountedPrice(price: number, discount: number): number {
    return price - (price * discount / 100);
  }

  closeModal() {
    this.showModal = false;
  }

  calculatePagination(): void {
    // Calculate total pages
    this.totalPages = Math.ceil(this.totalNumOfRooms / this.itemsPerPage);

    // Generate page numbers array
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  updateItemRange(): void {
    this.startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
    this.endItem = Math.min(this.currentPage * this.itemsPerPage, this.totalNumOfRooms);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getALlRooms();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getALlRooms();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getALlRooms();
    }
  }

  changePageSize(size: number): void {
    this.itemsPerPage = size;
    this.currentPage = 1; // Reset to first page when changing page size
    this.getALlRooms();
  }


}
