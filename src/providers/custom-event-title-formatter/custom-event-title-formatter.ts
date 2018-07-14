import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomEventTitleFormatterProvider extends CalendarEventTitleFormatter {

  dayTooltip(event: CalendarEvent): string {
    return;
  }
}
