import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isAdmin:boolean=false
  isUser:Boolean=false
  isCommercial:Boolean=false
  constructor(private auth:AuthService) { }

  ngOnInit(): void {


    let user=this.auth.getDecodedToken()
    console.log("Currrentuseeer",user);

if(user.role==="Admin"){
  this.isAdmin=true;

}
else{

this.isAdmin=false

  }

  if(user.role==="User"){
    this.isUser=true;

  }
  else{

  this.isUser=false

    }

    if(user.role==="Commercial"){
      this.isCommercial=true;

    }
    else{

    this.isCommercial=false

      }








}
logout(){
  this.auth.logout();
}
}
