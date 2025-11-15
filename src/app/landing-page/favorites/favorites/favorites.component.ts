import { Component, OnInit } from '@angular/core';
import { AdsUserService } from '../../../core/services/ads-user.service';
import { IFavoriteRooms } from '../../../core/models/adsUser.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit {
  isLoading:boolean = false
  favRooms!: IFavoriteRooms[];

  constructor(private _AdsUserService: AdsUserService,private _ToastrService:ToastrService) { }

  ngOnInit(): void {
    this.getRoomFav()
  }

  // Function to fetch the list of favorite rooms
  getRoomFav() {
    this.isLoading = true
    this._AdsUserService.getRoomFav().subscribe({
      next: (res) => {
        if (res.success) {
          this.isLoading = false
          this.favRooms = res.data.favoriteRooms[0].rooms
        }
      }, error: (err) => {
        this.isLoading = false
        console.log(err);
      }
    })
  }

  // Function to remove a room from the favorites list
  removeRoom(roomId: string) {
    this._AdsUserService.removeFromFav(roomId).subscribe({
      next: (res) => {
        if (res.success) {
          this._ToastrService.success(res.message)
          this.getRoomFav()
        }
      }, error: (err) => {
        this._ToastrService.error(err.error.message)
      }
    })
  }
}
