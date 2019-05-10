import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { OrderService } from "../../shared/services/order.service";
import { OrderModel } from "../../shared/models/order";

@Component({
  selector: "app-order-detail",
  templateUrl: "./order-detail.component.html",
  styleUrls: ["./order-detail.component.css"]
})
export class AdminOrderDetailComponent implements OnInit {
  orderDetail: OrderModel = new OrderModel();

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.hideTheCartIcon();
    this.getProductDetail();
  }

  getProductDetail(): void {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    this.orderService.readOrderDetail(id).subscribe(result => {
      this.orderDetail = result;
    });
  }

  hideTheCartIcon(): void {
    let cartHTML = document.getElementById("cart");
    cartHTML.style.visibility = "hidden";
  }

  updateOrder(
    id,
    createDay,
    userName,
    userEmail,
    userPhone,
    userAddress,
    total,
    completed,
    deliveryDay
  ): void {
    let data = new OrderModel();
    data.createDay = createDay;
    data.userName = userName;
    data.userEmail = userEmail;
    data.userPhone = userPhone;
    data.userAddress = userAddress;
    data.total = total;
    data.completed = completed;
    data.deliveryDay = deliveryDay;

    this.orderService.updateOrder(id, data).subscribe(result => {
      console.log(`Update Order Success ${result}`);
    });
  }

  deleteOrder(orderId){
    this.orderService.deleteOrder(orderId).subscribe(result=>{
      console.log(`Delete ${result} successfully!`)
    });
  }
}
