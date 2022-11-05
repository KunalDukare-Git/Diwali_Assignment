import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api-service/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  displayStyle = 'none';
  userId: any;
  user: any = {
    first_name: '',
    last_name: '',
    addres: { add_line1: '', add_line2: '', city: '', state: '' },
    email: '',
    mobile: 0,
  };

  constructor(
    private service: ApiService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') as any);
    this.userId = this.user._id;
  }

  openPopup() {
    this.displayStyle = 'block';
  }

  closePopup() {
    this.ngOnInit();
    this.displayStyle = 'none';
  }
  handleUpdate(data: any) {
   
    this.service.updateUser(data).then((res: any) => {
      if (res.status) {
        this.toastr.success(res.message, 'Success');
        this.closePopup();
      } else {
        this.toastr.error(res.message, 'Error');
      }
    });
  }

  handleLogout() {
    localStorage.clear();
    this.toastr.success('Logout Successfull', 'Success');
    this.router.navigate(['/login']);
  }
}
