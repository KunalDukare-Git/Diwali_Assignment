import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api-service/api.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from '../services/form-validations/mustmatch';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: any = FormGroup;
  submitted = false;
  confirmedPassword: any;

  constructor(
    private formBuilder: FormBuilder,
    private service: ApiService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        first_name: [
          '',
          [Validators.required, Validators.pattern('^[a-zA-Z]*$')],
        ],
        last_name: [
          '',
          [Validators.required, Validators.pattern('^[a-zA-Z ]*$')],
        ],
        add_line1: ['', [Validators.required]],
        add_line2: [''],
        state: ['', [Validators.required]],
        city: ['', [Validators.required]],
        mobile: [
          '',
          [
            Validators.required,
            Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: MustMatch('password', 'confirmPassword')
    }
    );
  }

  get form() {
    return this.registerForm.controls;
  }

  // pwdMatchValidator() {
  //   return this.registerForm.get('password').value ===
  //     this.registerForm.get('confirmedPassword').value
  //     ? null
  //     : { mismatch: true };
  // }

  handleSubmit() {
    this.service.userSignup(this.registerForm.value).then((res: any) => {
      if (res.status === true) {
        this.toastr.success(res.message, 'Success');
        this.router.navigate(['/dashboard']);
      } else {
        this.toastr.error(res.message, 'Error');
      }
    });
  }

  handleReset() {
    this.registerForm.reset();
    this.submitted = false;
  }
}
