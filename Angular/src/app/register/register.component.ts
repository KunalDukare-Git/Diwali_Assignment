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
  image:any;

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
    console.log('Stae', e.target.value);
    this.registerForm.state = e.target.value;
  }

  changeCity(e: any) {
    console.log('City', e.target.value);
    this.registerForm.city = e.target.value;
  }

  onImageChange(event: any) {
    console.log(event);
    console.log(event.target.files[0]);
    this.image = event.target.files[0];
  }

  handleSubmit() {
    console.log('SubmitData', this.registerForm.value);
    this.service.userSignup(this.registerForm.value,this.image).then((res: any) => {
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
