import { Injectable } from '@angular/core';

import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { OrderModel } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderURL = "https://shop-back-end.herokuapp.com/orders";
  private httpOption = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  createOrder(newOrder): Observable<any>{
    return this.http.post(`${this.orderURL}/create`, newOrder, this.httpOption).pipe(
      tap(data => of(data)),
      catchError(error => of(null))
    );
  }

  readOrders(): Observable<OrderModel[]>{
    return this.http.get<OrderModel[]>(this.orderURL).pipe(
      tap(result => of(result)),
      catchError(err => of([]))
    )
  }

  readOrderDetail(orderId): Observable<OrderModel>{
    return this.http.get<OrderModel>(`${this.orderURL}/${orderId}`).pipe(
      tap(result => of(result)),
      catchError(err => of(null))
    )
  }

  completeOrder(orderId): Observable<any>{
    return this.http.post(`${this.orderURL}/${orderId}/completed`, this.httpOption).pipe(
      tap(data => of(data)),
      catchError(error => of(null))
    )
  }

  updateOrder(orderId, orderDetail): Observable<any>{
    return this.http.post(`${this.orderURL}/${orderId}`, orderDetail, this.httpOption).pipe(
      tap(data => of(data)),
      catchError(error => of(null))
    )
  }

  deleteOrder(orderId): Observable<any>{
    return this.http.post(`${this.orderURL}/${orderId}/delete`, this.httpOption).pipe(
      tap(data => of(data)),
      catchError(error => of(null))
    )
  }
  constructor(private http: HttpClient) { }
}
