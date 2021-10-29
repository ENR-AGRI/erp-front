import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formClient: FormGroup;
  msgError=''
  msgSuccess=""
  submitted = false;
  constructor(
    private formbuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.formClient = this.formbuilder.group({
      nom: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      prenom: [
        "",
        [
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.required,
        ],
      ],
      email: ["", [Validators.email, Validators.required]],
      tel: [
        "",
        [
          Validators.required,
          Validators.pattern("(0|\\+33|0033)[1-9][0-9]{8}"),
        ],
      ],
      password: [
        "",
        [
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.required,
        ],
      ],
      confirm_password: ["",Validators.required],
    }, {
      validator: this.MustMatch('password', 'confirm_password')
  });
  }

  signUpClient() {
    this.submitted = true;
    let user = this.formClient.value;

    user.role = "User";

    user.activatedMail = false;
    user.activationToken = new Date().getTime().toString();
    console.log("form", this.formClient.value);




    this.authService.register(user).subscribe(
      (data: any) => {
        console.log("data", data);

        if (data){
          this.msgError=''
          setTimeout(() => {
          this.msgSuccess= `${data.email } has been registred verifiy your email address `
        }, 500);
        }



        //this.formClient.reset();

       // this.router.navigate(["/login"]);
      },
      (err) => {

        if (err.error.msgsrv){
          this.msgSuccess= ''
          setTimeout(() => {
            this.msgError = err.error.msgsrv;
          }, 500);
        }



      }
    );
  }

  get fnNom() {
    return this.formClient.get("nom");
  }

  get fnTel() {
    return this.formClient.get("tel");
  }
  get fnPassword() {
    return this.formClient.get("password");
  }

  get fnEmail() {
    return this.formClient.get("email");
  }

  get fnConfirmPassword() {
    return this.formClient.get("confirm_password");
  }
  get fnPrenom() {
    return this.formClient.get("prenom");
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
