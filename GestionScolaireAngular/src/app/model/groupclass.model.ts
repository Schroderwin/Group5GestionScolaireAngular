import {Teacher} from "./teacher.model";
import {Institution} from "./institution.model";

export interface GroupClass {
  id: number,
  name: string,
  teacher: Teacher,
  institution: Institution
}
