import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Drinks } from './drinks';

describe('Drinks', () => {
  let component: Drinks;
  let fixture: ComponentFixture<Drinks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Drinks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Drinks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
