import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnersByYear } from './winners-by-year';

describe('WinnersByYear', () => {
  let component: WinnersByYear;
  let fixture: ComponentFixture<WinnersByYear>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WinnersByYear],
    }).compileComponents();

    fixture = TestBed.createComponent(WinnersByYear);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
