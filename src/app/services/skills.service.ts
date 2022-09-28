import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Skills} from "../skills";

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(private _http: HttpClient) { }
  public addSkills(id: any, user: Skills): Observable<any> {
    return this._http.post<any>(`http://localhost:8080/skills/post/${id}`, user)
  }
  deleteSkill(id: number) {
    return this._http.delete(`http://localhost:8080/skills/${id}`);
  }
}
