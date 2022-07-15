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

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.productsService.getAllSimple().subscribe((products) => {
      this.products = products;
    });
  }
}
