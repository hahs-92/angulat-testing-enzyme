import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
//enviroment
import { environment } from 'src/environments/environment';
//models
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
//services
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //start:proxy o start
  private API_URL = `${environment.API_URL}/api/auth`;
  //global state
  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(email: string, password: string) {
    return this.http
      .post<Auth>(`${this.API_URL}/login`, { email, password })
      .pipe(tap((resp) => this.tokenService.saveToken(resp.access_token)));
  }

  getProfile() {
    // let headers = new HttpHeaders();
    // headers = headers.set('Authorization', `Bearer ${token}`)

    return this.http
      .get<User>(`${this.API_URL}/profile`) // revisa el token y obtiene el usuario
      .pipe(
        //guardar user en el state
        tap((user) => this.user.next(user))
      );
  }

  loginAndGet(email: string, password: string) {
    return this.login(email, password).pipe(switchMap(() => this.getProfile()));
  }

  logout() {
    this.tokenService.removeToken();
  }
}
