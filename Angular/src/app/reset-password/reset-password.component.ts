import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api-service/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  displayStyle = 'block';

  constructor(
    private activateRoute: ActivatedRoute,
    private service: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let token: any = this.activateRoute.snapshot.paramMap.get('token');
    localStorage.setItem('token', token);
  }

  handleSubmit(form: any) {
    this.service.resetPassword(form).subscribe((res: any) => {
      console.log('Password Rest', res);
      if (res.status) {
        this.toastr.success(res.message);
        this.router.navigate(['/login']);
        localStorage.clear();
      }
    });
  }
}
