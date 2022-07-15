import { TestBed } from '@angular/core/testing';
//
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductsService } from './product.service';
//models
import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from '../models/product.models';
import { environment } from '../../environments/environment';
//mocks
import {
  generateManyProducts,
  generateOneProduct,
} from '../models/product.mock';
import { HttpStatusCode } from '@angular/common/http';

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

  afterEach(() => {
    httpController.verify();
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
      // httpController.verify();
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
      // httpController.verify();
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
      // httpController.verify();
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
      // httpController.verify();
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
      // httpController.verify();
    });
  });

  describe('test for create', () => {
    it('should return a new Product', (doneFn) => {
      //arrange
      const dto: CreateProductDTO = {
        title: 'title',
        price: 100,
        images: ['img', 'img2'],
        description: 'this is a description',
        categoryId: 12,
      };
      const mockData: Product = generateOneProduct();
      //act
      service.create(dto).subscribe((data) => {
        //assert
        expect(data).toEqual(mockData);
        doneFn();
      });

      // http config
      const req = httpController.expectOne(
        `${environment.API_URL}/api/v1/products`
      );
      req.flush(mockData);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('POST');

      // httpController.verify();
    });
  });

  describe('test for update product', () => {
    it('should return a new Product updated', (doneFn) => {
      //arrange
      const dto: UpdateProductDTO = {
        title: 'title update',
      };
      const mockData: Product = generateOneProduct();
      const productid = '1';
      //act
      service.update(productid, { ...dto }).subscribe((data) => {
        //assert
        expect(data).toEqual(mockData);
        doneFn();
      });

      // http config
      const req = httpController.expectOne(
        `${environment.API_URL}/api/v1/products/${productid}`
      );
      req.flush(mockData);

      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('PUT');
    });
  });
  describe('test for delete product', () => {
    it('should return a status code 200', (doneFn) => {
      //arrange
      const dto: UpdateProductDTO = {
        title: 'title update',
      };
      const mockData = true;
      const productid = '1';
      //act
      service.delete(productid).subscribe((data) => {
        //assert
        expect(data).toEqual(mockData);
        doneFn();
      });

      // http config
      const req = httpController.expectOne(
        `${environment.API_URL}/api/v1/products/${productid}`
      );
      req.flush(mockData);

      expect(req.request.method).toEqual('DELETE');
    });
  });

  describe('test for get product', () => {
    it('should return a product', (doneFn) => {
      //arrange
      const mockData: Product = generateOneProduct();
      const productid = '1';
      //act
      service.getProduct(productid).subscribe((data) => {
        //assert
        expect(data).toEqual(mockData);
        doneFn();
      });

      // http config
      const req = httpController.expectOne(
        `${environment.API_URL}/api/v1/products/${productid}`
      );
      req.flush(mockData);

      expect(req.request.method).toEqual('GET');
    });

    it('should return right message when statusCode 404', (doneFn) => {
      //arrange
      const messageError = 'El producto no existe';
      const mockError = {
        status: HttpStatusCode.NotFound,
        statusText: messageError,
      };
      const productid = '66';
      //act
      service.getProduct(productid).subscribe({
        error: (error) => {
          //assert
          expect(error).toEqual('Product not Found!');
          doneFn();
        },
      });

      // http config
      const req = httpController.expectOne(
        `${environment.API_URL}/api/v1/products/${productid}`
      );
      req.flush(messageError, mockError);

      expect(req.request.method).toEqual('GET');
    });
  });
});
