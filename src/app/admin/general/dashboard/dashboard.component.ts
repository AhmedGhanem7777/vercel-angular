import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType, ChartOptions, registerables, Chart } from 'chart.js';
import { DashboardService } from '../../../core/services/admin/dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  userCount: number = 0;
  adminCount: number = 0;
  pendingBookings: number = 0;
  completedBookings: number = 0;
  rooms: number = 0;
  facilities: number = 0;
  ads: number = 0;
  chart: any = [];
  newChart: any = [];
  facilitiesChart: any = [];
  overallChart: any = [];

  constructor(private _DashboardService: DashboardService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this._DashboardService.getCharts().subscribe({
      next: (response) => {
        this.userCount = response.data.users.user;
        this.adminCount = response.data.users.admin;
        this.pendingBookings = response.data.bookings.pending;
        this.completedBookings = response.data.bookings.completed;
        this.rooms = response.data.rooms;
        this.facilities = response.data.facilities;
        this.ads = response.data.ads;

        this.initializeCharts();
      },
      error: (err) => {
        console.error('Error fetching dashboard data:', err);
      }
    });
  }

  initializeCharts() {
    this.createBookingChart();
    this.createUsersChart();
    this.createFacilitiesChart();
    this.createOverallChart();
  }

  createBookingChart() {
    this.chart = new Chart('bookingChart', {
      type: 'doughnut',
      data: {
        labels: ['Pending', 'Completed'],
        datasets: [{
          label: 'Bookings',
          data: [this.pendingBookings, this.completedBookings],
          backgroundColor: ['#3252DF', '#FF498B']
        }]
      },
      options: {
        animation: {
          animateScale: true,
          animateRotate: true,
          duration: 2000,
          easing: 'easeInOutQuart'
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }

  createUsersChart() {
    this.newChart = new Chart('usersChart', {
      type: 'bar',
      data: {
        labels: ['Users', 'Admins'],
        datasets: [{
          label: 'Count',
          data: [this.userCount, this.adminCount],
          backgroundColor: ['#3252DF', '#FF498B'],
          borderRadius: 8
        }]
      },
      options: {
        animation: {
          delay: (context) => context.dataIndex * 300,
          duration: 1000,
          easing: 'easeInOutQuart'
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createFacilitiesChart() {
    this.facilitiesChart = new Chart('facilitiesChart', {
      type: 'pie',
      data: {
        labels: ['Rooms', 'Facilities'],
        datasets: [{
          data: [this.rooms, this.facilities],
          backgroundColor: ['#3252DF', '#FF498B'],
          borderWidth: 1
        }]
      },
      options: {
        animation: {
          animateScale: true,
          animateRotate: true,
          duration: 1500
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }

  createOverallChart() {
    this.overallChart = new Chart('overallChart', {
      type: 'radar',
      data: {
        labels: ['Users', 'Admins', 'Rooms', 'Facilities', 'Ads', 'Pending Bookings', 'Completed Bookings'],
        datasets: [{
          label: 'Statistics',
          data: [
            this.userCount,
            this.adminCount,
            this.rooms,
            this.facilities,
            this.ads,
            this.pendingBookings,
            this.completedBookings
          ],
          backgroundColor: 'rgba(50, 82, 223, 0.2)',
          borderColor: '#3252DF',
          pointBackgroundColor: '#FF498B',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#3252DF'
        }]
      },
      options: {
        animation: {
          duration: 2000
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
