import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { of, defer } from 'rxjs';
import { ProductsComponent } from './products.component';
//components children
import { ProductComponent } from '../product/product.component';
//servicios
import { ProductsService } from '../../services/product.service';
import { ValueService } from 'src/app/services/value.service';
//mocks
import { generateManyProducts } from '../../models/product.mock';
import { By } from '@angular/platform-browser';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  //simulamos el servicio
  let productService: jasmine.SpyObj<ProductsService>;
  let valueService: jasmine.SpyObj<ValueService>;

  beforeEach(async () => {
    //creamos el spy
    const productServiceSpy = jasmine.createSpyObj('ProductsService', [
      'getProducts',
    ]);
    const valueServiceSpy = jasmine.createSpyObj('valueService', [
      'getPromiseValue',
    ]);

    await TestBed.configureTestingModule({
      declarations: [
        ProductsComponent,
        //insertar hijo
        ProductComponent,
      ],
      //agregamos el mock
      providers: [
        { provide: ProductsService, useValue: productServiceSpy },
        {
          provide: ValueService,
          useValue: valueServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    //imjecatmos el mock
    productService = TestBed.inject(
      ProductsService
    ) as jasmine.SpyObj<ProductsService>;
    valueService = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
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
      const btnDebug = fixture.debugElement.query(By.css('.loadMore'));
      productService.getProducts.and.returnValue(of(productsMock));
      //act
      btnDebug.triggerEventHandler('click', null);
      // component.getAll();
      fixture.detectChanges();
      const debugElements = fixture.debugElement.queryAll(
        By.css('app-product')
      );
      //assert
      //iniciamos con 3 productos
      expect(debugElements.length).toEqual(productsMock.length + countPrev);
    });

    //envolvemos nuestra callback en un fakeasync
    it('should change the status "loading" to "success"', fakeAsync(() => {
      //arrange
      const productsMock = generateManyProducts(10);
      const btnDebug = fixture.debugElement.query(By.css('.loadMore'));
      //vamos a retornar algo especifico y que lo resuleva en momento dado
      //con defer puede controlar un tiempo d eespera
      productService.getProducts.and.returnValue(
        defer(() => Promise.resolve(productsMock))
      );
      //act
      btnDebug.triggerEventHandler('click', null);
      // component.getAll(); // esta no es la mejor manera
      fixture.detectChanges();
      //assert
      expect(component.status).toEqual('loading');
      tick(); //ejecuta todo lo que este pednidente que se a async (defer)(setTineout)(promise)
      fixture.detectChanges();
      expect(component.status).toEqual('success');
    }));

    it('should change the status "loading" to "error"', fakeAsync(() => {
      //arrange
      productService.getProducts.and.returnValue(
        defer(() => Promise.reject('error'))
      );
      //act
      component.getAll();
      fixture.detectChanges();
      //assert
      expect(component.status).toEqual('loading');
      tick(4000); //para el setTiemout
      fixture.detectChanges();
      expect(component.status).toEqual('error');
    }));
  });

  describe('test for callPromise ', () => {
    it('should call to promise', async () => {
      //arrange
      const mockMsg = 'my message';
      valueService.getPromiseValue.and.returnValue(Promise.resolve(mockMsg));
      //act
      //lo mejor es simular que el usuario llame este metodo
      await component.callPromise();
      fixture.detectChanges();
      //assert
      expect(component.rta).toEqual(mockMsg);
      expect(valueService.getPromiseValue).toHaveBeenCalled();
    });

    it('should show "my message" when button is clicked', fakeAsync(() => {
      //arrange
      const mockMsg = 'my message';
      valueService.getPromiseValue.and.returnValue(Promise.resolve(mockMsg));
      const btnDebug = fixture.debugElement.query(By.css('.btn-promise'));
      //act
      btnDebug.triggerEventHandler('click', null);
      tick(); //resolvemos la promesa
      fixture.detectChanges();
      const pDebug = fixture.debugElement.query(By.css('p.rta'));
      //assert
      expect(component.rta).toEqual(mockMsg);
      expect(valueService.getPromiseValue).toHaveBeenCalled();
      expect(pDebug.nativeElement.textContent).toEqual(mockMsg);
    }));
  });
});
