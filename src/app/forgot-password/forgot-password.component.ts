import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  formLogin: FormGroup;
  constructor( private fb: FormBuilder,) { }

  ngOnInit() {
    this.formLogin = this.fb.group({
      email: ["", [Validators.email, Validators.required]],

    });

  }
  get fnEmail() {
    return this.formLogin.get("email");
  }

}
