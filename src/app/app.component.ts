import { Component, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput, Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { formatDate } from '@fullcalendar/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrapPlugin];
  calendarWeekends = false;
  calendarEvents: EventInput[] = [];
  idCount: number = 1;
  crId: any;
  crTitle: any;
  crDate: any;
  dispDate = formatDate('2018-09-01', {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
    timeZoneName: 'short',
    timeZone: 'UTC',
    locale: 'es'
  });

  // Add Click Handler
  handleDateClick(arg: any) {
    this.crDate = arg.date;
    this.dispDate = formatDate(arg.date, {
      month: 'long',
      year: 'numeric',
      day: 'numeric',
      timeZoneName: 'short',
      timeZone: 'IST',
      locale: 'in'
    });
    document.getElementById('addEvent').click();
  }

  // Delete Click Handler
  handleEventClick(arg: any) {
    this.crId = arg.event.id;
    this.crTitle = arg.event.title;
    this.crDate = arg.event.date;
    document.getElementById('deleteEvent').click();
  }

  // Adds Event to the List
  addEvent() {
    this.calendarEvents = this.calendarEvents.concat({
      id: ++this.idCount,
      title: this.crTitle,
      start: this.crDate
    });
    console.log(this.calendarEvents);
    document.getElementById('closeModal').click();
  }

  // Deletes Event from the List 
  deleteEvent() {
    this.calendarEvents.forEach(obj => {
      if (obj.id == this.crId) {
        this.calendarEvents.splice(this.calendarEvents.indexOf(obj), 1);
      }
      console.log(this.calendarEvents);
    });
    document.getElementById('closeDelete').click();
  }

}
