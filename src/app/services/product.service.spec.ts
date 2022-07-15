import { TestBed } from '@angular/core/testing';
//
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductsService } from './product.service';
//models
import { Product } from '../models/product.models';
import { environment } from '../../environments/environment';
//mocks
import {
  generateManyProducts,
  generateOneProduct,
} from '../models/product.mock';

fdescribe('test for ProductService', () => {
  let service: ProductsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      //agregamos el contexo
      imports: [HttpClientTestingModule],
      //injectamos el modulo
      providers: [ProductsService],
    });

    service = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('tests for getAllSimple', () => {
    it('should return a product list', (doneFn) => {
      //arrange
      const mockData: Product[] = generateManyProducts();
      //act
      service.getAllSimple().subscribe((data) => {
        //assert
        expect(data).toEqual(mockData);
        doneFn();
      });

      // http config
      const req = httpController.expectOne(
        `${environment.API_URL}/api/v1/products`
      );
      req.flush(mockData);
      httpController.verify();
    });
  });

  describe('tests for getProducts', () => {
    it('should return a product list', (doneFn) => {
      //arrange
      const mockData: Product[] = generateManyProducts();
      //act
      service.getProducts().subscribe((data) => {
        //assert
        // expect(data).toEqual(mockData); // hace un analisis profundo
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });

      // http config
      const req = httpController.expectOne(
        `${environment.API_URL}/api/v1/products`
      );
      req.flush(mockData);
      httpController.verify();
    });

    it('should return list with taxes', (doneFn) => {
      //arrange
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
          price: 100,
        },
        {
          ...generateOneProduct(),
          price: 120,
        },
      ];
      //act
      service.getProducts().subscribe((data) => {
        //assert
        expect(data.length).toEqual(mockData.length);
        expect(data[0].taxes).toEqual(19);
        doneFn();
      });

      // http config
      const req = httpController.expectOne(
        `${environment.API_URL}/api/v1/products`
      );
      req.flush(mockData);
      httpController.verify();
    });

    it('should return list with taxes when price is less to o', (doneFn) => {
      //arrange
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
          price: 100,
        },
        {
          ...generateOneProduct(),
          price: 0,
        },
        {
          ...generateOneProduct(),
          price: -1,
        },
      ];
      //act
      service.getProducts().subscribe((data) => {
        //assert
        expect(data[0].taxes).toEqual(19);
        expect(data[1].taxes).toEqual(0);
        expect(data[2].taxes).toEqual(0);
        doneFn();
      });

      // http config
      const req = httpController.expectOne(
        `${environment.API_URL}/api/v1/products`
      );
      req.flush(mockData);
      httpController.verify();
    });

    it('should send query params with limit 10 and offset 3', (doneFn) => {
      //arrange
      const mockData: Product[] = generateManyProducts();
      const limit = 10;
      const offset = 3;
      //act
      service.getProducts(limit, offset).subscribe((data) => {
        //assert
        // expect(data).toEqual(mockData); // hace un analisis profundo
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });

      // http config
      const req = httpController.expectOne(
        `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`
      );
      req.flush(mockData);
      const params = req.request.params;

      expect(params.get('limit')).toEqual(`${limit}`);
      expect(params.get('offset')).toEqual(`${offset}`);
      httpController.verify();
    });
  });
});
