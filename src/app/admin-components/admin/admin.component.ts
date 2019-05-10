import { Component, OnInit } from "@angular/core";

import { OrderService } from "../../shared/services/order.service";
import { ProductService } from "../../shared/services/product.service";
import { OrderModel } from "../../shared/models/order";
import { ProductModel } from "../../shared/models/product";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  products: ProductModel[] = [];
  orders: OrderModel[] = [];
  showArray = [];
  ArrayType = "";

  constructor(
    private orderService: OrderService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.hideTheCartIcon();
    this.getOrders();
    this.getProducts();
  }

  completeOrder(orderId): void{
    this.orderService.completeOrder(orderId).subscribe(
      (data)=>{
        console.log(`${orderId} Completed`)
      }
    )
  }

  showProducts(): void{
    this.showArray = this.products;
    this.ArrayType = "Products";
  }

  showOrders(): void{
    this.showArray = this.orders;
    this.ArrayType = "Orders";
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  getOrders(): void {
    this.orderService.readOrders().subscribe(data => {
      this.orders = data;
    });
  }

  hideTheCartIcon() {
    let cartHTML = document.getElementById("cart");
    cartHTML.style.visibility = "hidden";
  }
}
