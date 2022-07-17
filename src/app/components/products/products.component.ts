import { Component, OnInit } from '@angular/core';
//services
import { ProductsService } from 'src/app/services/product.service';
//models
import { Product } from 'src/app/models/product.models';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  limit = 10;
  offset = 0;
  status: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.status = 'loading';

    this.productsService
      .getProducts(this.limit, this.offset)
      .subscribe((products) => {
        this.products = [...this.products, ...products];
        this.offset += this.limit;
        this.status = 'success';
      });
  }
}
