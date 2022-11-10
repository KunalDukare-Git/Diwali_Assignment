import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api-service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  displayStyle = 'none';

  constructor(
    private service: ApiService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  openPopup() {
    this.displayStyle = 'block';
  }

  closePopup() {
    this.displayStyle = 'none';
  }

  onSubmit(data: any) {
    this.service.userLogin(data).then((res) => {
      if (res.status) {
        this.toastr.success(res.message, 'Success');
        this.router.navigate(['/user/dashboard']);
      } else {
        this.toastr.error(res.message, 'Error!');
      }
    });
  }

  handlePopupSubmit(email: any) {
    this.service.forgetPassword(email).subscribe((res: any) => {
      if (res.status) {
        this.toastr.success(res.message, 'Success');
        this.closePopup();
      } else {
        this.toastr.error(res.message, 'Error');
      }
    });
  }
}
