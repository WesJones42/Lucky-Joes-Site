import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-calenders',
  standalone: true,
  imports: [NgFor],
  templateUrl: './calenders.html',
  styleUrl: './calenders.css'
})
export class Calenders {
  currentDate = new Date();

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
