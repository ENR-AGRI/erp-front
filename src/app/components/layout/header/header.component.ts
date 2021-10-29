import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
current_User;
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.profile().subscribe((data:any)=>{
      this.current_User=data
      console.log("current_User",this.current_User);
    }


    )
  }
  logout(){
    this.auth.logout();
  }

}
