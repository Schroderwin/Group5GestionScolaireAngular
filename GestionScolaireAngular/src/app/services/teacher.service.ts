import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Teacher} from "../model/teacher.model";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  url = 'http://localhost:8086/learn/api/classrooms';

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.url);
  }

  getOne(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.url}/${id}`);
  }

  add(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(`${this.url}`, teacher);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
