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
  slide1 = ['B-Roll2.jpg', 'B-Roll13.jpeg', 'B-Roll3.jpg', 'B-Roll4.jpeg', 'B-Roll1.jpg'];
  slide2 = ['B-Roll5.jpg', 'B-Roll6.jpg', 'B-Roll7.jpg', 'B-Roll8.jpg', 'B-Roll15.jpg'];
  slide3 = ['B-Roll9.jpg', 'B-Roll10.jpeg', 'B-Roll11.jpeg', 'B-Roll12.jpeg', 'B-Roll14.jpeg'];

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
