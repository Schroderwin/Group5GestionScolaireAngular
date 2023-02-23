import {Subject} from "./subject.model";
import {Type} from "./type.model";

export interface Institution {
  id: number,
  name: string,
  type: Type,
  phone: number,
  logo: string
}
