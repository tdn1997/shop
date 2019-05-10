import { Component, OnInit } from "@angular/core";

import { ProductService } from "../../shared/services/product.service";
import { ProductModel } from "../../shared/models/product";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  products: ProductModel[];
  productsShow: ProductModel[] = [];
  cart: ProductModel[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    if (localStorage.getItem("cart") !== null) {
      this.cart = JSON.parse(localStorage.getItem("cart"));
    }
    this.getProducts();
    this.setCartInner(this.cart.length);
    this.showTheCartIcon();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.productsShow = data;
    });
  }

  showTheCartIcon() {
    let cartHTML = document.getElementById("cart");
    cartHTML.style.visibility = "visible";
  }

  addToCart(product): void {
    this.cart.push(product);
    //console.log(product);
    localStorage.setItem("cart", JSON.stringify(this.cart));
    this.setCartInner(this.cart.length);
  }
  setCartInner(lenght) {
    let cartInner = document.getElementById("cartHTML");
    cartInner.innerHTML = lenght;
  }

  onSearch(input): void {
    let searchValue = this.convert(input);
    if (searchValue == "") {
      this.productService.getProducts().subscribe(data => {
        this.products = data;
      });
    } else {
      this.productService.getSearchProducts(searchValue).subscribe(data => {
        this.products = data;
      });
    }
  }
  convert(input) {
    input = input.trim();
    let arr = input.split(" ");
    let val = "";
    for (let index = 0; index < arr.length; index++) {
      if (index == 0) {
        val += arr[index];
      } else {
        val += `%20${arr[index]}`;
      }
    }
    return val;
  }

  onFilterProducts(
    productTypeOption,
    productPriceOption,
    productCompanyOption
  ): void {
    let filterProducts;
    if (productPriceOption === "all") {
      filterProducts = this.products;
    } else {
      filterProducts = this.products.filter(item => {
        if (productPriceOption === "2.000.000-5.000.000") {
          return item.price >= 2000000 && item.price < 5000000;
        }
        if (productPriceOption === "5.000.000-10.000.000") {
          return item.price >= 5000000 && item.price < 10000000;
        }
        if (productPriceOption === "10.000.000-20.000.000") {
          return item.price >= 10000000 && item.price < 20000000;
        }
        if (productPriceOption === "Over 20.000.000") {
          return item.price >= 20000000;
        }
      });
    }
    if (productTypeOption !== "all") {
      let filterByType = filterProducts.filter(item => {
        return (
          item.type.toLocaleLowerCase() ===
          productTypeOption.toLocaleLowerCase()
        );
      });
      filterProducts = filterByType;
    }
    if (productCompanyOption !== "all") {
      let filterByCompany = filterProducts.filter(item => {
        return (
          item.company.toLocaleLowerCase() ===
          productCompanyOption.toLocaleLowerCase()
        );
      });
      console.log(filterProducts)
      filterProducts = filterByCompany;
      console.log(filterByCompany)
    }
    this.productsShow = filterProducts;
  }

  onSortProducts(sortType): void {
    let sortProducts = this.productsShow.sort(this.dynamicSort(sortType));
    this.productsShow = sortProducts;
  }

  dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function(a, b) {
      if(property === "price"){
        var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
      }
      var result =
        a[property].toLocaleLowerCase() < b[property].toLocaleLowerCase() ? -1 : a[property].toLocaleLowerCase() > b[property].toLocaleLowerCase() ? 1 : 0;
      return result * sortOrder;
    };
  }
}
