import { LocalStorageService } from './../../services/local-storage.service';
import { ProductimageService } from './../../services/productimage.service';
import { CountyComponent } from './../county/county.component';
import { County } from 'src/app/models/county';
import { Product } from 'src/app/models/product';
import { CartService } from './../../services/cart.service';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartItems } from 'src/app/models/cartItems';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  filterText:string ="";
  dataLoaded = false;
  products:Product[] = [];
  currentCounty:County;
  //  productResponseModel:SingleResponseModel<Product>;
  constructor(private productService:ProductService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private CartService:CartService,
    private countyComponent:CountyComponent,
    private productimageService:ProductimageService,
    private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["categoryId"]){
        this.getProductsByCategory(params["categoryId"]);
      }else{
        this.getProducts();
      }
    })
    this.currentCounty = this.countyComponent.Value();
  }

  getProducts(){
    this.productService.getProducts().subscribe(response =>{
      this.products = response.data;
      this.dataLoaded = true;
    })
  }
  getProductsByCategory(categoryId:number){
    this.productService.getProductsByCategory(categoryId).subscribe(response =>{
      this.products = response.data;
      this.dataLoaded = true;
    })
  }
  addToCart(product:Product){
    this.toastrService.success("Sepete eklendi",product.productName)
    this.CartService.addToCart(product);
    this.updateToLocalStorage();
  }
  updateToLocalStorage(){
    if(this.localStorageService.getItem("cart")){
      this.localStorageService.remove("cart");
    }
    this.localStorageService.add("cart",JSON.stringify(CartItems));
  }

}
