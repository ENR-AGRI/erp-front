import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgriService } from '../services/agri.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-liste-projets',
  templateUrl: './liste-projets.component.html',
  styleUrls: ['./liste-projets.component.css']
})
export class ListeProjetsComponent implements OnInit {
  projets=[]
  current_User
 ;

formProjet:FormGroup

  constructor(private agriSRV:AgriService,private fb:FormBuilder,private authSrv:AuthService) { }

  ngOnInit() {
    this.authSrv.profile().subscribe((data:any)=>{
      this.current_User=data
      console.log("current_User",this.current_User);
    }
    )

this.formProjet=this.fb.group({
  status: ["",Validators.required],
  ref:["",Validators.required],
  acces:["",Validators.required],
  dateQuotation:["",Validators.required],
  dateContrat :["",Validators.required],
  dateDeConception:["",Validators.required],
  dateConstruction:["",Validators.required],
  dateEnService:["",Validators.required],
  dateAbandon:["",Validators.required],
  commentaire:["",Validators.required]
})

    this.getAllProjets()
  }


   //PROJET
   createProjet() {
    let form=this.formProjet.value
    console.log("form",form);

form.user_id=this.current_User._id

  this.agriSRV.createProjet(form).subscribe((data)=>{

  });
  }

  getAllProjets() {
    this.agriSRV.getAllProjets().subscribe((data:any)=>{
    this.projets=data
    });
  }
}
