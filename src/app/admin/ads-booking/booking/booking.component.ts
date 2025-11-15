import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../core/services/admin/booking.service';
import { IBooking } from '../../../core/models/admin/booking.interface';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit {
  searchInput: string = '';
  booking: IBooking[] = [];
  selectedBooking!: IBooking;
  isLoading: boolean = false;
  showModal: boolean = false;

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages!: number;
  pages: number[] = [];
  totalNumOfBooking: number = 0;
  startItem: number = 1;
  endItem: number = 10;

  constructor(private _BookingService: BookingService,private _ToastrService:ToastrService) { }

  ngOnInit(): void {
    this.getBooking();
  }

  // Fetch all bookings with pagination
  getBooking() {
    this.isLoading = true;
    let params = {
      size: this.itemsPerPage,
      page: this.currentPage
    };

    this._BookingService.getBooking(params).subscribe({
      next: (res) => {        
        if (res.success) {
          this.booking = res.data.booking;
          this.totalNumOfBooking = res.data.totalCount;
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

  // Fetch a specific booking's details
  getSpecificBookingDetails(id: string) {
    this._BookingService.getBookingId(id).subscribe({
      next: (res) => {
        if (res.success) {          
          this.selectedBooking = res.data.booking;

          // Show modal with specific details
          this.showModal = true;
        }
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  // Delete a booking by ID
  deleteBooking(id:any) {
    this._BookingService.deleteBooking(id).subscribe({
      next:(res)=>{
        if (res.success) {
          this.getBooking()
          this._ToastrService.success(res.message)
        }
      },error:(err)=>{
        console.log(err);
        this._ToastrService.error(err.error.message)
      }
    })
  }

  // Calculate the final price after applying a discount
  calculateDiscountedPrice(price: number, discount: number): number {
    return price - (price * discount / 100);
  }

  // Close the modal
  closeModal() {
    this.showModal = false;
  }

  calculatePagination(): void {
    // Calculate total pages
    this.totalPages = Math.ceil(this.totalNumOfBooking / this.itemsPerPage);

    // Generate page numbers array
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  updateItemRange(): void {
    this.startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
    this.endItem = Math.min(this.currentPage * this.itemsPerPage, this.totalNumOfBooking);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getBooking();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getBooking();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getBooking();
    }
  }

  changePageSize(size: number): void {
    this.itemsPerPage = size;
    this.currentPage = 1; // Reset to first page when changing page size
    this.getBooking();
  }
}
