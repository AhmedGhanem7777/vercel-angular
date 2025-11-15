import { Component, OnInit } from '@angular/core';
import { AdsService } from '../../../core/services/admin/ads.service';
import { IAds } from '../../../core/models/admin/ads.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { RoomsService } from '../../../core/services/admin/rooms.service';
import { ToastrService } from 'ngx-toastr';
import { IRooms } from '../../../core/models/admin/rooms.interface';


@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrl: './ads.component.scss'
})
export class AdsComponent implements OnInit {
  searchInput: string = '';
  ads: IAds[] = [];
  selectedAds!: IAds;
  isLoading: boolean = false;
  showModal: boolean = false;
  showAddModal: boolean = false;
  showEditModal: boolean = false;

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages!: number;
  pages: number[] = [];
  totalNumOfAds: number = 0;
  startItem: number = 1;
  endItem: number = 10;

  discountEditing: number = 0
  isActiveEditing: boolean = false
  idEditing: string = ''

  allRooms: IRooms[] = []


  addAdsForm = new FormGroup({
    room: new FormControl(''),
    discount: new FormControl(''),
    isActive: new FormControl(''),
  })

  constructor(private _AdsService: AdsService, private _RoomsService: RoomsService, private _ToastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAllAds();
  }

  // Fetch all ads with pagination
  getAllAds() {
    this.isLoading = true;
    let params = {
      size: this.itemsPerPage,
      page: this.currentPage
    };

    this._AdsService.getAds(params).subscribe({
      next: (res) => {
        if (res.success) {
          this.ads = res.data.ads;
          this.totalNumOfAds = res.data.totalCount;
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

  // Fetch specific ad details
  getSpecificRoomDetails(id: string) {
    this._AdsService.getAdsById(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.selectedAds = res.data.ads;

          // Show modal with specific details
          this.showModal = true;
        }
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  // Add new advertisement
  addNewAds(addAdsForm: FormGroup) {
    this._AdsService.addAds(addAdsForm.value).subscribe({
      next: (res) => {
        if (res.success) {
          this._ToastrService.success(res.message)

          this.getAllAds()
          this.addAdsForm.reset()
          this.showAddModal = false
        }
      }, error: (err) => {
        console.log(err);
        this._ToastrService.error(err.error.message)
      }
    })
  }

  // Edit an existing advertisement
  editAds(id: string, discount: number, isActive: boolean) {
    this._AdsService.editAds(id, discount, isActive).subscribe({
      next: (res) => {        
        if (res.success) {
          this._ToastrService.success(res.message)
          this.getAllAds()
          this.showEditModal = false
        }
      }, error: (err) => {
        console.log(err);
        this._ToastrService.error(err.error.message)
      }
    })
  }

  // Delete an advertisement
  deleteAds(id: string) {
    this._AdsService.deleteAds(id).subscribe({
      next: (res) => {        
        if (res.success) {
          this._ToastrService.success(res.message)
          this.getAllAds()          
        }
      }, error: (err) => {
        console.log(err);
        this._ToastrService.error(err.error.message)
      }
    })
  }

  // Fetch all available rooms
  getAllRooms() {
    let params = {
      size: 100,
      page: 1
    }
    this._RoomsService.getAllRooms(params).subscribe({
      next: (res) => {        
        if (res.success) {          
          this.allRooms = res.data.rooms
        }
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  // Show modal for adding a new ad
  showAddNewAdsModel() {
    this.getAllRooms()
    this.showAddModal = true
  }
  showEditingAdsModel(id: string) {
    this.idEditing = id
    this._AdsService.getAdsById(id).subscribe({
      next: (res) => {
        this.discountEditing = res.data.ads.room.discount
        this.isActiveEditing = res.data.ads.isActive
        this.showEditModal = true
      }, error: (err) => {
        console.log(err);

      }
    })
  }

  // Calculate discounted price
  calculateDiscountedPrice(price: number, discount: number): number {
    return price - (price * discount / 100);
  }

  // Close all modals
  closeModal() {
    this.showModal = false;
    this.showAddModal = false;
    this.showEditModal = false;
  }

  // Calculate total pages for pagination
  calculatePagination(): void {
    // Calculate total pages
    this.totalPages = Math.ceil(this.totalNumOfAds / this.itemsPerPage);

    // Generate page numbers array
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  updateItemRange(): void {
    this.startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
    this.endItem = Math.min(this.currentPage * this.itemsPerPage, this.totalNumOfAds);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getAllAds();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getAllAds();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getAllAds();
    }
  }

  changePageSize(size: number): void {
    this.itemsPerPage = size;
    this.currentPage = 1; // Reset to first page when changing page size
    this.getAllAds();
  }
}
