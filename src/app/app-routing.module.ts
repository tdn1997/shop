import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './components/products/products.component';
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AdminComponent } from './admin-components/admin/admin.component';
import { AdminProductDetailComponent } from './admin-components/product-detail/product-detail.component';
import { AdminOrderDetailComponent } from './admin-components/order-detail/order-detail.component';

const routes: Routes = [
  {path: 'products', component: ProductsComponent},
  {path: 'products/:id', component: ProductDetailComponent},
  {path: 'cart-detail', component: CartDetailComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'admin/products/:id', component: AdminProductDetailComponent},
  {path: 'admin/orders/:id', component: AdminOrderDetailComponent},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
]

@NgModule({
  // declarations: [],
  imports: [
    // CommonModule
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
