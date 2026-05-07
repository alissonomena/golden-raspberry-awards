import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopStudios } from './top-studios';
import { MovieService } from '../../../../core/services/movie.service';
import { of, throwError } from 'rxjs';

const mockData = {
  studios: [
    { name: 'Columbia', winCount: 7 },
    { name: 'Paramount', winCount: 6 },
    { name: 'Warner', winCount: 5 },
    { name: 'Universal', winCount: 3 }
  ]
};

describe('TopStudios', () => {
  let fixture: ComponentFixture<TopStudios>;
  let component: TopStudios;
  let movieService: { getStudiosWithWinCount: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    movieService = { getStudiosWithWinCount: vi.fn().mockReturnValue(of(mockData)) };
 
    await TestBed.configureTestingModule({
      imports: [TopStudios],
      providers: [{ provide: MovieService, useValue: movieService }],
    }).compileComponents();
 
    fixture = TestBed.createComponent(TopStudios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Exibindo os 3 primeiros estúdios', () => {
    expect(component.data().length).toBe(3);
  });
 
  it('Exibindo estúdios corretos', () => {
    expect(component.data()[0].name).toBe('Columbia');
    expect(component.data()[2].name).toBe('Warner');
  });
 
  it('Exibindo erro ao carregar dados', () => {
    movieService.getStudiosWithWinCount.mockReturnValue(throwError(() => new Error()));
    component.ngOnInit();
    expect(component.loading()).toBe(false);
  });
});
