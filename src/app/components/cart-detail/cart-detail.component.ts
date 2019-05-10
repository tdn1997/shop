import { Component, OnInit } from "@angular/core";
import { ProductModel } from "../../shared/models/product";
import { OrderService } from '../../shared/services/order.service';
import { OrderModel } from 'src/app/shared/models/order';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: "app-cart-detail",
  templateUrl: "./cart-detail.component.html",
  styleUrls: ["./cart-detail.component.css"]
})
export class CartDetailComponent implements OnInit {
  productsInCart: ProductModel[];
  isEmpty: boolean;
  isOrder: boolean;
  userFormGroup: FormGroup;
  cartTotal: Number;

  constructor( private orderService: OrderService, private formBuilder: FormBuilder) {
    this.createForm();
  }

  createForm(){
    this.userFormGroup = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(10)]],
      userEmail: ['', [Validators.required]],
      userPhone: ['', [Validators.required]],
      userAddress: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.getCartFromStorage();
    this.checkIfCartEmpty(); 
    this.hideTheCartIcon();   
    this.isOrder = false;
    this.getTotal();
  }

  getCartFromStorage(){
    if (localStorage.getItem("cart") !== null) {
      this.productsInCart = JSON.parse(localStorage.getItem("cart"));
    }
  }

  createOrder(userName, userEmail, userPhone, userAddress): void{   
    
    const order: OrderModel = new OrderModel();
    order.userName = userName;
    order.userEmail = userEmail;
    order.userPhone = userPhone;
    order.userAddress = userAddress;
    order.products = this.productsInCart;
    order.total = this.cartTotal;
    this.orderService.createOrder(order).subscribe(
      (data)=>{
        this.isOrder = true;
      }
    );
    this.productsInCart = [];
    localStorage.clear();    
    this.checkIfCartEmpty();
  }

  hideTheCartIcon(){
    let cartHTML = document.getElementById("cart");
    cartHTML.style.visibility = "hidden";
  }

  checkIfCartEmpty(){
    if(localStorage.getItem("cart") === null || localStorage.getItem("cart") === "[]"){
      this.isEmpty = true;
    }else{
      this.isEmpty=false;
    }
  }

  removeItem(removeItem) {
    this.productsInCart = this.productsInCart.filter(item => item.code !== removeItem.code);    
    localStorage.setItem("cart", JSON.stringify(this.productsInCart));
    this.checkIfCartEmpty();
    this.getTotal();
  }

  getTotal(){
    let S = 0; 
    if(this.productsInCart !== undefined){
      this.productsInCart.map(item => {
        S =  S + parseFloat(item.price.toString());
      })      
    }
    this.cartTotal = S;
  }
}
