import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProductsComponent } from './products.component';
//components children
import { ProductComponent } from '../product/product.component';
//servicios
import { ProductsService } from '../../services/product.service';
//mocks
import { generateManyProducts } from '../../models/product.mock';
import { By } from '@angular/platform-browser';

fdescribe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  //simulamos el servicio
  let productService: jasmine.SpyObj<ProductsService>;

  beforeEach(async () => {
    //creamos el spy
    const productServiceSpy = jasmine.createSpyObj('ProductService', [
      'getProducts',
    ]);
    await TestBed.configureTestingModule({
      declarations: [
        ProductsComponent,
        //insertar hijo
        ProductComponent,
      ],
      //agregamos el mock
      providers: [{ provide: ProductsService, useValue: productServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    //imjecatmos el mock
    productService = TestBed.inject(
      ProductsService
    ) as jasmine.SpyObj<ProductsService>;
    //hacemos el mock
    const productsMock = generateManyProducts(3);
    productService.getProducts.and.returnValue(of(productsMock));
    //necesitamos el mock antes que se ejecute este metodo
    fixture.detectChanges(); // aqui ya se ejecuta el ngOnit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('test for getProducts', () => {
    it('should be called getProducts', () => {
      expect(productService.getProducts).toHaveBeenCalled();
    });

    it('should return a lis of products', () => {
      //arrange
      const countPrev = component.products.length;
      const productsMock = generateManyProducts(10);
      productService.getProducts.and.returnValue(of(productsMock));
      //act
      component.getAll();
      fixture.detectChanges();
      //assert
      //iniciamos con 3 productos
      expect(component.products.length).toEqual(
        productsMock.length + countPrev
      );
    });

    it('should display 13 app-product components', () => {
      //arrange
      const countPrev = component.products.length;
      const productsMock = generateManyProducts(10);
      productService.getProducts.and.returnValue(of(productsMock));
      //act
      component.getAll();
      fixture.detectChanges();
      const debugElements = fixture.debugElement.queryAll(
        By.css('app-product')
      );
      //assert
      //iniciamos con 3 productos
      expect(debugElements.length).toEqual(productsMock.length + countPrev);
    });
  });
});
