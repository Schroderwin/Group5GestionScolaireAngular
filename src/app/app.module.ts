import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, RouterOutlet, Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { InstitutionComponent } from './components/institution-components/institution/institution.component';
import { InstitutionListComponent } from './components/institution-components/institution-list/institution-list.component';
import { InstitutionDetailComponent } from './components/institution-components/institution-detail/institution-detail.component';
import { ClassroomComponent } from './components/classroom-components/classroom/classroom.component';
import { ClassroomListComponent } from './components/classroom-components/classroom-list/classroom-list.component';
import { ClassroomDetailComponent } from './components/classroom-components/classroom-detail/classroom-detail.component';
import { GroupclassComponent } from './components/groupclass-components/groupclass/groupclass.component';
import { GroupclassListComponent } from './components/groupclass-components/groupclass-list/groupclass-list.component';
import { GroupclassDetailComponent } from './components/groupclass-components/groupclass-detail/groupclass-detail.component';
import { SubjectComponent } from './components/subject-components/subject/subject.component';
import { SubjectListComponent } from './components/subject-components/subject-list/subject-list.component';
import { SubjectDetailComponent } from './components/subject-components/subject-detail/subject-detail.component';
import { TeacherComponent } from './components/teacher-components/teacher/teacher.component';
import { TeacherListComponent } from './components/teacher-components/teacher-list/teacher-list.component';
import { TeacherDetailComponent } from './components/teacher-components/teacher-detail/teacher-detail.component';


const routes : Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'institution', component: InstitutionListComponent},
  {path: 'institution/:id', component: InstitutionDetailComponent},
  {path: 'institution/:id/classroom', component: ClassroomListComponent},
  {path: 'institution/:id/classroom/:id', component: ClassroomDetailComponent},
  {path: 'institution/:id/group-class', component: GroupclassListComponent},
  {path: 'institution/:id/group-class/:id', component: GroupclassDetailComponent},
  {path: 'institution/:id/subject', component: SubjectListComponent},
  {path: 'institution/:id/subject/:id', component: SubjectDetailComponent},
  {path: 'institution/:id/teacher', component: TeacherListComponent},
  {path: 'institution/:id/teacher/:id', component: TeacherDetailComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    InstitutionComponent,
    InstitutionListComponent,
    InstitutionDetailComponent,
    ClassroomComponent,
    ClassroomListComponent,
    ClassroomDetailComponent,
    GroupclassComponent,
    GroupclassListComponent,
    GroupclassDetailComponent,
    SubjectComponent,
    SubjectListComponent,
    SubjectDetailComponent,
    TeacherComponent,
    TeacherListComponent,
    TeacherDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterModule.forRoot(routes),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
