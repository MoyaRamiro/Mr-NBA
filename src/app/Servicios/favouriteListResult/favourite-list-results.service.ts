import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Game } from 'src/app/types/Games';

@Injectable({
  providedIn: 'root',
})
export class FavouriteListResultsService {
  private apiUrl = 'https://api.balldontlie.io/v1/games';
  private apiKey = 'c90e56f5-b8a8-454c-bdd9-d9dc13b3ea33';
  private recentResultsCache: { [teamId: number]: Game[] } = {};

  constructor(private http: HttpClient) {}

    private headers: HttpHeaders = new HttpHeaders({
      'Authorization': `${this.apiKey}`
    });

  getResultsByTeamId(teamId: number): Observable<Game[]> {
    const resultsUrl = `${this.apiUrl}?id=${teamId}`;

    return this.http.get<Game[]>(resultsUrl, {headers: this.headers}).pipe(
      map((content: any) => {
        const dataArray = content && content.data ? content.data : [];
        if (Array.isArray(dataArray)) {
          return dataArray;
        } else {
          console.error('Los datos de resultados no son un array:', content);
          return [];
        }
      }),
      catchError((error) => {
        console.error('Error al obtener resultados:', error);
        return of([] as Game[]);
      }),
      map((results: Game[]) => {
        this.recentResultsCache[teamId] = results;

        return results;
      })
    );
  }
}
