import { FooterComponent } from './components/footer/footer.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule}   from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { CategoryComponent } from './components/category/category.component';
import { NaviComponent } from './components/navi/navi.component';
import { SearchfilterPipe } from './pipes/searchfilter.pipe';
import { ToastrModule } from 'ngx-toastr';
import { CarSummaryComponent } from './components/car-summary/car-summary.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CountyPipe } from './pipes/county.pipe';
import { CountyComponent } from './components/county/county.component';
import { ProfilComponent } from './components/profil/profil.component';
import { ImageAddComponent } from './components/image-add/image-add.component';
import { CartComponent } from './components/cart/cart.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CategoryComponent,
    NaviComponent,
    SearchfilterPipe,
    CarSummaryComponent,
    ProductAddComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    CountyPipe,
    CountyComponent,
    ProfilComponent,
    ImageAddComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},
    CountyComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
