import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../user";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private _http:HttpClient) { }
  public loginUserfromRemote(user :any):Observable<any>{
    return this._http.post<any>("http://localhost:8080/user/login",user)
  }
  public registerUserFromRemote(user :any):Observable<any>{
    return this._http.post<any>("http://localhost:8080/user/register",user)
  }
}
