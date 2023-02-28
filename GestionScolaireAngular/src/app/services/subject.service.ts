import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Subject} from "../model/subject.model";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  url = 'http://localhost:8082/gestionscolaire';

  constructor(private http: HttpClient) {
  }

  public getAll(idInst: number): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.url}/institution/${idInst}/subject`);
  }

  getOne(id: number): Observable<Subject> {
    return this.http.get<Subject>(`${this.url}/subject/${id}`);
  }

  add(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(`${this.url}/subject`, subject);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<any>(`${this.url}/subject/${id}`);
  }
}
