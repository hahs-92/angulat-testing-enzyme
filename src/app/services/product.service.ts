import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { retry, catchError, map, switchMap } from 'rxjs/operators';
import { throwError, zip } from 'rxjs';
//models
import { Product } from '../models/product.models';
import { CreateProductDTO } from '../models/product.models';
import { UpdateProductDTO } from '../models/product.models';
//enviroments
import { environment } from '../../environments/environment';
//interceptors - context
// import { checkTime } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  //start:proxy o start
  private API_URL = `${environment.API_URL}/api/v1`;

  constructor(private http: HttpClient) {}

  getProducts(limit?: number, offset?: number) {
    let params = new HttpParams();

    if (limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http
      .get<Product[]>(`${this.API_URL}/products`, {
        params,
        // context: checkTime(),
      }) //context => checkTime
      .pipe(
        retry(3),
        map((products) =>
          products.map((item) => {
            return {
              ...item,
              taxes: item.price * 0.19,
            };
          })
        )
      ); // tambien tiene retryWhen
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.API_URL}/products/${id}`).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === HttpStatusCode.InternalServerError) {
          return throwError(() => 'Something was wrong!, Try again later');
        }

        if (err.status === HttpStatusCode.NotFound) {
          return throwError(() => 'Product not Found!');
        }

        return throwError(() => 'Something was wrong!, Try again later');
      })
    );
  }

  create(dto: CreateProductDTO) {
    return this.http.post<Product>(`${this.API_URL}/products`, dto);
  }

  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.API_URL}/products/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.API_URL}/products/${id}`);
  }

  //example como equivar el callback hell
  //equivalente al Promises-all() en promesas
  //no dependen una de otra
  fetchReadAndUpdate(id: string, dto: UpdateProductDTO) {
    return zip(this.getProduct(id), this.update(id, dto));
  }

  //equivalente en promesas al then()
  fetchReadAndUpdateWithDependecy(id: string, dto: UpdateProductDTO) {
    return this.getProduct(id).pipe(
      switchMap((product) => this.update(product.id, dto))
    );
  }

  getByCategory(categoryId: string, limit?: number, offset?: number) {
    let params = new HttpParams();

    if (limit && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }

    return this.http.get<Product[]>(
      `${this.API_URL}/categories/${categoryId}/products`,
      { params }
    );
  }

  getAllSimple() {
    return this.http.get<Product[]>(`${this.API_URL}/products`);
  }
}
