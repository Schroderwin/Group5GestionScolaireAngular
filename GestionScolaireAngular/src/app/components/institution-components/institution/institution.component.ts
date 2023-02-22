import {Component, Input} from '@angular/core';
import {Institution} from "../../../model/institution.model";

@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.css']
})
export class InstitutionComponent {

  @Input()
  institution!: Institution


}
