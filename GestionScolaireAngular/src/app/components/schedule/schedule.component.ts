import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent  {
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      // dayGridPlugin,
      timeGridPlugin,
      // listPlugin,
    ],
    headerToolbar: false,
    views: {
      timeGridSixDay: {
        type: 'timeGrid',
        duration: {days: 6},
        // buttonText: '6 day'
      }
    },
    dayHeaderFormat: { weekday: 'long' },
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
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }


  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
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
