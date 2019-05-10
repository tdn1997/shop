import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { ProductService } from "./shared/services/product.service";
import { OrderService } from './shared/services/order.service';

import { ProductsComponent } from "./components/products/products.component";
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AdminComponent } from './admin-components/admin/admin.component';
import { AdminOrderDetailComponent } from './admin-components/order-detail/order-detail.component';
import { AdminProductDetailComponent } from './admin-components/product-detail/product-detail.component';


@NgModule({
  declarations: [AppComponent, ProductsComponent, CartDetailComponent, ProductDetailComponent, AdminComponent, AdminOrderDetailComponent, AdminProductDetailComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  providers: [ProductService, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule {}
