import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  formLogin: FormGroup;
  submitted = false;
  msgError=''
  msgSuccess=""
  constructor( private fb: FormBuilder,private authSrv:AuthService,
    private router:Router) { }
  ngOnInit() {

    this.formLogin = this.fb.group({

      email: ["", [Validators.email, Validators.required]],
    });
  }


  forgotPassword(){
    this.submitted = true;

    this.authSrv.forgotPassword(this.formLogin.value).subscribe(
      (data: any) => {
        console.log(data);

        if (data){
          this.msgError=''
          setTimeout(() => {

          this.router.navigate([ "/reset-password"]);
        }, 3500);
        this.msgSuccess= "Code has been send verifiy your email address"
        }



      },     (err) => {

        if (err.error.msgsrv){
          this.msgSuccess= ''
          setTimeout(() => {
            this.msgError = err.error.msgsrv;
          }, 500);
        }



      }

    );

  }
  get fnEmail() {

    return this.formLogin.get("email");

  }
}
