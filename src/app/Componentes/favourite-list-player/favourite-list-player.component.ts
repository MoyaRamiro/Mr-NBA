import { Component, Input, OnInit} from '@angular/core';
import { FavouriteListService } from 'src/app/Servicios/FavouriteListPlayer/favourite-list-pla.service';
import { Player } from 'src/app/types/Players';
import { PlayersService } from 'src/app/Servicios/Players/players.service'; 
import { Router } from '@angular/router';
import { Howl } from 'howler';

@Component({
  selector: 'app-favourite-list-player',
  templateUrl: './favourite-list-player.component.html',
  styleUrls: ['./favourite-list-player.component.css']
})
export class FavouriteListPlayerComponent {

  private soundOUT : Howl;
  @Input() favoriteList: Player[] = []
  public select: Player | null = null;
  public atribute = false;
  public seasonAverages: any;


  constructor (private favoriteListService: FavouriteListService, private jugadoresServiceFav: PlayersService, private router: Router ){

    this.soundOUT = new Howl({
      src: ['/assets/nbaMP3out.mp3']
    })
  }

  ngOnInit(){

    const data = this.favoriteListService.getData();

    if (data){
      this.favoriteList = data;
    } else {
      this.favoriteList = [];
    }
  }

 
  
      
  soundsOUT(){
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

  goToTeam(id : Number){
    this.router.navigate(['/team', id]);

  }

  isKnownPlayer(player: Player): boolean {
   
    const knownPlayerIds = [237 , 115, 145, 15, 246, 132, 434, 140, 79, 666969, 228, 192];  //lebron, curry, embiid, anteto, jokic, dondic, tautin, durant, buttler , wilson zion, kail irving, harden
     return knownPlayerIds.some(Element=> player.id === Element);
  }

  getPlayerImage(player: Player): string {
  
    const playerImageMap: { [id: number]: string } = {
      237: '../../../assets/players/lebron.webp',
      115: '../../../assets/players/curry.webp',
      145: '../../../assets/players/embiid.webp',
      15: '../../../assets/players/anteto.webp',
      246: '../../../assets/players/jokic.webp',
      132: '../../../assets/players/doncic.webp',
      434: '../../../assets/players/tatum.webp',
      140: '../../../assets/players/durant.webp',
      79: '../../../assets/players/butlerEmo.webp',
      666969: '../../../assets/players/zion.webp',
      228: '../../../assets/players/irving.webp',
      192: '../../../assets/players/harden.webp',

  
    };

  
    return this.isKnownPlayer(player) ? playerImageMap[player.id] : '../../../assets/players/imagenJugadores.webp';
  }

  addRemovePlayerList(player: Player) {
    const id = this.favoriteList.findIndex((p) => p.id === player.id);
    if (id !== -1) {
      this.favoriteList.splice(id, 1);
      this.soundsOUT();
      
    } else {
      this.favoriteList.push(player);
      console.log(this.favoriteList)

    }

    this.favoriteListService.update(this.favoriteList);
  }

  searchPlayer(player: Player){
    return this.favoriteList.some(p => p.id == player.id)
  }


}
