import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Skills} from "../skills";

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private _http: HttpClient) { }
  public addSkills(id: any, skill: any): Observable<any> {
    return this._http.post<any>(`http://localhost:8080/skills/post/${id}`, skill)
  }
  deleteSkill(id: number) {
    return this._http.delete(`http://localhost:8080/skills/${id}`);
  }
}
