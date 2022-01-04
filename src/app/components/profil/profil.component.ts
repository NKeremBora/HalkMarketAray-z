import { AuthService } from './../../services/auth.service';
import { AuthInterceptor } from './../../interceptors/auth.interceptor';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  logOut(){
    localStorage.removeItem("token");
  }
}
