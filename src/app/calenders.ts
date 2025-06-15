import { Component } from '@angular/core';
import { NgFor, DatePipe } from '@angular/common';

@Component({
  selector: 'app-calenders',
  standalone: true,
  imports: [NgFor, DatePipe],
  templateUrl: './calenders.html',
  styleUrl: './calenders.css'
})
export class Calenders {
  currentDate = new Date();
  selectedDate: Date | null = null;

  get monthLabel(): string {
    return this.currentDate.toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });
  }

  get weeks(): Date[][] {
    return this.buildCalendar(this.currentDate);
  }

  previousMonth(): void {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 1,
      1
    );
  }

  nextMonth(): void {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      1
    );
  }

  selectDate(date: Date): void {
    this.selectedDate = date;
  }

  isSelected(date: Date): boolean {
    return (
      this.selectedDate?.toDateString() === date.toDateString()
    );
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return today.toDateString() === date.toDateString();
  }

  private buildCalendar(date: Date): Date[][] {
    const first = new Date(date.getFullYear(), date.getMonth(), 1);
    const last = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const weeks: Date[][] = [];
    const start = new Date(first);
    start.setDate(first.getDate() - first.getDay());

    const current = new Date(start);
    while (current <= last || current.getDay() !== 0) {
      const week: Date[] = [];
      for (let i = 0; i < 7; i++) {
        week.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
      weeks.push(week);
    }
    return weeks;
  }
}
