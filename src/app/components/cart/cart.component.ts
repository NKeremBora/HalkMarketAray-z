import { ProductService } from 'src/app/services/product.service';
import { LocalStorageService } from './../../services/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { CartItems } from 'src/app/models/cartItems';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems:CartItem[] =[];
  products:Product[] =[];
  constructor(private cartService:CartService,
    private toastrService:ToastrService,
    private localStorageService:LocalStorageService,
    private productService:ProductService) { }

  ngOnInit(): void {
    this.getCart();
    this.getProducts();
  }

   removeFromCart(product:Product){
     this.cartService.removeFromCart(product);
     this.toastrService.error("Silindi",product.productName + " sepetten silindi.")
   }
   updateToLocalStorage(){
    this.localStorageService.remove("cart")
    this.localStorageService.add("cart",JSON.stringify(CartItems));
  }
  getCart() {
    console.log(this.cartItems);
      this.cartItems = JSON.parse(this.localStorageService.getItem("cart"));
  }

  getProducts(){
    this.productService.getProducts().subscribe(response =>{
      this.products = response.data;
    })

  }
  completeToOrder(){
    this.products.forEach(product => {
      console.log(1)
      this.cartItems.forEach(cartItem =>{
        console.log(2)
        if(product.productId === cartItem.product.productId){
          console.log(3)
          if(product.unitsInStock > cartItem.quantity){
            product.unitsInStock -= cartItem.quantity;
            this.productService.update(product).subscribe(data => {
              console.log(data);
              this.toastrService.success("Urun eklendi","basarili");
            })
            localStorage.removeItem("cart")
          }
          else if(product.unitsInStock === cartItem.quantity){
            product.unitsInStock = 0;
            console.log(5)
            this.productService.delete(product);
            localStorage.removeItem("cart")
          }
          else{
            console.log(6)
            this.toastrService.error("yeterli stok yok");
            cartItem.quantity = product.quantity;
          }
        }
      })
    })
  }


}
      
      
      
    

  





