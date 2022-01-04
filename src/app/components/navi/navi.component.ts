import { AuthService } from 'src/app/services/auth.service';
import { CountyService } from './../../services/county.service';
import { Component, OnInit } from '@angular/core';
import { County } from 'src/app/models/county';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
 
  isLoggedin:boolean;
  constructor(private authService:AuthService,
    private router:Router) { 
      this.router.events.subscribe(event => {
        if(event.constructor.name == "NavigationEnd"){
          this.isLoggedin = this.authService.isAuthenticated();
        }
      })
    }


    ngOnInit(): void {
    }
}
