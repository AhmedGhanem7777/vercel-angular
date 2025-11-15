import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../core/services/admin/users.service';
import { IUsers } from '../../../core/models/admin/users.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  searchInput: string = '';
  users: IUsers[] = [];
  selectedUser!: IUsers;
  isLoading: boolean = false;
  showModal: boolean = false;

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages!: number;
  pages: number[] = [];
  totalNumOfUsers: number = 0;
  startItem: number = 1;
  endItem: number = 10;

  constructor(private _UsersService: UsersService) { }

  // Fetch all users when the component initializes
  ngOnInit(): void {
    this.getALlUsers();
  }

  // Fetch all users
  getALlUsers() {
    this.isLoading = true;

    let params = {
      size: this.itemsPerPage, // Number of items per page
      page: this.currentPage, // Current page number
    };

    this._UsersService.getAllUsers(params).subscribe({
      next: (res) => {        
        if (res.success) {
          // Store the list of users
          this.users = res.data.users;
          this.totalNumOfUsers = res.data.totalCount;
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

  // Fetch details of a specific user when clicked
  getSpecificUserDetails(userId: string) {
    this._UsersService.getUserInfoById(userId).subscribe({
      next: (res) => {
        console.log('res',res);
        
        if (res.success) {
          // Store the selected user's data
          this.selectedUser = res.data.user;

          // Show the modal popup
          this.showModal = true;
        }
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  // Close the modal popup
  closeModal() {
    this.showModal = false;
  }

  calculatePagination(): void {
    // Calculate total pages
    this.totalPages = Math.ceil(this.totalNumOfUsers / this.itemsPerPage);

    // Generate page numbers array
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // Update the displayed item range for the current page
  updateItemRange(): void {
    this.startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
    this.endItem = Math.min(this.currentPage * this.itemsPerPage, this.totalNumOfUsers);
  }

  // Navigate to a specific page
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getALlUsers();
    }
  }

  // Navigate to the previous page
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getALlUsers();
    }
  }

  // Navigate to the next page
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getALlUsers();
    }
  }

  // Change the number of items per page and reload data
  changePageSize(size: number): void {
    this.itemsPerPage = size;
    this.currentPage = 1; // Reset to first page when changing page size
    this.getALlUsers();
  }
}
