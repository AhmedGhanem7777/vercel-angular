import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularAdsComponent } from './popular-ads.component';

describe('PopularAdsComponent', () => {
  let component: PopularAdsComponent;
  let fixture: ComponentFixture<PopularAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopularAdsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopularAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
