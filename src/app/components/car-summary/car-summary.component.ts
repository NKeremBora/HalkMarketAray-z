import { LocalStorageService } from './../../services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/models/cartItem';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { CartItems } from 'src/app/models/cartItems';

@Component({
  selector: 'app-car-summary',
  templateUrl: './car-summary.component.html',
  styleUrls: ['./car-summary.component.css']
})
export class CarSummaryComponent implements OnInit {

  cartItems: CartItem[]=[];

  constructor(private cartService: CartService, 
    private toastrService:ToastrService,
    private localStorageService:LocalStorageService
    ) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.cartItems = this.cartService.list();
  }
  getCartLocal(){
    this.cartItems = JSON.parse(this.localStorageService.getItem("cart"));  
  }
   removeFromCart(product:Product){
    this.cartService.removeFromCart(product);
     console.log(this.cartService.list())
     this.toastrService.error("Silindi",product.productName + " sepetten silindi.")
   }

   updateToLocalStorage(){
    if(localStorage.hasOwnProperty("cart")){
      this.localStorageService.remove("cart");
    }
    this.localStorageService.add("cart",JSON.stringify(CartItems));
  }


}
