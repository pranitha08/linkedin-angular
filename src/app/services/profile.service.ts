import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Details} from "../details";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private _http: HttpClient) {
  }
  public addProfile(id: any, user: any): Observable<any> {
    return this._http.post<any>(`http://localhost:8080/profile/post/${id}`, user)
  }

}
