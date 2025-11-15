import { Component, Input } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() profileImage:string = ''
  @Input() userName:string = ''
  @Input() email:string = ''
  loading:boolean = false

  isProductsOpen = false;
  isProfileOpen = false;
  isMobileMenuOpen = false;

  constructor(private _AuthService:AuthService){}

  logOut(){
    this._AuthService.Logout()
  }

  toggleProfile() {
    this.isProfileOpen = !this.isProfileOpen;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMenuOnMobile() {
    if (window.innerWidth <= 768) {
      this.isMobileMenuOpen = false;
      document.body.style.overflow = '';
    }
  } 

}
