import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { ProductService } from "../../shared/services/product.service";
import { ProductModel } from "../../shared/models/product";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"]
})
export class AdminProductDetailComponent implements OnInit {
  productDetail: ProductModel = new ProductModel();

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.hideTheCartIcon();
    this.getProductDetail();
  }

  getProductDetail(): void {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    this.productService.getProductDetail(id).subscribe(item => {
      this.productDetail = item;
    });
  }

  hideTheCartIcon(): void {
    let cartHTML = document.getElementById("cart");
    cartHTML.style.visibility = "hidden";
  }

  updateProduct(
    id,
    code,
    name,
    img,
    release,
    inventory,
    price,
    sold,
    company
  ): void {
    let data = new ProductModel();
    data.code = code;
    data.name = name;
    data.img = img;
    data.release = release;
    data.inventory = inventory;
    data.price = price;
    data.sold = sold;
    data.company = company;

    this.productService.updateProduct(id, data).subscribe(result => {
      console.log(`Update Success ${result}`);
    });
  }

  deleteProduct(productId){
    this.productService.deleteProduct(productId).subscribe(result=>{
      console.log(`Delete ${result} successfully!!`);
    })
  }
}
