import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Dashboard } from './dashboard';
import { MovieService } from '../../core/services/movie.service';
import { of } from 'rxjs';

describe('Dashboard', () => {
  let fixture: ComponentFixture<Dashboard>;

  beforeEach(async () => {
    const movieService = {
      getYearsWithMultipleWinners: vi.fn().mockReturnValue(of({ years: [] })),
      getStudiosWithWinCount: vi.fn().mockReturnValue(of({ studios: [] })),
      getProducersInterval: vi.fn().mockReturnValue(of({ min: [], max: [] })),
      getWinnersByYear: vi.fn().mockReturnValue(of([])),
    };
 
    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [{ provide: MovieService, useValue: movieService }],
    }).compileComponents();
 
    fixture = TestBed.createComponent(Dashboard);
    fixture.detectChanges();
  });
 
  it('should be created', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renderizando os 4 paineis', () => {
    const el = fixture.nativeElement;
    expect(el.querySelector('app-years-multiple-winners')).toBeTruthy();
    expect(el.querySelector('app-top-studios')).toBeTruthy();
    expect(el.querySelector('app-producers-interval')).toBeTruthy();
    expect(el.querySelector('app-winners-by-year')).toBeTruthy();
  });
});
