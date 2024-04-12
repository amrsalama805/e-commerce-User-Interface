import {Cart } from './../Order/models/order/order.module';
import { Router } from '@angular/router';
import { ProductDetailsComponent } from './../Components/product-details/product-details.component';
import { Injectable } from '@angular/core';
import { CartItemService } from '../Order/Service/cart-item.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
private Items:any[]= JSON.parse(localStorage.getItem('CartItems')||"[]");
private  Products:any[]= JSON.parse(localStorage.getItem('favouriteProduct')||"[]");
private Total:number=0;
UserId: string="fb4efdeb-28f3-4f81-9cef-877310f6b438";
private Cart:Cart={
  id:0,
  productId:0,
  custId:this.UserId,
   enName: "",
  arName: "",
  imgURL: "",
  quantity:0,
  totalPrice:0,
  price:0
}

  constructor(private router:Router ,private CartItemService: CartItemService) { }
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token ? true : false;
  }

  AddtoCart(Product:any) {
    if(this.isLoggedIn()){
      this.Cart.quantity= 1;
      this.Cart.productId= Product.id;
      this.CartItemService.CreateCart(this.Cart).subscribe();
    }
    else{
         let Item = this.Items.find(i => i.id== Product.id);
          if(Item==null)
            {this.Items.push({...Product,wanted:1});
            localStorage.setItem('CartItems',JSON.stringify(this.Items));}
         }
  

  }
 
  Addtofavourite(Product:any) {
    let Item = this.Products.find(i => i.id== Product.id);
    if(Item==null)
   {this.Products.push({...Product,wanted:1});
  localStorage.setItem('favouriteProduct',JSON.stringify(this.Products)); 
  } 
  }

  getTotal(){
    localStorage.setItem('CartItems',JSON.stringify(this.Items));
    this.Total= this.Items.reduce((acc, item) =>{return acc += item.price*item.wanted},0);
    localStorage.setItem('CartsTotal',JSON.stringify(this.Total));
 return this.Total;
  }
  getItemPrice(Id:number ){
    let item = this.Items.find(i => i.id==Id);
    return item.price*item.wanted;
  }
  getItems() {return this.Items;}


  delete(Item:any) {
      this.Items =  this.Items.filter(i =>i.id !== Item.id);
      localStorage.setItem('CartItems',JSON.stringify(this.Items));
    }
  IncreamentQuantity(Id:number ){
    let Item = this.Items.find(i => i.id==Id);    
    Item.wanted++;
    localStorage.setItem('CartItems',JSON.stringify(this.Items));
  } 
  DecreamentQuantity(Id:number ){
    let Item = this.Items.find(i => i.id==Id); 
    Item.wanted--;
    if(Item.wanted<=0)
    {
      this.Items =  this.Items.filter(i =>i.id !== Item.id);
    }
    localStorage.setItem('CartItems',JSON.stringify(this.Items));
  } 
  
}
