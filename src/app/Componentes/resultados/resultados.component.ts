import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/types/Games';
import { GamesService } from 'src/app/Servicios/Games/games.service';
import { Team } from 'src/app/types/Teams';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css'],
})
export class ResultadosComponent implements OnInit {
  public GamesList: Game[] = [];
  public select: Game | null = null;
  public atribute = false;
  public allGamesList: Game[] = [];
  public currentPage: number = 0;
  public itemsPerPage: number = 25;
  public isFirstPage: boolean = true;
  public isLastPage: boolean = false;
  private submitClick: boolean = false;
  private submitTeam: string = '';

  constructor(
    private JuegosService: GamesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllGames(0);
    console.log('juegos');
    console.log(this.GamesList);
  }

  paginateGames(games: Game[], page: number): Game[] {
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return games.slice(startIndex, endIndex);
  }

  getAllGames(cursor: number = 0) {
    this.JuegosService.getAllGames(cursor).subscribe((response: any) => {
      const newGames = response.content || [];

      console.log(newGames);

      this.allGamesList = newGames;

      this.allGamesList.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      });

      //this.GamesList = this.paginateGames(this.allGamesList, this.currentPage);
      this.GamesList = this.allGamesList;
      console.log(this.GamesList);

      this.updatePageVisibility();
    });
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getAllGames(this.currentPage);
    }
  }

  nextPage() {
    if (this.currentPage < 5) {
      this.currentPage++;
      this.getAllGames(this.currentPage);
    }
  }

  updatePageVisibility() {
    this.isFirstPage = this.currentPage === 0;
    this.isLastPage = this.currentPage === 4;
  }

  /*async getGamesForSearch(name: string) {
    const gamesData = await this.JuegosService.getGamesOfTeam(name);
    this.GamesList = gamesData;

    if (gamesData && gamesData.data) {
      console.log(gamesData.data);
      const filteredGames = this.filterGames(gamesData.data);
      this.GamesList = filteredGames;
      console.log(this.GamesList);
    } else {
      this.GamesList = [];
      console.log('No se recibió datos válidos de la solicitud.');
    }
  }*/

  goToTeam(id: number) {
    this.router.navigate(['/team', id]);
  }

  filterGames(array: Game[]) {
    return array.filter((game) =>
      Object.values(game).some((value) => value !== null)
    );
  }

  filterResults(event: Event) {
    const searchText = (event.target as HTMLInputElement).value.toLowerCase();

    if (searchText.trim() === '') {
      this.getAllGames(0);
      this.isLastPage = false;
      this.isFirstPage = true;
    } else {
      this.getResultsForSearch(searchText.trim());
    }
  }

  getResultsForSearch(name: string) {
    return this.JuegosService.getGamesForName(name).subscribe(
      (p: Game[] | any) => {
        this.GamesList = p.content;
        this.isFirstPage = true;
        this.isLastPage = true;
      }
    );
  }

  submitResults() {
    const searchText = (
      document.getElementById('search-input') as HTMLInputElement
    ).value.toLowerCase();

    console.log(searchText);

    this.getResultsForSearch(searchText);
    this.isFirstPage = true;
    this.isLastPage = true;
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
}
