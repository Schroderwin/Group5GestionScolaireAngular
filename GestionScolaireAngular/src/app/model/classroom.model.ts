import {Subject} from "./subject.model";

export interface Classroom {
  id: number,
  name: string,
  excludedSubject: Subject[],
  capacity: number
}
