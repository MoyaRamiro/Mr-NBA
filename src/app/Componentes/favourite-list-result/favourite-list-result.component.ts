import { Component, Input } from '@angular/core';
import { FavouriteListService } from 'src/app/Servicios/FavouriteListTeam/favourite-list-team.service';
import { FavouriteListResultsService } from 'src/app/Servicios/favouriteListResult/favourite-list-results.service';
import { GamesService } from 'src/app/Servicios/Games/games.service';
import { Game } from 'src/app/types/Games';
import { Team } from 'src/app/types/Teams';
import { Router } from '@angular/router';
import { TeamsService } from 'src/app/Servicios/Teams/teams.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-favourite-list-result',
  templateUrl: './favourite-list-result.component.html',
  styleUrls: ['./favourite-list-result.component.css'],
})
export class FavouriteListResultComponent {
  @Input() favouriteListTeam: Team[] = [];
  public favouriteGames: Game[] = [];
  private soundOUT: Howl;
  private soundIN: Howl;
  public select: Game | null = null;
  public atribute = false;

  constructor(
    private favoriteListService: FavouriteListService,
    private teamService: TeamsService,
    private FavouriteListResult: FavouriteListResultsService,
    private router: Router
  ) {
    this.soundOUT = new Howl({
      src: ['/assets/nbaMP3out.mp3'],
    });
    this.soundIN = new Howl({
      src: ['/assets/nbaMP3.mp3'],
    });
  }

  ngOnInit() {
    const data = this.favoriteListService.getData();
    if (data) {
      this.favouriteListTeam = data;
    } else {
      this.favouriteListTeam = [];
    }

    this.getAllFavouriteTeamsResult();
  }

  searchTeam(id: number) {
    return this.favouriteListTeam.some((t) => t.id == id);
  }

  goToTeam(id: number) {
    this.router.navigate(['/team', id]);
  }

  showAtributes(game: Game) {
    if (this.select === game) {
      this.select = null;
      this.atribute = false;
    } else {
      this.select = game;
      this.atribute = true;
    }
  }

  displayScore(homeScore: number, visitorScore: number): string {
    if (homeScore === 0 && visitorScore === 0) {
      return '  - PRÓXIMAMENTE - ';
    } else {
      return homeScore + ' ' + visitorScore;
    }
  }

  loadImage(id: number) {
    return `../../../assets/teams/${id}.webp`;
  }

  soundsIN() {
    this.soundIN.stop();
    this.soundOUT.stop();
    this.soundIN.play();
  }

  soundsOUT() {
    this.soundOUT.stop();
    this.soundOUT.volume(0.3);
    this.soundOUT.play();
  }

  getResultsByTeamId(teamId: number) {
    const teamData = this.favoriteListService.getTeamById(teamId);

    if (teamData) {
      this.FavouriteListResult.getResultsByTeamId(teamData.id).subscribe(
        (content) => {
          if (Array.isArray(content)) {
            content = content.sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            );
          }
          console.log(content);
          this.favouriteGames = this.favouriteGames.concat(content);
        },
        (error) => {
          console.error('No hay resultados:', error);
          this.favouriteGames = [];
        }
      );
    }
  }

  getAllFavouriteTeamsResult() {
    this.favouriteListTeam.map((team) => this.getResultsByTeamId(team.id));
    console.log(this.favouriteGames);
  }

  async findById(id: number): Promise<any> {
    const team = await firstValueFrom(this.teamService.getTeam(id));
    return team;
  }

  async addRemoveTeamList(teamId: number) {
    const id = this.favouriteListTeam.findIndex((t) => t.id === teamId);
    const team = await this.findById(teamId);

    if (id !== -1) {
      this.favouriteListTeam.splice(id, 1);
      this.soundsOUT();
      console.log('this team eliminated', team);
    } else {
      this.favouriteListTeam.push(team);
      console.log(this.favouriteListTeam);
      this.soundsIN();
      console.log('this team added', team);
    }

    this.favoriteListService.update(this.favouriteListTeam);
  }
}
