import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Subject} from "../model/subject.model";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  url = 'http://localhost:8083/gestionscolaire/institution/1/subject';

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.url);
  }

  getOne(id: number): Observable<Subject> {
    return this.http.get<Subject>(`${this.url}/${id}`);
  }

  add(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(`${this.url}`, subject);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
