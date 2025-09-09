import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-slide-show',
  standalone: true,
  templateUrl: './slideshow.html',
  styleUrls: ['./slideshow.css']
})
export class SlideShow implements OnInit, OnDestroy {
  @Input() images: string[] = [];
  @Input() intervalMs = 8000;   // time each slide is shown
  @Input() fadeMs = 500;        // must match your CSS transition

  currentImage = '';
  currentIndex = 0;
  fade = true;

  private timerId: any;
  private cache = new Map<string, Promise<void>>();

  ngOnInit(): void {
    if (!this.images.length) return;

    this.currentIndex = 0;
    this.currentImage = this.images[0];

    // warm the next image
    this.preload(this.images[1 % this.images.length]);

    this.timerId = setInterval(() => this.next(), this.intervalMs);
  }

  ngOnDestroy(): void {
    if (this.timerId) clearInterval(this.timerId);
  }

  private preload(src?: string): Promise<void> {
    if (!src) return Promise.resolve();
    if (this.cache.has(src)) return this.cache.get(src)!;

    const img = new Image();
    const p = new Promise<void>((resolve) => {
      const done = () => resolve();
      img.onload = done;
      img.onerror = done;
      img.src = src;
      // Use decode() when available; fall back to onload.
      // @ts-ignore
      if (typeof img.decode === 'function') {
        // @ts-ignore
        img.decode().then(done).catch(done);
      }
    });

    this.cache.set(src, p);
    return p;
  }

  private async next(): Promise<void> {
    if (!this.images.length) return;

    const n = (this.currentIndex + 1) % this.images.length;
    const nextSrc = this.images[n];

    // start fade-out and preload in parallel
    this.fade = false;
    const start = performance.now();
    await this.preload(nextSrc);

    // ensure fade-out completed (don’t double-wait if decode was slow)
    const elapsed = performance.now() - start;
    const remaining = Math.max(0, this.fadeMs - elapsed);

    setTimeout(() => {
      this.currentIndex = n;
      this.currentImage = nextSrc;

      // warm the one after that
      this.preload(this.images[(n + 1) % this.images.length]);

      // fade back in on next frame
      requestAnimationFrame(() => (this.fade = true));
    }, remaining);
  }
}
