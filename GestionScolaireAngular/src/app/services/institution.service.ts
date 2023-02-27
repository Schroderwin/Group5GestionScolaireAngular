import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Institution} from "../model/institution.model";

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {
  url = 'http://localhost:8082/gestionscolaire';

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Institution[]> {
    return this.http.get<Institution[]>(this.url);
  }

  getOne(idInst: number): Observable<Institution> {
    return this.http.get<Institution>(`${this.url}/institution/${idInst}`);
  }

  add(institution: Institution): Observable<Institution> {
    return this.http.post<Institution>(`${this.url}/institution`, institution);
  }

  delete(idInst: number): Observable<void> {
    return this.http.delete<any>(`${this.url}/institution/${idInst}`);
  }
}
