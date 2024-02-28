import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Player } from 'src/app/types/Players';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  private readonly apiUrl = 'https://api.balldontlie.io/v1';
  private readonly apiKey = '3dce770b-c605-4400-9d66-5c63b8cbaf97'; 

  constructor(private httpClient: HttpClient) { }

  getAllPlayers(page: number) {
    const url = `${this.apiUrl}/players?cursor=${page}`;

    return this.httpClient.get<Player[]>(url, { headers: this.getHeaders() });
  }

  getPlayersForName(name: string) {
    const url = `${this.apiUrl}/players?search=${name}`;

    return this.httpClient.get<Player[]>(url, { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', ` ${this.apiKey}`);
  }

  getSeasonAverages(playerId: number, season: number) {
    const url = `${this.apiUrl}/season_averages?player_ids[]=${playerId}&season=${season}`;

    return this.httpClient.get(url, { headers: this.getHeaders() });
  }
  

}


