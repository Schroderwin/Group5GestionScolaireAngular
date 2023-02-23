import {Institution} from "./institution.model";

export interface Subject {
  id: number,
  name: string,
  color: string

  institution: Institution;
}
