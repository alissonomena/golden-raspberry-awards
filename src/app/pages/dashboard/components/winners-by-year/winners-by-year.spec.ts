import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WinnersByYear } from './winners-by-year';
import { of, throwError } from 'rxjs';
import { MovieService } from '../../../../core/services/movie.service';

const mockMovies = [
  { id: 1, year: 2026, title: 'Movie A', studios: [], producers: [], winner: true },
];

describe('WinnersByYear', () => {
  let fixture: ComponentFixture<WinnersByYear>;
  let component: WinnersByYear;
  let movieService: { getWinnersByYear: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    movieService = { getWinnersByYear: vi.fn().mockReturnValue(of(mockMovies)) };

    await TestBed.configureTestingModule({
      imports: [WinnersByYear],
      providers: [{ provide: MovieService, useValue: movieService }],
    }).compileComponents();

    fixture = TestBed.createComponent(WinnersByYear);
    component = fixture.componentInstance;
    fixture.detectChanges();

    movieService.getWinnersByYear.mockClear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Buscando com ano 2026', () => {
    fixture = TestBed.createComponent(WinnersByYear);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(movieService.getWinnersByYear).toHaveBeenCalledWith(2026);
  });

  it('Buscar vencedores ao chamar search()', () => {
    component.searchYear = '2026';
    component.search();
    expect(movieService.getWinnersByYear).toHaveBeenCalledWith(2026);
    expect(component.loading()).toBe(false);
  });

  it('Nao deve buscar quando ano inválido', () => {
    component.searchYear = 'abc';
    component.search();

    expect(movieService.getWinnersByYear).not.toHaveBeenCalled();
  });

  it('Exibindo filmes na tabela apos busca', () => {
    component.searchYear = '2026';
    component.search();
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tr.mat-mdc-row');
    expect(rows.length).toBe(1);
  });

  it('Exibindo erro ao carregar dados', () => {
    movieService.getWinnersByYear.mockReturnValue(throwError(() => new Error()));
    component.searchYear = '2026';
    component.search();
    expect(component.loading()).toBe(false);
  });
});
