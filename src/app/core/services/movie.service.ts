import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Movie, MoviePage, MovieParams, ProducerInterval, Studio, YearWinnerCount } from "../models/movie.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
    private readonly API_URL = 'https://challenge.outsera.tech/api/movies';

    private readonly http = inject(HttpClient);

    /**
     * Método para buscar filmes com base nos parâmetros fornecidos.
     */
    getMovies(params: MovieParams = {}): Observable<MoviePage> {
        let httpParams = new HttpParams()
            .set('page', params.page ?? 0)
            .set('size', params.size ?? 10);

        if (params.year !== undefined) {
            httpParams = httpParams.set('year', params.year);
        }

        if(params.winner !== undefined) {
            httpParams = httpParams.set('winner', params.winner);
        }

        return this.http.get<MoviePage>(this.API_URL, { params: httpParams });
    }

    /**
     * Método para buscar os anos que tiveram mais de um vencedor.
     */
    getYearsWithMultipleWinners(): Observable<{ years: YearWinnerCount[] }> {
        return this.http.get<{ years: YearWinnerCount[] }>(`${this.API_URL}/yearsWithMultipleWinners`);
    }

    /**
     * Método para buscar os estúdios e a quantidade de vezes que eles ganharam.
     */
    getStudiosWithWinCount(): Observable<{ studios: Studio[] }> {
        return this.http.get<{ studios: Studio[] }>(`${this.API_URL}/studiosWithWinCount`);
    }

    /**
     * Método para buscar os produtores com os maiores e menores intervalos entre vitórias.
     */
    getProducersInterval(): Observable<{ min: ProducerInterval[], max: ProducerInterval[] }> {
        return this.http.get<{ min: ProducerInterval[], max: ProducerInterval[] }>(`${this.API_URL}/maxMinWinIntervalForProducers`);
    }

    /**
     * Método para buscar os filmes vencedores de um ano específico.
     */
    getWinnersByYear(year: number): Observable<Movie[]> {
        let httpParams = new HttpParams()
            .set('year', year);
        return this.http.get<Movie[]>(`${this.API_URL}/winnersByYear`, { params: httpParams });
    }

}