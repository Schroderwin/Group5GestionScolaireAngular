import { Component } from '@angular/core';
import {InstitutionComponent} from "../institution/institution.component";
import {Institution} from "../../../model/institution.model";
import {InstitutionService} from "../../../services/institution.service";

@Component({
  selector: 'app-institution-list',
  templateUrl: './institution-list.component.html',
  styleUrls: ['./institution-list.component.css']
})
export class InstitutionListComponent {

  institutions: Institution[] = []

  constructor(private is: InstitutionService) {} // il est recommandé de juste déclarer les valeurs ici

  ngOnInit(): void{ // et c'est ici qu'on les initialise ( qu'on leur attribue une valeur )
    this.is.getAll().subscribe(v => this.institutions = v)
  }

}
