import { Component, Input, OnInit } from '@angular/core';
import { FavouriteListService } from 'src/app/Servicios/FavouriteListPlayer/favourite-list-pla.service';
import { Player } from 'src/app/types/Players';
import { PlayersService } from 'src/app/Servicios/Players/players.service';
import { Router } from '@angular/router';
import { Howl } from 'howler';

@Component({
  selector: 'app-favourite-list-player',
  templateUrl: './favourite-list-player.component.html',
  styleUrls: ['./favourite-list-player.component.css'],
})
export class FavouriteListPlayerComponent {
  private soundOUT: Howl;
  @Input() favoriteList: Player[] = [];
  public select: Player | null = null;
  public atribute = false;
  public seasonAverages: any;

  constructor(
    private favoriteListService: FavouriteListService,
    private jugadoresServiceFav: PlayersService,
    private router: Router
  ) {
    this.soundOUT = new Howl({
      src: ['/assets/nbaMP3out.mp3'],
    });
  }

  ngOnInit() {
    const data = this.favoriteListService.getData();

    if (data) {
      this.favoriteList = data;
    } else {
      this.favoriteList = [];
    }
  }

  soundsOUT() {
    this.soundOUT.stop();
    this.soundOUT.volume(0.3);
    this.soundOUT.play();
  }

  showAtributes(player: Player) {
    if (this.select === player) {
      this.select = null;
      this.atribute = false;
    } else {
      this.select = player;
      this.atribute = true;
    }
  }

  goToTeam(id: Number) {
    this.router.navigate(['/team', id]);
  }

  isKnownPlayer(player: Player): boolean {
    const knownPlayerIds = [
      '34316462-3932-3061-2d62-3930302d3131',
      '34316461-6664-3538-2d62-3930302d3131',
      '34316463-3161-3639-2d62-3930302d3131',
      '34316462-6536-6231-2d62-3930302d3131',
      '34316461-6562-6639-2d62-3930302d3131',
      '34316461-6466-6464-2d62-3930302d3131',
      '34316461-6236-6339-2d62-3930302d3131',
      '34316463-3233-6136-2d62-3930302d3131',
      '34316462-6131-6431-2d62-3930302d3131',
      '34316462-6661-3833-2d62-3930302d3131',
      '34316461-6530-3861-2d62-3930302d3131',
      '34316462-3838-6139-2d62-3930302d3131',
      '34316464-3333-6133-2d62-3930302d3131',
    ]; //lebron, curry, embiid, anteto, jokic, dondic, tautin, durant, buttler , wilson zion, kail irving, harden
    return knownPlayerIds.some((Element) => player.id.toString() === Element);
  }

  getPlayerImage(player: Player): string {
    const playerImageMap: { [id: string]: string } = {
      '34316462-3932-3061-2d62-3930302d3131':
        '../../../assets/players/lebron.webp',
      '34316461-6664-3538-2d62-3930302d3131':
        '../../../assets/players/curry.webp',
      '34316463-3161-3639-2d62-3930302d3131':
        '../../../assets/players/embiid.webp',
      '34316462-6536-6231-2d62-3930302d3131':
        '../../../assets/players/anteto.webp',
      '34316461-6562-6639-2d62-3930302d3131':
        '../../../assets/players/jokic.webp',
      '34316461-6466-6464-2d62-3930302d3131':
        '../../../assets/players/doncic.webp',
      '34316461-6236-6339-2d62-3930302d3131':
        '../../../assets/players/tatum.webp',
      '34316463-3233-6136-2d62-3930302d3131':
        '../../../assets/players/durant.webp',
      '34316462-6131-6431-2d62-3930302d3131':
        '../../../assets/players/butlerEmo.webp',
      '34316462-6661-3833-2d62-3930302d3131':
        '../../../assets/players/zion.webp',
      '34316461-6530-3861-2d62-3930302d3131':
        '../../../assets/players/irving.webp',
      '34316462-3838-6139-2d62-3930302d3131':
        '../../../assets/players/harden.webp',
      '34316464-3333-6133-2d62-3930302d3131':
        '../../../assets/players/kris.webp',
    };

    return this.isKnownPlayer(player)
      ? playerImageMap[player.id]
      : '../../../assets/players/imagenJugadores.webp';
  }

  addRemovePlayerList(player: Player) {
    const id = this.favoriteList.findIndex((p) => p.id === player.id);
    if (id !== -1) {
      this.favoriteList.splice(id, 1);
      this.soundsOUT();
    } else {
      this.favoriteList.push(player);
      console.log(this.favoriteList);
    }

    this.favoriteListService.update(this.favoriteList);
  }

  searchPlayer(player: Player) {
    return this.favoriteList.some((p) => p.id == player.id);
  }
}
