import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { getISOWeek } from 'date-fns';

@Injectable()
export class CustomDateFormatterProvider extends CalendarDateFormatter {

  public dayViewHour({ date, locale }: DateFormatterParams): string {
    return new DatePipe(locale).transform(date, 'HH:mm', locale);
  }

  public weekViewTitle({ date, locale }: DateFormatterParams): string {
    const year: string = new DatePipe(locale).transform(date, 'y', locale);
    const weekNumber: number = getISOWeek(date);
    return `Week ${weekNumber} in ${year} @FAdienstverlening`;
  }

  public weekViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return new DatePipe(locale).transform(date, 'E', locale);
  }

  public weekViewColumnSubHeader({ date, locale }: DateFormatterParams): string {
    return new DatePipe(locale).transform(date, 'MM/dd', locale);
  }

}
