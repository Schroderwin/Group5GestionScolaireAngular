import { Component } from '@angular/core';
import {Teacher} from "../../../model/teacher.model";
import {TeacherService} from "../../../services/teacher.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Classroom} from "../../../model/classroom.model";
import {ClassroomService} from "../../../services/classroom.service";

@Component({
  selector: 'app-classroom-detail',
  templateUrl: './classroom-detail.component.html',
  styleUrls: ['./classroom-detail.component.css']
})
export class ClassroomDetailComponent {

  classroom!: Classroom;


  constructor(private roomServ: ClassroomService, private activatedRoute: ActivatedRoute,
              private router: Router) {

  }
  ngOnInit(): void {
    const id=this.activatedRoute.snapshot.paramMap.get('id') || '';
    if(id){
      this.roomServ.getOne(Number(id)).subscribe(t => this.classroom = t);
    }
  }

  deleteClassroom(){
    const id=this.classroom.institution.id
    this.roomServ.delete(this.classroom.id)
      .subscribe(v => this.router.navigateByUrl(`/institution/${id}/classroom`))
  }

}
