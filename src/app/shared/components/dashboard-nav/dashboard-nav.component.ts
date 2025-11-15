import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrl: './dashboard-nav.component.scss'
})
export class DashboardNavComponent {
  // isDarkTheme: boolean = false;
  // moon: boolean = false;
  isMenuOpen: boolean = false;
  
  // toggleTheme() {
  //   this.isDarkTheme = !this.isDarkTheme;
  //   this.moon = !this.moon;
  // }
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
