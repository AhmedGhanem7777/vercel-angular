import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomReviewsComponent } from './room-reviews.component';

describe('RoomReviewsComponent', () => {
  let component: RoomReviewsComponent;
  let fixture: ComponentFixture<RoomReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomReviewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
