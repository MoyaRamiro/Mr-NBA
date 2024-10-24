import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, concatMap, retry } from 'rxjs/operators';
import { Team } from 'src/app/types/Teams';
import { Player } from 'src/app/types/Players';
import { Game } from 'src/app/types/Games';
import { LoginRegisterService } from '../LoginRegister/login-register.service';

@Injectable({
  providedIn: 'root'
})
export class FavouriteListService {

  private favoriteList: Team[] = [];
  private apiUrl = 'https://api.balldontlie.io/v1';
  private apiKey = '3dce770b-c605-4400-9d66-5c63b8cbaf97';

  private headers: HttpHeaders = new HttpHeaders({
    'Authorization': `${this.apiKey}`
  });

  private recentResultsCache: { [teamId: number]: Game[] } = {};
  private playersCache: { [teamId: number]: Player[] } = {};

  constructor(private service: LoginRegisterService, private http: HttpClient) {}

  update(list: Team[]) {
    this.favoriteList = list;
    let activeUser = this.service.getActiveUser();
    activeUser.teamFavouriteList = this.favoriteList;
    localStorage.setItem('user', JSON.stringify(activeUser));
    this.service.updateUser(activeUser);
    console.log('Lista de equipos actualizada:', list); 
  }

  getData(): Team[] {
    const activeUser = this.service.getActiveUser();
    const teamFavouriteList = activeUser.teamFavouriteList;
    console.log('Datos del usuario activo:', activeUser); 
    console.log('Lista de equipos favoritos:', teamFavouriteList); 
    return teamFavouriteList || [];
  }

  getTeamById(teamId: number): Team | undefined {
    if (!this.favoriteList || this.favoriteList.length === 0) return undefined;
    return this.favoriteList.find((team) => team.id === teamId);
  }

  private fetchResultsPage(teamId: number, page: number, limit: number): Observable<Game[]> {
    const endDate = new Date().toISOString().split('T')[0]; 
    const startDate = new Date(); 
    startDate.setDate(startDate.getDate() - 7); 
    const startDateString = startDate.toISOString().split('T')[0];
    
    const resultsUrl = `${this.apiUrl}/games?team_ids[]=${teamId}&per_page=100&page=${page}&start_date=${startDateString}&end_date=${endDate}`;
  
    return this.http.get<Game[]>(resultsUrl, { headers: this.headers }).pipe(
      map((data: any) => {
        const dataArray = data && data.data ? data.data : [];
        if (Array.isArray(dataArray)) {
          return dataArray;
        } else {
          console.error('Los datos de resultados no son un array:', data);
          return [];
        }
      }),
      catchError((error) => {
        console.error('Error al obtener resultados:', error);
        return of([] as Game[]);
      })
    );
  }
  
  private fetchAllResultsRecursive(teamId: number, page: number, limit: number, allResults: Game[]): Observable<Game[]> {
    return this.fetchResultsPage(teamId, page, limit).pipe(
      concatMap((results: Game[]) => {
        if (results.length > 0) {
          allResults = allResults.concat(results);
          return this.fetchAllResultsRecursive(teamId, page + 1, limit, allResults);
        } else {
          return of(allResults);
        }
      })
    );
  }

  getRecentResults(teamId: number, limit: number = 5): Observable<Game[]> {
    console.log('Obteniendo resultados recientes para el equipo con ID:', teamId); 
    if (this.recentResultsCache[teamId]) {
      const cachedResults = this.recentResultsCache[teamId];
      if (this.resultsCacheValid(cachedResults)) {
        console.log('Utilizando resultados en caché para el equipo con ID:', teamId); 
        return of(cachedResults.slice(0, limit)); 
      }
    }

    console.log('Obteniendo resultados del servidor para el equipo con ID:', teamId); 
    
    const endDate = new Date().toISOString().split('T')[0]; 
    const startDate = new Date(); 
    startDate.setDate(startDate.getDate() - 7); 
    const startDateString = startDate.toISOString().split('T')[0];

    const resultsUrl = `${this.apiUrl}/games?team_ids[]=${teamId}&per_page=${limit}&start_date=${startDateString}&end_date=${endDate}&order=-date`;
  
    return this.http.get<Game[]>(resultsUrl, { headers: this.headers }).pipe( 
      map((data: any) => {
        const dataArray = data && data.data ? data.data : [];
        if (Array.isArray(dataArray)) {
          return dataArray;
        } else {
          console.error('Los datos de resultados no son un array:', data);
          return [];
        }
      }),
      catchError((error) => {
        console.error('Error al obtener resultados:', error);
        return of([] as Game[]);
      }),
      map((results: Game[]) => {
        this.recentResultsCache[teamId] = results;
        console.log('Resultados obtenidos para el equipo con ID:', teamId, results);
        return results; 
      }),
      retry(3)
    );
  }

  
  private resultsCacheValid(results: Game[]): boolean {
    return true; 
  }

  private fetchPlayersPage(teamId: number, page: number): Observable<Player[]> {
    const playersUrl = `${this.apiUrl}/players?team_ids[]=${teamId}&per_page=100&page=${page}`;
  
    return this.http.get(playersUrl, { headers: this.headers }).pipe(
      map((data: any) => {
        const dataArray = data && data.data ? data.data : [];
        if (Array.isArray(dataArray)) {
          return dataArray;
        } else {
          console.error('Los datos de jugadores no son un array:', data);
          return [];
        }
      }),
      catchError((error) => {
        console.error('Error al obtener jugadores:', error);
        return of([] as Player[]);
      })
    );
  }
  
  private fetchAllPlayersRecursive(teamId: number, page: number, allPlayers: Player[]): Observable<Player[]> {
    return this.fetchPlayersPage(teamId, page).pipe(
      
      concatMap((players: Player[]) => {
        if (players.length > 0) {
          allPlayers = allPlayers.concat(players);
          return this.fetchAllPlayersRecursive(teamId, page + 1, allPlayers);
        } else {
          return of(allPlayers);
        }
      })
    );
  }
  
  getPlayersForTeam(teamId: number): Observable<Player[]> {
  
    if (this.playersCache[teamId]) {
      const cachedPlayers = this.playersCache[teamId];
      return of(cachedPlayers);
    }
  
    return this.fetchAllPlayersRecursive(teamId, 1, []).pipe(
      map((players: Player[]) => {
        this.playersCache[teamId] = players;
        return players.filter((player: Player) => player.team.id === teamId);
      }),
      retry(3) 
    );
  }
}




  


