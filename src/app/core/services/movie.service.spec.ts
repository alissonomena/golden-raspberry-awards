import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { MovieService } from './movie.service';

const API = 'https://challenge.outsera.tech/api/movies';

describe('MovieService', () => {
    let service: MovieService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting()],
        });
        service = TestBed.inject(MovieService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => httpMock.verify());

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('getMovies() chamando API com paginacao e tamanho', () => {
        service.getMovies({ page: 0, size: 10 }).subscribe();

        const req = httpMock.expectOne((r) => r.url === API);
        expect(req.request.params.get('page')).toBe('0');
        expect(req.request.params.get('size')).toBe('10');
        req.flush({ content: [], totalElements: 0, totalPages: 0, number: 0, size: 10 });
    });

    it('getMovies() enviando filtro de ano', () => {
        service.getMovies({ year: 2018 }).subscribe();

        const req = httpMock.expectOne((r) => r.url === API);
        expect(req.request.params.get('year')).toBe('2018');
        req.flush({ content: [], totalElements: 0, totalPages: 0, number: 0, size: 10 });
    });

    it('getMovies() enviando filtro de vencedor', () => {
        service.getMovies({ winner: true }).subscribe();

        const req = httpMock.expectOne((r) => r.url === API);
        expect(req.request.params.get('winner')).toBe('true');
        req.flush({ content: [], totalElements: 0, totalPages: 0, number: 0, size: 10 });
    });

    it('getYearsWithMultipleWinners() chamando API de multiplos vencedores', () => {
        service.getYearsWithMultipleWinners().subscribe();

        const req = httpMock.expectOne(`${API}/yearsWithMultipleWinners`);
        expect(req.request.method).toBe('GET');
        req.flush({ years: [] });
    });

    it('getStudiosWithWinCount() chamando API com contagem de estudios', () => {
        service.getStudiosWithWinCount().subscribe();

        const req = httpMock.expectOne(`${API}/studiosWithWinCount`);
        expect(req.request.method).toBe('GET');
        req.flush({ studios: [] });
    });

    it('getProducersInterval() chamando API de intervalo de produtores', () => {
        service.getProducersInterval().subscribe();

        const req = httpMock.expectOne(`${API}/maxMinWinIntervalForProducers`);
        expect(req.request.method).toBe('GET');
        req.flush({ min: [], max: [] });
    });

    it('getWinnersByYear() enviando filtro de ano', () => {
        service.getWinnersByYear(2018).subscribe();

        const req = httpMock.expectOne((r) => r.url === `${API}/winnersByYear`);
        expect(req.request.params.get('year')).toBe('2018');
        req.flush([]);
    });
});