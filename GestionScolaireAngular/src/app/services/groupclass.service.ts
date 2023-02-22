import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GroupClass} from "../model/groupclass.model";


@Injectable({
  providedIn: 'root'
})
export class GroupClassService {
  url = 'http://localhost:8086/learn/api/classrooms';

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<GroupClass[]> {
    return this.http.get<GroupClass[]>(this.url);
  }

  getOne(id: number): Observable<GroupClass> {
    return this.http.get<GroupClass>(`${this.url}/${id}`);
  }

  add(groupclass: GroupClass): Observable<GroupClass> {
    return this.http.post<GroupClass>(`${this.url}`, groupclass);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
