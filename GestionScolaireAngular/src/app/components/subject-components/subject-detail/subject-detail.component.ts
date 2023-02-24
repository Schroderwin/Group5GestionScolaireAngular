import {Component, Input} from '@angular/core';
import {Subject} from "../../../model/subject.model";
import {TeacherService} from "../../../services/teacher.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SubjectService} from "../../../services/subject.service";

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.css']
})
export class SubjectDetailComponent {

  subject!: Subject;

  constructor(private subS: SubjectService, private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id') || '';
    if (id) {
      this.subS.getOne(Number(id)).subscribe(t => this.subject = t);
    }
  }

  deleteSubject(){
    const id=this.subject.institution.id
    this.subS.delete(this.subject.id)
      .subscribe(v => this.router.navigateByUrl(`/institution/${id}/subject`))
  }

}
