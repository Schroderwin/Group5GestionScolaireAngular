import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Institution} from "../model/institution.model";

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {
  url = 'http://localhost:8086/learn/api/classrooms';

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Institution[]> {
    return this.http.get<Institution[]>(this.url);
  }

  getOne(id: number): Observable<Institution> {
    return this.http.get<Institution>(`${this.url}/${id}`);
  }

  add(institution: Institution): Observable<Institution> {
    return this.http.post<Institution>(`${this.url}`, institution);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
