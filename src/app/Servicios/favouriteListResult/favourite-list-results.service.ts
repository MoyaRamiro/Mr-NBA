import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Game } from 'src/app/types/Games';

@Injectable({
  providedIn: 'root',
})
export class FavouriteListResultsService {
  private apiUrl = 'http://localhost:4000/games';
  private recentResultsCache: { [teamId: number]: Game[] } = {};

  constructor(private http: HttpClient) {}

  getResultsByTeamId(teamId: number): Observable<Game[]> {
    const resultsUrl = `${this.apiUrl}?id=${teamId}`;

    return this.http.get<Game[]>(resultsUrl).pipe(
      map((content: any) => {
        const dataArray = content && content.content ? content.content : [];
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
