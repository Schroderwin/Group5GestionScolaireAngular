import {Teacher} from "./teacher.model";

export interface GroupClass {
  id: number,
  name: string
  mainTeacher: Teacher
}
