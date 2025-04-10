import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from 'src/app/types/Games';
import { TeamsService } from '../Teams/teams.service';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private readonly apiUrl = 'https://api.balldontlie.io/v1/games';
  private readonly apiKey = 'c90e56f5-b8a8-454c-bdd9-d9dc13b3ea33';

  private games: Game[] = [];

  constructor(
    private httpClient: HttpClient,
    private serviceTeam: TeamsService
  ) {}

  getAllGames(cursor?: number) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const startDate = new Date(currentYear, 0, 45);

    const formattedStartDate = `${startDate.getFullYear()}-${(
      startDate.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${startDate.getDate().toString().padStart(2, '0')}`;
    const formattedEndDate = `${currentDate.getFullYear()}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

    //let url = `${this.apiUrl}?seasons[]=2024&per_page=100&sort=date`;
    const url = `${this.apiUrl}?cursor=${cursor}`;

    const headers = { Authorization: `${this.apiKey}` };

    return this.httpClient.get(url, { headers});
  }

  getGamesForName(name: string) {
    const url = `${this.apiUrl}?search=${name}`;

    return this.httpClient.get<Game[]>(url);
  }

  async getGamesOfTeam(name: string): Promise<any> {
    const arrayIds = await this.serviceTeam.getTeamIDsByName(name);

    if (arrayIds.length > 0) {
      const currentDate = new Date(new Date().getFullYear(), 0, 1);
      const lastDayOfYear = new Date(new Date().getFullYear(), 11, 31);

      const dateS = currentDate.toISOString().split('T')[0];
      const endDate = lastDayOfYear.toISOString().split('T')[0];

      const url = `${this.apiUrl}?team_ids[]=${arrayIds.join(
        '&team_ids[]='
      )}&start_date=${dateS}&end_date=${endDate}&per_page=100&status=Final`;

      try {
        const headers = { Authorization: `${this.apiKey}` };
        const gamesData: any = await this.httpClient
          .get(url, { headers })
          .toPromise();

        gamesData.data.sort((a: any, b: any) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB.getTime() - dateA.getTime();
        });

        return gamesData;
      } catch (error) {
        console.error('Error al realizar la solicitud a la API.', error);
        return null;
      }
    } else {
      console.log('No se encontraron IDs de equipos.');
      return null;
    }
  }
}
