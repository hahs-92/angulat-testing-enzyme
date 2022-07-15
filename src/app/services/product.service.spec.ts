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
      const mockData: Product[] = [
        {
          id: '123',
          title: 'test',
          category: {
            id: '1',
            name: 'cat',
          },
          description: 'this is a description',
          price: 1200,
          images: ['img1', 'img2'],
        },
      ];
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
});
