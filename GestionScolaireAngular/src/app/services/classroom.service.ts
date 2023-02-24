import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Classroom} from "../model/classroom.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  url = 'http://localhost:8083/gestionscolaire';

  constructor(private http: HttpClient) {
  }

  public getAll(idInst: number): Observable<Classroom[]> {
    return this.http.get<Classroom[]>(`${this.url}/institution/${idInst}/classroom`);
  }

  getOne(id: number): Observable<Classroom> {
    return this.http.get<Classroom>(`${this.url}/classroom/${id}`);
  }

  add(classroom: Classroom): Observable<Classroom> {
    return this.http.post<Classroom>(`${this.url}/classroom`, classroom);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<any>(`${this.url}/classroom/${id}`);
  }
}
