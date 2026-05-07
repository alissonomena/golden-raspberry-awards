export interface Movie {
    id: number;
    title: string;
    year: number;
    studios: string[];
    producers: string[];
    winner: boolean;
}

export interface MoviePage {
    content: Movie[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}

export interface MovieParams {
    page?: number;
    size?: number;
    year?: number;
    winner?: boolean;
}

export interface YearWinnerCount {
    year: number;
    winnerCount: number;
}

export interface Studio {
    name: string;
    winCount: number;
}

export interface ProducerInterval {
    producer: string;
    interval: number;
    previousWin: number;
    followingWin: number;
}