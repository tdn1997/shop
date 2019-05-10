import { Injectable } from "@angular/core";

import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { ProductModel } from "../models/product";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  private productURL = "https://shop-back-end.herokuapp.com/products";
  private httpOption = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  getProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.productURL).pipe(
      tap(result => of(result)),
      catchError(err => of([]))
    );
  }

  getProductDetail(productId): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${this.productURL}/${productId}`).pipe(
      tap(result => of(result)),
      catchError(err => of(null))
    );
  }

  getSearchProducts(searchVal): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${this.productURL}/search/${searchVal}`).pipe(
      tap(result => of(result)),
      catchError(err => of([]))
    );
  }

  updateProduct(productId, productDetail): Observable<any>{
    return this.http.post(`${this.productURL}/${productId}`, productDetail, this.httpOption).pipe(
      tap(data => of(data)),
      catchError(error => of(null))
    )
  }

  deleteProduct(productId): Observable<any>{
    return this.http.post(`${this.productURL}/${productId}/delete`, this.httpOption).pipe(
      tap(data => of(data)),
      catchError(error => of(null))
    )
  }


  constructor(private http: HttpClient) {}
}
