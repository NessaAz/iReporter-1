import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  baseurl=  "http://127.0.0.1:8000/api";
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http:HttpClient) { }

  getAllUsers(): Observable<any>{
    return this.http.get(this.baseurl+'/users/', {headers: this.httpHeaders});
  }
  getOneUser(id:number): Observable<any>{
    return this.http.get(this.baseurl+'/users/' + id + '/', {headers: this.httpHeaders});
  }

  updateUser(user:any): Observable<any>{
    const body = {id:user.id, username: user.username, first_name: user.last_name, email:user.email }
    return this.http.put(this.baseurl+'/users/' + user.id + '/', body,
      {headers: this.httpHeaders});
  }

}
