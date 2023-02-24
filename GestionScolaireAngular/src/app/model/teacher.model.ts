import {Subject} from "./subject.model";
import {Institution} from "./institution.model";
import {GroupClass} from "./groupclass.model";

export interface Teacher {
  id: number,
  firstName: string,
  lastName: string,
  birthDate: Date,
  subjects: Subject[]

  groupClass: GroupClass;

  institution: Institution;
}
