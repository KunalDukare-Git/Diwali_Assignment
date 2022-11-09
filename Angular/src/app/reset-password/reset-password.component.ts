import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  displayStyle = 'block';

  constructor() {}

  ngOnInit(): void {}

  handleSubmit(form:any){
    console.log(form)
  }
}
