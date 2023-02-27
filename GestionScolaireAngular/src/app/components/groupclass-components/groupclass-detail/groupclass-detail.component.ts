import { Component } from '@angular/core';
import {Teacher} from "../../../model/teacher.model";
import {TeacherService} from "../../../services/teacher.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GroupClass} from "../../../model/groupclass.model";
import {GroupClassService} from "../../../services/groupclass.service";

@Component({
  selector: 'app-institution-components-detail',
  templateUrl: './groupclass-detail.component.html',
  styleUrls: ['./groupclass-detail.component.css']
})
export class GroupclassDetailComponent {

  groupClass!: GroupClass;

  teacher!: Teacher;


  constructor(private ts: TeacherService, private activatedRoute: ActivatedRoute,
              private router: Router, private groupServ: GroupClassService) {

  }
  ngOnInit(): void {
    const id=this.activatedRoute.snapshot.paramMap.get('id') || '';
      this.groupServ.getOne(Number(id)).subscribe(grp => this.groupClass = grp);
      if (this.groupClass) {
        this.ts.getOne(this.groupClass.teacher.id).subscribe(t => this.teacher = t);
      }
  }

  deleteGroupClass(){
    const id=this.groupClass.institution.id
    this.groupServ.delete(this.groupClass.id)
      .subscribe(v => this.router.navigateByUrl(`/institution/${id}/group-class`))
  }

}
