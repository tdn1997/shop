import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ProductService } from '../../shared/services/product.service';
import { ProductModel } from '../../shared/models/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input() productDetail: ProductModel = new ProductModel();
  cart: ProductModel[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.getProductDetail();
    if(localStorage.getItem('cart') !== null){
      this.cart = JSON.parse(localStorage.getItem('cart'));
    }
  }

  getProductDetail(): void{
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.productService.getProductDetail(id).subscribe(
      item => {
        this.productDetail = item;
      }
    )
  }

  addToCart(product): void{    
    this.cart.push(product);
    //console.log(product);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    let cartInner = document.getElementById("cartHTML");
    cartInner.innerHTML = this.cart.length.toString();
  }

  goBack(): void{
    this.location.back();
  }

}
