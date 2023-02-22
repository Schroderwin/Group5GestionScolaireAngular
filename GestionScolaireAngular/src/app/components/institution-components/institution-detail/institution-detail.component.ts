import { Component } from '@angular/core';
import {Institution} from "../../../model/institution.model";
import {ActivatedRoute, Router} from "@angular/router";
import {InstitutionService} from "../../../services/institution.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-institution-detail',
  templateUrl: './institution-detail.component.html',
  styleUrls: ['./institution-detail.component.css']
})
export class InstitutionDetailComponent {

  institution!: Institution

  constructor(private route:ActivatedRoute,
              private is: InstitutionService,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    console.log("Je suis dans le init")
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.is.getOne(Number(id)).subscribe(p => this.institution = p)
    }
  }

  deleteInstitution(){
    this.is.delete(this.institution.id)
      .subscribe(v => this.router.navigateByUrl('/institution'))
  }

}
