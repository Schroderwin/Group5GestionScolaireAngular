import {Subject} from "./subject.model";

export interface Teacher {
  id: number,
  firstName: string,
  lastName: string,
  birthDate: Date,
  subjects: Subject[]
}
