import { Component, OnInit } from '@angular/core';
import { IFacility } from '../../../core/models/admin/facility.interface';
import { FacilityService } from '../../../core/services/admin/facility.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrl: './facilities.component.scss'
})
export class FacilitiesComponent implements OnInit {
  searchInput: string = '';
  facilities: IFacility[] = [];
  selectedfacility!: IFacility;
  isLoading: boolean = false;
  showModal: boolean = false;
  showAddFacilityModel: boolean = false;
  showEditingFacility: boolean = false

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages!: number;
  pages: number[] = [];
  totalNumOfFacilities: number = 0;
  startItem: number = 1;
  endItem: number = 10;
  newNameFacility: string = ''
  nameEditing: string = ''
  currentNameFacility: string = ''
  currentIdFacility: string = ''

  constructor(private _FacilityService: FacilityService, private _ToastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAllFacilities();
  }

  // Fetches all facilities
  getAllFacilities() {
    this.isLoading = true;
    let params = {
      size: this.itemsPerPage, // Number of facilities per page
      page: this.currentPage // Current page number
    };

    this._FacilityService.getFacilities(params).subscribe({
      next: (res) => {        
        if (res.success) {
          this.facilities = res.data.facilities;
          this.totalNumOfFacilities = res.data.totalCount;
          this.calculatePagination(); // Generate pagination details
          this.updateItemRange(); // Update item range for display
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      }
    });
  }

  // Fetches details of a specific facility
  getSpecificFacilityDetails(facilityId: string) {
    this._FacilityService.getFacilityById(facilityId).subscribe({
      next: (res) => {        
        if (res.success) {
          this.selectedfacility = res.data.facility; // Store selected facility data
          this.currentNameFacility = res.data.facility.name
          this.currentIdFacility = res.data.facility._id

          // Show modal with specific details
          this.showModal = true;
        }
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  // Displays the add facility modal
  showAddFacilitiesModel() {
    this.showAddFacilityModel = true
  }

  // Displays the edit facility modal and fetches its details
  showEditingFacilitiesModel(id: string) {
    this._FacilityService.getFacilityById(id).subscribe({
      next: (res) => {        
        if (res.success) {
          // Store facility details for editing
          this.selectedfacility = res.data.facility;
          this.currentNameFacility = res.data.facility.name;
          this.currentIdFacility = res.data.facility._id;
          this.nameEditing = res.data.facility.name;

          // Show only the editing modal
          this.showEditingFacility = true;
        }
      }, error: (err) => {
        console.log(err);
        this._ToastrService.error('Failed to load facility details. Please try again.');
      }
    });
  }

  // Adds a new facility
  addFacility() {
    this._FacilityService.addNewFacilitie(this.newNameFacility).subscribe({
      next: (res) => {
        if (res.success) {
          this._ToastrService.success(res.message)
          this.showAddFacilityModel = false
          // Refresh the facilities list
          this.getAllFacilities()
        }
      }, error: (err) => {
        console.log(err.error.message);
        this._ToastrService.error(err.error.message)
      }
    })
  }

  // Edits an existing facility
  editFacility(nameEditing: string, id: string) {
    if (nameEditing != this.currentNameFacility) {
      this._FacilityService.editFacility(nameEditing, id).subscribe({
        next: (res) => {          
          if (res.success) {
            this._ToastrService.success(res.message)

            // Refresh the facilities list
            this.getAllFacilities()
            this.showEditingFacility = false
          }
        }, error: (err) => {
          console.log(err);
          this._ToastrService.error(err.error.message);
        }
      })
    } else {
      this._ToastrService.error('Failed to update facility. Please try again.')
    }
  }

  // Deletes a facility
  deleteFacility(id: string) {
    this._FacilityService.deleteFacility(id).subscribe({
      next: (res) => {
        console.log(res);
        
        if (res.success) {
          this._ToastrService.success('Facility Deleted Successfully')
          // Refresh the facilities list
          this.getAllFacilities()
        }
      }, error: (err) => {
        console.log(err);
        this._ToastrService.error('Failed to delete facility. Please try again.')
      }
    })
  }

  // Calculates the discounted price of a facility
  calculateDiscountedPrice(price: number, discount: number): number {
    return price - (price * discount / 100);
  }

  // Closes all modals
  closeModal() {
    this.showModal = false;
    this.showAddFacilityModel = false;
    this.showEditingFacility = false;
  }

  // Calculates the total number of page
  calculatePagination(): void {
    // Calculate total pages
    this.totalPages = Math.ceil(this.totalNumOfFacilities / this.itemsPerPage);

    // Generate page numbers array
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // Updates the displayed range of items for the current page
  updateItemRange(): void {
    this.startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
    this.endItem = Math.min(this.currentPage * this.itemsPerPage, this.totalNumOfFacilities);
  }

  // Navigates to a specific page
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getAllFacilities();
    }
  }

  // Navigates to the previous page
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getAllFacilities();
    }
  }

  // Navigates to the next page
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getAllFacilities();
    }
  }

  // Changes the number of facilities displayed per page
  changePageSize(size: number): void {
    this.itemsPerPage = size;
    this.currentPage = 1; // Reset to first page when changing page size
    this.getAllFacilities();
  }
}
