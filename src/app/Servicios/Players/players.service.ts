import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Player } from 'src/app/types/Players';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  private readonly apiUrl = 'https://api.balldontlie.io/v1';
  private readonly apiKey = 'c90e56f5-b8a8-454c-bdd9-d9dc13b3ea33'; 

  constructor(private httpClient: HttpClient) { }

  getAllPlayers(page: number) {
    const url = `${this.apiUrl}/players?cursor=${page}`;

    console.log(url)
    return this.httpClient.get<Player[]>(url, { headers: this.getHeaders() });
  }

  getPlayersForName(name: string) {
    const url = `${this.apiUrl}/players?search=${name}`;

    return this.httpClient.get<Player[]>(url, { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `${this.apiKey}`);
  }
  

}


