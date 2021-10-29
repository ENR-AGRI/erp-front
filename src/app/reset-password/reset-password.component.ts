import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {


  formLogin: FormGroup;

  submitted: boolean;
  msgError=''
  msgSuccess=""

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private authSrv: AuthService ) {}

  ngOnInit(): void {
    this.formLogin = this.fb.group({

      resetPasswordToken: ["", [Validators.minLength(6),Validators.maxLength(6), Validators.required]],
      newPassword: ["", [Validators.minLength(5),Validators.maxLength(50), Validators.required]],
      confirmPassword: ["", Validators.required],
    }, {
      validator: this.MustMatch('newPassword', 'confirmPassword')
  });

    // if (localStorage.getItem("email")) {
    //   this.formLogin.get("email").setValue(localStorage.getItem("email"));
    // }
  }
  Reset_Password() {
  console.log("reset pwd form value",this.formLogin.value);
  this.submitted = true;
    //   if (this.formLogin.valid)
    this.authSrv.resetPassword(this.formLogin.value).subscribe(
      (data: any) => {
        console.log(data);
        if (data) {
          this.msgError=''
          setTimeout(() => {
            this.router.navigate([ "/login"]);

        }, 3500);
        this.msgSuccess= `${data.msgsrv}`
        }
      },
      (err) => {
        if (err.error.msgsrv){
          this.msgSuccess= ''
          setTimeout(() => {
            this.router.navigate(["/forgotPassword"])
          }, 3500);
          this.msgError = err.error.msgsrv;
        }



      }

    );
  }


  get fnCode() {
    return this.formLogin.get("resetPasswordToken");
  }
  get fnConfirmPwd() {
    return this.formLogin.get("confirmPassword");
  }
  get fnNewPwd() {
    return this.formLogin.get("newPassword");
  }
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

}
