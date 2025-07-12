import { AfterViewInit, Component } from '@angular/core';
import { SlideShow } from './slideshow';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  imports: [SlideShow]
})
export class Home implements AfterViewInit {
  slide1 = ['B-Roll1.jpg', 'B-Roll2.jpg', 'B-Roll3.jpg'];
  slide2 = ['B-Roll4.jpg', 'B-Roll5.jpg', 'B-Roll6.jpg'];
  slide3 = ['B-Roll7.jpg', 'B-Roll8.jpg', 'B-Roll9.jpg'];

  ngAfterViewInit(): void {
    const today = new Date().getDay();
    const specials = document.querySelectorAll("#daily-special .sub-text");

    console.log("Today's day is", today);
    console.log("Found", specials.length, "specials");

    specials.forEach((el) => {
      if (Number(el.getAttribute("data-day")) === today) {
        (el as HTMLElement).classList.add('special-today');
      }
    });
  }
}
