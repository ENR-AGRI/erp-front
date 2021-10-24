import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-verif-mail',
  templateUrl: './verif-mail.component.html',
  styleUrls: ['./verif-mail.component.css']
})
export class VerifMailComponent implements OnInit {

  query

  constructor(private router: Router,private route:ActivatedRoute,private auth:AuthService) { }
  ngOnInit(): void {
 this.query=this.route.snapshot.params['token']

    //this.query=this.route.snapshot.queryParams['token']

    console.log(console.log(this.query));

       // remove token from url to prevent http referer leakage

       this.router.navigate([], { relativeTo: this.route, replaceUrl: true });

    if(this.query)

    this.auth.verifyEmailAccount(this.query).subscribe((data)=>{

     // this.router.navigate(['../login'], { relativeTo: this.route });

      console.log("courSearch",data);

    })
  }

}
