import { LocalStorageService } from './../../services/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from './../../models/loginModel';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private locaStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.createLogiForm();
  }

  createLogiForm(){
    this.loginForm = this.formBuilder.group({
      email: ["",Validators.required],
      password: ["",Validators.required],
    })  
  }
  login(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      let LoginModel = Object.assign({},this.loginForm.value)

      this.authService.login(LoginModel).subscribe(response => {
        if(response.success){
          this.toastrService.success("basariyla giris yapildi.","basarili")
          this.locaStorageService.add("token",response.data.token)
        }
      })
    }
  }

}

