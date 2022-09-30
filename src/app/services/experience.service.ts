import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Experience} from "../experience";

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  constructor(private _http: HttpClient) { }
  public addExperience(id: any, experience: any): Observable<any> {
    return this._http.post<any>(`http://localhost:8080/experience/post/${id}`, experience)
  }

  deleteExperience(id: number) {
    return this._http.delete(`http://localhost:8080/experience/${id}`);
  }
  getExperience(id: any):Observable<any> {
    return this._http.get<any>(`http://localhost:8080/experience/get/${id}`);
  }

  editExperience(id: number, experience: any):Observable<any> {
    return this._http.put<any>(`http://localhost:8080/experience/put/${id}`,experience);
  }

}
