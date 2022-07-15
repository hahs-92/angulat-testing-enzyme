import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
//model
import { Auth } from '../models/auth.model';

import { AuthService } from './auth.service';
import { TokenService } from './token.service';

fdescribe('Auth Service', () => {
  let service: AuthService;
  let httpController: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      //injectamos el modulo
      providers: [AuthService, TokenService],
    });

    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be create', () => {
    expect(service).toBeTruthy();
  });

  describe('test for login', () => {
    it('should return token', (doneFn) => {
      const mockData: Auth = { access_token: '1223' };
      const email = 'alex92@email.com';
      const password = '666';

      service.login(email, password).subscribe((data) => {
        expect(data).toEqual(mockData);
        doneFn();
      });

      // http config
      const req = httpController.expectOne(
        `${environment.API_URL}/api/auth/login`
      );
      req.flush(mockData);
    });

    it('should return token and save it', (doneFn) => {
      const mockData: Auth = { access_token: '1223' };
      const email = 'alex92@email.com';
      const password = '666';
      spyOn(tokenService, 'saveToken').and.callThrough(); // espia y no ejecuta el metodo cuando no devuelve nada

      service.login(email, password).subscribe((data) => {
        expect(data).toEqual(mockData);
        expect(tokenService.saveToken).toHaveBeenCalled();
        expect(tokenService.saveToken).toHaveBeenCalledTimes(1);
        expect(tokenService.saveToken).toHaveBeenCalledOnceWith('1223');
        doneFn();
      });

      // http config
      const req = httpController.expectOne(
        `${environment.API_URL}/api/auth/login`
      );
      req.flush(mockData);
    });
  });
});
