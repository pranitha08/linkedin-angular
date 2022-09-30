import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Address} from "../address";

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private _http: HttpClient) {
  }
  public addAddress(id: any, address: any): Observable<any> {
    return this._http.post<any>(`http://localhost:8080/address/post/${id}`, address)
  }

  getAddress(userid: any):Observable<any> {
    return this._http.get<any>(`http://localhost:8080/address/${userid}`);
  }

  putAddress(id: any, address: any):Observable<any> {
    return this._http.put<any>(`http://localhost:8080/address/put/${id}/`,address);
  }
}
