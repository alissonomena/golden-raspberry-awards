import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Movies } from './movies';
import { MovieService } from '../../core/services/movie.service';
import { of, throwError } from 'rxjs';

const mockPage = {
  content: [
    { id: 1, year: 1980, title: 'Movie 1', studios: [], producers: [], winner: true },
    { id: 2, year: 1980, title: 'Movie 2', studios: [], producers: [], winner: false },
  ],
  totalElements: 2,
  totalPages: 1,
  number: 0,
  size: 10,
};

describe('Movies', () => {
  let fixture: ComponentFixture<Movies>;
  let component: Movies;
  let movieService: { getMovies: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    movieService = { getMovies: vi.fn().mockReturnValue(of(mockPage)) };

    await TestBed.configureTestingModule({
      imports: [Movies],
      providers: [{ provide: MovieService, useValue: movieService }],
    }).compileComponents();

    fixture = TestBed.createComponent(Movies);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Carregando filmes ao iniciar', () => {
    expect(movieService.getMovies).toHaveBeenCalledWith({
      page: 0,
      size: 10,
      year: undefined,
      winner: undefined,
    });
    expect(component.data()).toEqual(mockPage.content);
    expect(component.totalElements).toBe(2);
  });

  it('Exibindo filmes na tabela', () => {
    const rows = fixture.nativeElement.querySelectorAll('tr.mat-mdc-row');
    expect(rows.length).toBe(2);
  });

  it('Limpando a pagina ao filtrar', () => {
    component.pageIndex = 2;
    component.filterYear = '1980';
    component.onFilterChange();
    expect(component.pageIndex).toBe(0);
    expect(movieService.getMovies).toHaveBeenCalledWith(
      expect.objectContaining({ page: 0, year: 1980 }),
    );
  });

  it('Buscando quando filtro for "true"', () => {
    component.filterWinner = 'true';
    component.onFilterChange();
    expect(movieService.getMovies).toHaveBeenCalledWith(expect.objectContaining({ winner: true }));
  });

  it('Buscando quando filtro for "false"', () => {
    component.filterWinner = 'false';
    component.onFilterChange();
    expect(movieService.getMovies).toHaveBeenCalledWith(expect.objectContaining({ winner: false }));
  });

  it('Mudando a paginacao', () => {
    component.onPageChange({ pageIndex: 1, pageSize: 10, length: 2 } as any);
    expect(component.pageIndex).toBe(1);
    expect(movieService.getMovies).toHaveBeenCalledWith(expect.objectContaining({ page: 1 }));
  });

  it('Exibindo erro ao carregar dados', () => {
    movieService.getMovies.mockReturnValue(throwError(() => new Error()));
    component.loadMovies();
    expect(component.loading()).toBe(false);
  });
});
