import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YearsMultipleWinners } from './years-multiple-winners';
import { MovieService } from '../../../../core/services/movie.service';
import { of, throwError } from 'rxjs';

const mockData = { years: [{ year: 2015, winnerCount: 2 }, { year: 2018, winnerCount: 3 }] };

describe('YearsMultipleWinners', () => {
  let fixture: ComponentFixture<YearsMultipleWinners>;
  let component: YearsMultipleWinners;
  let movieService: { getYearsWithMultipleWinners: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    movieService = { getYearsWithMultipleWinners: vi.fn().mockReturnValue(of(mockData)) };
 
    await TestBed.configureTestingModule({
      imports: [YearsMultipleWinners],
      providers: [{ provide: MovieService, useValue: movieService }],
    }).compileComponents();
 
    fixture = TestBed.createComponent(YearsMultipleWinners);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Carregando anos com multiplos vencedores', () => {
    expect(component.data()).toEqual(mockData.years);
    expect(component.loading()).toBe(false);
  });
 
  it('Exibindo anos na tabela', () => {
    const rows = fixture.nativeElement.querySelectorAll('tr.mat-mdc-row');
    expect(rows.length).toBe(2);
  });
 
  it('Exibindo erro ao carregar dados', () => {
    movieService.getYearsWithMultipleWinners.mockReturnValue(throwError(() => new Error()));
    component.ngOnInit();
    expect(component.loading()).toBe(false);
  });
});
