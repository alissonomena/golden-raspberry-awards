import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducersInterval } from './producers-interval';

describe('ProducersInterval', () => {
  let component: ProducersInterval;
  let fixture: ComponentFixture<ProducersInterval>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducersInterval],
    }).compileComponents();

    fixture = TestBed.createComponent(ProducersInterval);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
