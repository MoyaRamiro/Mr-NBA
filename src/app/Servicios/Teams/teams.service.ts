import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Team } from 'src/app/types/Teams';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private readonly apiUrl = 'https://api.balldontlie.io/v1';
  private readonly apiKey = 'c90e56f5-b8a8-454c-bdd9-d9dc13b3ea33';

  private allTeams: Team[] = [];

  constructor(private httpClient: HttpClient) {  
  }

  async getAllTeamsForSearch(i: number) { 
    return new Promise<void>((resolve, reject) => {
      this.getAllTeams(i).subscribe((t: Team[] | any) => {
        this.allTeams = this.allTeams.concat(t.data);
        resolve();
      },
        error => reject(error)
      );
    });
  }

  async fillArrayOfTeams(): Promise<Team[]> {
    this.resetArray();

    for (let i = 1; i < 3; i++) {
      await this.getAllTeamsForSearch(i);
    }
    
    return this.allTeams;
  }

  resetArray() {
    this.allTeams.length = 0;
  }

  async getTeamIDsByName(teamName: string): Promise<number[]> {
    await this.fillArrayOfTeams();
  
    const matchingTeams = this.allTeams.filter((team) =>
      team.full_name.toLowerCase().includes(teamName.toLowerCase())
    );
  
    const teamIDs = matchingTeams.map((team) => team.id);
  
    return teamIDs;
  }

  getAllTeams(i: Number) {
    return this.httpClient.get(`${this.apiUrl}/teams?page=${i}`, { headers: this.getHeaders() });
  }

  getTeam(id: any) {
    const url = `${this.apiUrl}/teams/${id}`;
    return this.httpClient.get(url, { headers: this.getHeaders() });
  }
  
  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', ` ${this.apiKey}`);
  }
  

}

