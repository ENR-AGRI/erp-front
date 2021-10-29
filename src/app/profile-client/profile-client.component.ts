import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { AgriService } from '../services/agri.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile-client',
  templateUrl: './profile-client.component.html',
  styleUrls: ['./profile-client.component.css']
})
export class ProfileClientComponent implements OnInit {
  formClient: FormGroup;
  show = true;

  roles

  constructor(
  private fb:FormBuilder,
  private authSrv:AuthService,

  ) {}
  current_User;

  ngOnInit() {
    this.authSrv.profile().subscribe((data:any)=>{
      this.current_User=data
      console.log("current_User",this.current_User);
    }
    )



    this.formClient = this.fb.group({
      prenom: [
        "",
        [
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.required,
        ],
      ],
      nom: [
        "",
        [
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.required,
        ],
      ],

      email: ["", [Validators.email, Validators.required]],

      tel: ["", [Validators.required]],
      tel_Domicile: "",
      fonction: ["", [Validators.required]],
      adresse: ["", Validators.required],
      codePostal: ["", Validators.required],
      ville: ["", Validators.required],
      pays: ["France", Validators.required],
      complement:"",
      societe:"",
      nom_societe:"",
    });



  }
 borderVille=false
 borderFonction=false
 borderSociete=false
 borderCodePostal=false
 borderTel_Domicile=false
 borderNomSociete=false

  signUpClient() {
let form=this.formClient.value
console.log("form",form);
if(this.current_User.fonction==""){
  this.borderFonction=true
}
if(this.current_User.societe==""){
  this.borderSociete=true
}
if(this.current_User.nom_societe==""){
  this.borderVille=true
}
if(this.current_User.ville==""){
  this.borderVille=true
}
if(this.current_User.codePostal==""){
  this.borderCodePostal=true
}
if(this.current_User.tel_Domicile==""){
  this.borderTel_Domicile=true
}
if(this.current_User.nom_societe==""){
  this.borderNomSociete=true
}
form.nom=this.current_User.nom
form.prenom=this.current_User.prenom
form.email=this.current_User.email
form.tel=this.current_User.tel
form.fonction=this.formClient.value.fonction
form.societe=this.formClient.value.societe
form.nom_societe=this.formClient.value.nom_societe
form.ville=this.formClient.value.ville
form.codePostal=this.formClient.value.codePostal
form.tel_Domicile=this.formClient.value.tel_Domicile
form.role=this.current_User.role

console.log("form",form);
    this.authSrv.updateProfile(form).subscribe(
      (data: any) => {


        // if (data) this.toastr.success(data.msgsrv);
        // console.log("data error", data.msgsrv);
        // this.formClient.reset();
      },
      // (err:any) => {
      //   let msg = "verifier les champs saisie";
      //   // this.toastr.warning(err.error.msgsrv);
      //   this.toastr.warning(msg);
      // }
    );
  }

  getAllRoles() {
    this.authSrv.getAllRole().subscribe((data: any) => {
      this.roles = data;

      console.log("roles", this.roles);
    });
  }

  get fnNom() {
    return this.formClient.get("nom");
  }
  get fnPrenom() {
    return this.formClient.get("prenom");
  }

  get fnEmail() {
    return this.formClient.get("email");
  }
  get fnTel() {
    return this.formClient.get("tel");
  }

  get fnFonction() {
    return this.formClient.get("fonction");
  }

  get fnCodePostal() {
    return this.formClient.get("codePostal");
  }

  get fnVille() {
    return this.formClient.get("ville");
  }

  get fnPays() {
    return this.formClient.get("pays");
  }
  toggleshow() {
    this.show = !this.show;
  }

  listenEtat(value:any) {
    console.log("event.target.value : ",  value);
    let d = Date.now();
    let date = moment(d).format("lll");
    enum DateTypes {
      Date_StatQ = "Client En Quotation",
      Date_StatCC = "Contrat Cadre",
      Date_StatCp = "Client En Conception",

      Date_StatCs = "Client En Construction",
      Date_StatEs = "Client En service",
    }

    //this.formClient.reset();
    this.formClient.get("Date_StatQ").setValue("");
    this.formClient.get("Date_StatEs").setValue("");
    this.formClient.get("Date_StatCp").setValue("");
    this.formClient.get("Date_StatCs").setValue("");
    this.formClient.get("Date_StatCC").setValue("");
    const formControlName = Object.keys(DateTypes).find(
      (key) => DateTypes[key] === value
    );
    this.formClient.get(formControlName).setValue(date);
  }

}
