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
  states: any = ['Maharashtra', 'bihar', 'Uttar Pradesh', 'Lucknow'];
  cities: any = [
    'Mumbai',
    'Pune',
    'Nagpur',
    ' Wardha',
    'Mandgaon',
    'Ramtek',
    ' Amravati',
  ];
  registerForm: any = FormGroup;
  submitted = false;
  confirmedPassword: any;

  constructor(
    private formBuilder: FormBuilder,
    private service: ApiService,
    private router: Router,
    private toastr: ToastrService
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
        image: ['', [Validators.required]],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  get form() {
    return this.registerForm.controls;
  }

  changeState(e: any) {
    this.registerForm.state = e.target.value;
  }

  changeCity(e: any) {
    this.registerForm.city = e.target.value;
  }

  onImageChange(event: any) {
    console.log(event.target.files[0])
    const file = event.target.files[0]
    this.registerForm.patchValue({
      image: file,
    });
  }

  handleSubmit() {
    const formData = new FormData();
    formData.append('image', this.registerForm.get('image').value);
    formData.append('first_name', this.registerForm.get('first_name').value);
    formData.append('last_name', this.registerForm.get('last_name').value);
    formData.append('add_line1', this.registerForm.get('add_line1').value);
    formData.append('add_line2', this.registerForm.get('add_line2').value);
    formData.append('state', this.registerForm.get('state').value);
    formData.append('city', this.registerForm.get('city').value);
    formData.append('mobile', this.registerForm.get('mobile').value);
    formData.append('email', this.registerForm.get('email').value);
    formData.append('password', this.registerForm.get('password').value);

    this.service.userSignup(formData).then((res: any) => {
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
