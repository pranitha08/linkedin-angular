import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WelcomedetailsService{

  private baseUrl = "http://localhost:8080/profile";

  constructor(private http:HttpClient) {}

  getDetails(userid: any):Observable<any> {
    return this.http.get(`${this.baseUrl}/${userid}`);
  }
  putDetails(id: any, user: any):Observable<any> {
    return this.http.put(`${this.baseUrl}/put/${id}`,user);
  }
}

