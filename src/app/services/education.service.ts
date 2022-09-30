import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Education} from "../education";
import {Address} from "../address";

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  constructor(private _http: HttpClient) { }
  public addEducation(id: any, education: any): Observable<any> {
    return this._http.post<any>(`http://localhost:8080/education/post/${id}`, education)
  }
  deleteEducation(id: number) {
    return this._http.delete(`http://localhost:8080/education/${id}`);
  }
  getEducation(id: any):Observable<any> {
    return this._http.get<any>(`http://localhost:8080/education/get/${id}`);
  }

  editEducation(id: number, education: any):Observable<any> {
    return this._http.put<any>(`http://localhost:8080/education/put/${id}/`,education);
  }

}
