import { Component, OnInit } from '@angular/core';
//services
import { ProductsService } from 'src/app/services/product.service';
import { ValueService } from 'src/app/services/value.service';
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
  rta = '';

  constructor(
    private productsService: ProductsService,
    private valueService: ValueService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.status = 'loading';

    this.productsService.getProducts(this.limit, this.offset).subscribe({
      next: (products) => {
        this.products = [...this.products, ...products];
        this.offset += this.limit;
        this.status = 'success';
      },
      error: (error) => {
        //solo para efectos del test course
        setTimeout(() => {
          this.products = [];
          this.status = 'error';
        }, 3000);
      },
    });
  }

  async callPromise() {
    const rta = await this.valueService.getPromiseValue();
    this.rta = rta;
  }
}
