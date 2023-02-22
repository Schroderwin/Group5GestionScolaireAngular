import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Classroom} from "../model/classroom.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  url = 'http://localhost:8086/learn/api/classrooms';

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Classroom[]> {
    return this.http.get<Classroom[]>(this.url);
  }

  getOne(id: number): Observable<Classroom> {
    return this.http.get<Classroom>(`${this.url}/${id}`);
  }

  add(classroom: Classroom): Observable<Classroom> {
    return this.http.post<Classroom>(`${this.url}`, classroom);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
