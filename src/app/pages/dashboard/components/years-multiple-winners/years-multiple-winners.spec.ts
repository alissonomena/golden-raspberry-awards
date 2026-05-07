import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearsMultipleWinners } from './years-multiple-winners';

describe('YearsMultipleWinners', () => {
  let component: YearsMultipleWinners;
  let fixture: ComponentFixture<YearsMultipleWinners>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearsMultipleWinners],
    }).compileComponents();

    fixture = TestBed.createComponent(YearsMultipleWinners);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
