import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProducersInterval } from './producers-interval';
import { of, throwError } from 'rxjs';
import { MovieService } from '../../../../core/services/movie.service';

const mockData = {
  max: [{ producer: 'Alisson Omena', interval: 13, previousWin: 2002, followingWin: 2015 }],
  min: [{ producer: 'Bianca Omena', interval: 1, previousWin: 2000, followingWin: 2010 }],
};

describe('ProducersInterval', () => {
  let fixture: ComponentFixture<ProducersInterval>;
  let component: ProducersInterval;
  let movieService: { getProducersInterval: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    movieService = { getProducersInterval: vi.fn().mockReturnValue(of(mockData)) };
 
    await TestBed.configureTestingModule({
      imports: [ProducersInterval],
      providers: [{ provide: MovieService, useValue: movieService }],
    }).compileComponents();
 
    fixture = TestBed.createComponent(ProducersInterval);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Carregando dados de max e min', () => {
    expect(component.max()).toEqual(mockData.max);
    expect(component.min()).toEqual(mockData.min);
    expect(component.loading()).toBe(false);
  });
 
  it('Exibindo produtor com maior intervalo', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Alisson Omena');
  });
 
  it('Exibindo produtor com menor intervalo', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Bianca Omena');
  });
 
  it('Exibindo erro ao carregar dados', () => {
    movieService.getProducersInterval.mockReturnValue(throwError(() => new Error()));
    component.ngOnInit();
    expect(component.loading()).toBe(false);
  });
});
