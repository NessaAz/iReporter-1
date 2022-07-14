import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  baseurl=  "http://127.0.0.1:8000/api";
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http:HttpClient) { }
  getAllRedFlags(): Observable<any>{
    return this.http.get(this.baseurl+'/redflags/', {headers: this.httpHeaders});
  }

  getOneRedFlag(id:number): Observable<any>{
    return this.http.get(this.baseurl+'/redflags/' + id + '/', {headers: this.httpHeaders});
  }

  updateRedFlag(redflag:any): Observable<any>{
    const body = {title: redflag.title, info:redflag.info, location:redflag.location }
    return this.http.put(this.baseurl+'/redflags/' + redflag.id + '/', body,
      {headers: this.httpHeaders});
  }

  createRedFlag(redflag:any): Observable<any>{
    const body = {image: redflag.image, title: redflag.title, info:redflag.info, location:redflag.location }
    return this.http.post(this.baseurl+'/redflags/', body,{headers: this.httpHeaders});
  }

  deleteRedFlag(id:any): Observable<any> {
    return this.http.delete(this.baseurl + '/redflags/' + id + '/',
      {headers: this.httpHeaders});
  }
  getAllIntervention(): Observable<any>{
    return this.http.get(this.baseurl+'/interventions/', {headers: this.httpHeaders});
  }

  getOneIntervention(id:number): Observable<any>{
    return this.http.get(this.baseurl+'/interventions/' + id + '/', {headers: this.httpHeaders});
  }

  updateIntervention(intervention:any): Observable<any>{
    const body = {title: intervention.title, info:intervention.info, location:intervention.location }
    return this.http.put(this.baseurl+'/interventions/' + intervention.id + '/', body,
      {headers: this.httpHeaders});
  }

  createIntervention(intervention:any): Observable<any>{
    const body = {image: intervention.image, title: intervention.title, info:intervention.info, location:intervention.location }
    return this.http.post(this.baseurl+'/interventions', body,{headers: this.httpHeaders});
  }

  deleteIntervention(id:any): Observable<any> {
    return this.http.delete(this.baseurl + '/interventions/' + id + '/',
      {headers: this.httpHeaders});
  }

}
