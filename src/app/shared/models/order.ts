import { ProductModel } from "../models/product";

export class OrderModel {
  createDay: Date;
  userName: String;
  userEmail: String;
  userPhone: String;
  userAddress: String;
  products: ProductModel[];
  total: Number;
  completed: Boolean;
  deliveryDay: Date;
}
