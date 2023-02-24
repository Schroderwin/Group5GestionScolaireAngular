import {Component, OnInit} from '@angular/core';
import {Teacher} from "../../../model/teacher.model";
import {TeacherService} from "../../../services/teacher.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.css']
})
export class TeacherDetailComponent implements OnInit {

  teacher!: Teacher;


  constructor(private ts: TeacherService, private activatedRoute: ActivatedRoute,
              private router: Router,) {

  }
  ngOnInit(): void {
    const id=this.activatedRoute.snapshot.paramMap.get('id') || '';
    if(id){
      this.ts.getOne(Number(id)).subscribe(t => this.teacher = t);
    }
  }

  deleteTeacher(){
    this.ts.delete(this.teacher.id)
      .subscribe(v => this.router.navigateByUrl('/institution'))
  }


}


