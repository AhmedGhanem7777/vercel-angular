import { Component, OnInit } from '@angular/core';
import { AdsUserService } from '../../../core/services/ads-user.service';
import { Location } from '@angular/common';
import { IRoom } from '../../../core/models/adsUser.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss'
})
export class ExploreComponent implements OnInit {
  isLoading: boolean = false
  searchInput!: number
  rooms!: IRoom[]

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages!: number;
  pages: number[] = [];
  totalNumOfRooms: number = 0;
  startItem: number = 1;
  endItem: number = 10;

  constructor(private _AdsUserService: AdsUserService, private _Location: Location, private _ToastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAllRooms()
  }

  // Fetch all rooms with pagination
  getAllRooms() {
    this.isLoading = true
    let params = {
      size: this.itemsPerPage,
      page: this.currentPage
    }
    this._AdsUserService.getAllRooms(params).subscribe({
      next: (res) => {
        if (res.success) {
          this.isLoading = false
          this.totalNumOfRooms = res.data.totalCount;
          this.rooms = res.data.rooms
          this.calculatePagination();
          this.updateItemRange();
        }
      }, error: (err) => {
        console.log(err);
        this.isLoading = false;
      }
    })
  }

  // Add a room to the user's favorites list
  addRoomToFav(roomId: string) {
    this._AdsUserService.addRoomToFav(roomId).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message)
      }, error: (err) => {
        this._ToastrService.error(err.error.message)
      }
    })
  }

  // Calculate the discounted price of a room
  calculateDiscountedPrice(price: number, discount: number): number {
    return price - (price * discount / 100);
  }

  // Navigate back to the previous page
  goBack() {
    this._Location.back()
  }

  // Calculate total pages for pagination
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
      this.getAllRooms();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getAllRooms();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getAllRooms();
    }
  }

  changePageSize(size: number): void {
    this.itemsPerPage = size;
    this.currentPage = 1; // Reset to first page when changing page size
    this.getAllRooms();
  }
}
