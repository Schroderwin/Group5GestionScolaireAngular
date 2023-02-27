import {Component, ChangeDetectorRef, OnInit, ViewChild, Injectable} from '@angular/core';
import {CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import {INITIAL_EVENTS, createEventId} from './event-utils';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Teacher} from "../../model/teacher.model";
import {Subject} from "../../model/subject.model";
import {Classroom} from "../../model/classroom.model";
import {TeacherService} from "../../services/teacher.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SubjectService} from "../../services/subject.service";
import {ClassroomService} from "../../services/classroom.service";
/*import bootstrapPlugin from '@fullcalendar/bootstrap5'*/
import {ScheduleService} from "../../services/schedule.service";
import {ScheduleEvent} from "../../model/scheduleevent.model";
import {Time} from "@angular/common";
import {GroupClass} from "../../model/groupclass.model";
import {GroupClassService} from "../../services/groupclass.service";


@Component({
  selector: 'app-root',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class ScheduleComponent {
  calendarVisible = true;
  events: EventInput[] = [];
  /* eventForm = {
     startDay: '',
     startTime: '',
     endTime: '',
     teacher: '',
     subject: '',
     classroom:""
   };*/


  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      // dayGridPlugin,
      timeGridPlugin,
      // bootstrapPlugin
    ],
    themeSystem: 'bootstrap',
    headerToolbar: false,
    views: {
      timeGridSixDay: {
        type: 'timeGrid',
        duration: {days: 6},
        // buttonText: '6 day'
      }
    },

    dayHeaderFormat: {weekday: 'long'},
    initialView: 'timeGridSixDay',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    // weekends: true,
    locale: 'fr',
    editable: true,
    selectable: true,
    selectMirror: true,
    // dayMaxEvents: true,
    initialDate: "2023-01-02",
    slotMinTime: '08:00',
    slotMaxTime: '20:00',
    events: this.events,
    select: this.handleSelect.bind(this),
    /*events: this.calendarEvent,*/
    /*eventClick: this.handleEventClick.bind(this),*/
    /*eventsSet: this.handleEvents.bind(this),*/
    timeZone: 'local',
    eventClick: (info) => {
      const modalRef = this.modalService.open(this.content);
      modalRef.componentInstance.event = info.event;
    },


  };
  /*currentEvents: EventApi[] = [];*/

  // startDay!: String;
  //
  // startTime!: String;
  // endTime!: String;
  beginTime = '';

  endTime = '';
  date = '';

  ourForm!: FormGroup
  formsubmitted = false;

  subjects!: Subject[]
  subject!: Subject

  teachers: Teacher[] = []
  classrooms: Classroom[] = []

  groupClasses: GroupClass[] = []
  groupClass!: GroupClass;
  id!: string;

  scheduleEvent: ScheduleEvent[] = []


  constructor(private changeDetector: ChangeDetectorRef, config: NgbModalConfig, private router: Router,
              private modalService: NgbModal, private ts: TeacherService, private activatedRoute: ActivatedRoute,
              private ss: SubjectService, private cs: ClassroomService, private fb: FormBuilder,
              private ses: ScheduleService, private gs: GroupClassService) {
  }


  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }


  @ViewChild('content') content: any;


  handleSelect(selectInfo: DateSelectArg) {
    // this.formsubmitted = true;
    /*const title = prompt('Please enter a new title for your event');*/
    //this.startDay = new Date(selectInfo.startStr).toLocaleString('fr-FR', { weekday: 'long' });
    this.date = new Date(selectInfo.startStr).toISOString().split('T')[0]
    //this.startTime = new Date(selectInfo.start).getHours();
    this.beginTime = new Date(selectInfo.start).toLocaleTimeString();
    //this.endTime = new Date(selectInfo.end).getHours();
    this.endTime = new Date(selectInfo.end).toLocaleTimeString();
    // this.ourForm.addControl()


    this.ourForm = this.fb.group({
      date: '',
      beginTime: [''],
      endTime: [''],
      teacher: this.fb.group({
        id: ''
      }),
      subject: this.fb.group({
        id: ''
      }),
      groupClass: this.fb.group({
        id: Number(this.id)
      }),
      classroom: this.fb.group({
        id: ''
      })
    })

    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection
    const modalRef = this.modalService.open(this.content);

    // if (this.ourForm.valid) {
    //   /*this.router.navigateByUrl(`/institution/1/group-class/1/schedule`);*/
    //   // this.modalService.dismissAll();
    //   console.log(this.ourForm.value)
    //
    //   this.ses.add(this.ourForm.value).subscribe(t => {
    //     this.modalService.dismissAll();
    //       this.router.navigateByUrl(`/group-class/${this.groupClass.id}/schedule`);
    //     }
    //   )


    // const eventSaved = calendarApi.addEvent({
    //   // id: createEventId(),
    //   // date: this.ourForm.value.subject.startDay,
    //   // beginTime: this.ourForm.value.subject.startTime,
    //   // endTime: this.ourForm.value.subject.endTime,
    //   // teacher: this.ourForm.value.subject.teacher.firstName,
    //   // subject: this.ourForm.value.subject.subject.name,
    //   // groupClass: this.groupClass,
    //   // classroom: this.ourForm.value.subject.classroom.name,
    //
    //   // id: createEventId(),
    //   // title:  this.ourForm.value.subject.name,
    //   // day: this.ourForm.value.subject.startDay,
    //   // start: this.ourForm.value.subject.startTime,
    //   // end: this.ourForm.value.subject.startTime,
    //   // teacher: this.ourForm.value.subject.teacher.firstName,
    //   // subject: this.ourForm.value.subject.subject.name,
    //   // classroom: this.ourForm.value.subject.classroom.name,
    // });
    // console.log(eventSaved)


    // }
  }


  submitForm() {
    if (this.ourForm.valid) {
      /*this.router.navigateByUrl(`/institution/1/group-class/1/schedule`);*/
      // this.modalService.dismissAll();
      console.log(this.ourForm.value)

      this.ses.add(this.ourForm.value).subscribe(t => {
          this.modalService.dismissAll();
          this.router.navigateByUrl(`/group-class/${this.groupClass.id}/schedule`);
        }
      );
    }

  }


  //   // this.id=Number(this.activatedRoute.snapshot.paramMap.get('id') || '');
  //   this.formsubmitted = true
  //   //let teacher:Teacher = this.ourForm.value as Teacher
  //   //teacher.subjects = new Array(this.ourForm.value.subject);
  //   //console.log(teacher.subjects)
  //   if (this.ourForm.valid) {
  //     console.log(this.ourForm.value)
  //     //console.log(teacher)
  //     this.ts.add(this.ourForm.value).subscribe(t => this.router.navigateByUrl(`/institution/${this.id}/teacher`))
  //   }
  //
  //
  // }
  // submitForm() {
  //   this.id=Number(this.activatedRoute.snapshot.paramMap.get('id') || '');
  //   this.formsubmitted = true
  //   let teacher:Teacher = this.ourForm.value as Teacher
  //   teacher.subjects = new Array(this.ourForm.value.subject);
  //   console.log(teacher.subjects)
  //   if (this.ourForm.valid) {
  //     console.log(this.ourForm.value)
  //     console.log(teacher)
  //     this.ts.add(teacher).subscribe(t => this.router.navigateByUrl(`/institution/${id}/teacher`))
  //   }
  //
  //
  // }


  saveEventToLocalStorage(event: any) {
    let events: any[] = JSON.parse(localStorage.getItem('events') || '[]');
    events.push(event);
    localStorage.setItem('events', JSON.stringify(events));
  }


  /* handleEventClick(clickInfo: EventClickArg) {

    /* if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
       clickInfo.event.remove();


     const teacherId = this.ourForm.get('teacher.id')?.value;
     const subjectId = this.ourForm.get('subject.id')?.value;
     const roomId = this.ourForm.get('room.id')?.value;


       this.eventForm={
       title: subjectId,
       start:'start',
       end: 'start',
       teacherId: teacherId,
       roomId: roomId
     };

     const calendarApi = this.fullcalendar.getApi();
     calendarApi.addEvent(this.eventForm);*/


  /*handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();

  }*/

  open(content: any) {

    this.modalService.open(this.content, {centered: true});

  }


  ngOnInit(): void {
    console.log("Hello");
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';

    this.gs.getOne(Number(this.id)).subscribe(c => {
      this.groupClass = c;
      console.log("tests sur l'affichage des teachers")
      this.ts.getAll(this.groupClass.institution.id).subscribe(t => this.teachers = t);
      this.ss.getAll(this.groupClass.institution.id).subscribe(s => this.subjects = s);
      this.cs.getAll(this.groupClass.institution.id).subscribe(c => this.classrooms = c);
      this.gs.getAll(this.groupClass.institution.id).subscribe(c => this.groupClasses = c);
    });
    this.ses.getAll(Number(this.id)).subscribe(s => {
      this.scheduleEvent = s;
      this.calendarOptions.events = this.events;
    });
    this.calendarOptions.events = this.events;
    console.log(this.ses?.getAll(Number(this.id)).subscribe(ses => this.scheduleEvent = ses))
  }


// generer le PDF en utilisant jsPDF et html2canvas pour la capture d'écran
  generatePdf() {

    const doc = new jsPDF();

    const calendarEl = document.getElementById('calendar');

    // @ts-ignore
    html2canvas(calendarEl).then((canvas) => {
      const imgData = canvas.toDataURL('png');
      console.log(imgData)

      doc.addImage(imgData, 'png', 10, 10, 190, 190);

      doc.save('calendrier.pdf');
    });
  }

}
