import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpInterceptor, HttpHeaders, HttpRequest, HttpHandler, HttpEvent,HttpResponse } from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';
// import { User } from '../interface/user';
import { tap, shareReplay } from 'rxjs/operators';
import jwtDecode from 'jwt-decode';
import * as moment from 'moment';
const options = {
  headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + localStorage.getItem("access_token"))
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  base_url = "http://127.0.0.1:8000"
  constructor(private http:HttpClient) { }
  registerUser(userData:any): Observable<any>{
    return this.http.post('http://127.0.0.1:8000/api/client', userData);
  }
  registerAdmin(userData:any): Observable<any>{
    return this.http.post('http://127.0.0.1:8000/api/admin', userData);
  }
  private setSession(access_token:string) {
    const payload = jwtDecode <JWTPayload>(access_token);
    const expiresAt = moment.unix(payload.exp);
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }
  get token(): string {
    return localStorage.getItem('access_token')|| '{}';
  }
  get refresh_token(): string {
    return localStorage.getItem('refresh_token')|| '{}';
  }
  login(userPayLoad :any ) {
    const url = this.base_url+"/api/token";
    const options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }
    return this.http.post(url, userPayLoad, options);
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }
  refreshToken() {
    if (moment().isBetween(this.getExpiration().subtract(1, 'days'), this.getExpiration())) {
      this.http.post<refreshResponse>('${this.base_url}/api/token/refresh/',{refresh: this.refresh_token})
      .pipe(
        tap(response => this.setSession(response.access)),
        shareReplay(),
      ).subscribe();
    }
  }
  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration!);
    return moment(expiresAt);
  }
  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }
  isLoggedOut() {
    return !this.isLoggedIn();
  }
}
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'JWT '.concat(access_token))
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate() {
    if (this.authService.isLoggedIn()) {
      this.authService.refreshToken();
      return true;
    } else {
      this.authService.logout();
      this.router.navigate(['login']);
      return false;
    }
  }
}
interface JWTPayload {
  user_id: number;
  username: string;
  email: string;
  exp: number;
}
interface refreshResponse {
  access: string;
  refresh: string;
}
interface User{
  id: number,
  username: string,
  first_name: string,
  last_name: string,
  email: string,
}