import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Teacher} from "../model/teacher.model";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  url = 'http://localhost:8082/gestionscolaire';

  constructor(private http: HttpClient) {
  }

  public getAll(idInst: number): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${this.url}/institution/${idInst}/teacher`);
  }

  getOne(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.url}/teacher/${id}`);
  }

  add(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(`${this.url}/teacher`, teacher);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<any>(`${this.url}/teacher/${id}`);
  }
}
