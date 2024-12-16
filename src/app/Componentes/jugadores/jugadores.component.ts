import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Player } from 'src/app/types/Players';
import { PlayersService } from 'src/app/Servicios/Players/players.service';
import { FavouriteListService } from 'src/app/Servicios/FavouriteListPlayer/favourite-list-pla.service';
import { Howl } from 'howler';
import { Router } from '@angular/router';
import { Team } from 'src/app/types/Teams';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css']
})
export class JugadoresComponent implements OnInit {

  public playersList: Player[] = [];
  public favoriteList: Player [] = []
  public filList: Player []=[];
  public select: Player| null=null;
  public searchTerm: string= '';
  public allPlayersList: Player[] = [];
  public currentPage: number = 0;
  public atribute=false;
  public count=1;
  public seasonAverages: any;
  private soundIN : Howl;
  public itemsPerPage: number = 25;
  private soundOUT : Howl;
  public isFirstPage: boolean = true;
  public isLastPage: boolean = false;
  public pageNumber : number = 1;



  constructor(private router: Router, private favoriteListService: FavouriteListService, private JugadoresService: PlayersService, private route: ActivatedRoute) { 
    this.soundIN = new Howl({
      src: ['/assets/nbaMP3.mp3']
    })

    this.soundOUT = new Howl({
      src: ['/assets/nbaMP3out.mp3']
    })
  }


  ngOnInit(): void {
    this.getAllPlayers(0);

    const data = this.favoriteListService.getData();

    if (data){
      this.favoriteList = data;
    } else {
      this.favoriteList = [];
    }

    console.log(this.currentPage)
  }

  paginatePlayers(players: Player[], page: number): Player[] {
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return players.slice(startIndex, endIndex);
  }
  
  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getAllPlayers(this.currentPage)
    }
  }
  
  nextPage() {
    if (this.currentPage < 18) {
      this.currentPage++;
      this.getAllPlayers(this.currentPage)
    }
  }

  updatePageVisibility() { ///comprueba que sea la primer o ultima pagina
    this.isFirstPage = this.currentPage === 0;
    this.isLastPage = this.currentPage === 17
  }

  getAllPlayers(cursor: number = 0) {
    this.JugadoresService.getAllPlayers(cursor).subscribe((response: any) => {
      this.playersList = response.content || [];

      console.log(this.playersList);
      this.updatePageVisibility();
    });
  }
  

  soundsIN(){
    this.soundIN.stop();
    this.soundOUT.stop();
    this.soundIN.play();
  }

  soundsOUT(){
    this.soundOUT.stop();
    this.soundIN.stop();
    this.soundOUT.play();
  }

  
  goToTeam(id : Number){
    this.router.navigate(['/team', id]);

  }

 

  getPlayersForSearch(name : string) {
    return this.JugadoresService.getPlayersForName(name).subscribe((p: Player[] | any) => {
      this.playersList = p.content; 
      this.isFirstPage = true;
      this.isLastPage = true;
    })
  }



  searchPlayer(player: Player){
    return this.favoriteList.some(p => p.id == player.id)
  }

  searchPlayerFilt() {
   
    this.filList = this.playersList.filter(player =>
      (player.first_name + ' ' + player.last_name).toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      player.team.full_name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  } 

 filterPlayers(event: Event): void {
  const searchText = (event.target as HTMLInputElement).value.toLowerCase();

  if (searchText.trim() === '') {
    this.getAllPlayers(0);
    this.isFirstPage = true;
    this.isLastPage = false;
    return;
  } else {
    this.getPlayersForSearch(searchText.trim());
  }
}


  addRemovePlayerList(player: Player) {
    const id = this.favoriteList.findIndex((p) => p.id === player.id);
    if (id !== -1) {
      this.favoriteList.splice(id, 1);
      
      this.soundsOUT()  
    } else {
      this.favoriteList.push(player);
      console.log(this.favoriteList)

      this.soundsIN()
    }

    this.favoriteListService.update(this.favoriteList);
  }
  

  isKnownPlayer(player: Player): boolean {
   
    const knownPlayerIds = ["34316462-3932-3061-2d62-3930302d3131" , "34316461-6664-3538-2d62-3930302d3131", "34316463-3161-3639-2d62-3930302d3131",
       "34316462-6536-6231-2d62-3930302d3131", "34316461-6562-6639-2d62-3930302d3131", "34316461-6466-6464-2d62-3930302d3131", 
       "34316461-6236-6339-2d62-3930302d3131", "34316463-3233-6136-2d62-3930302d3131", "34316462-6131-6431-2d62-3930302d3131", 
       "34316462-6661-3833-2d62-3930302d3131", "34316461-6530-3861-2d62-3930302d3131", "34316462-3838-6139-2d62-3930302d3131", "34316464-3333-6133-2d62-3930302d3131"];  //lebron, curry, embiid, anteto, jokic, dondic, tautin, durant, buttler , wilson zion, kail irving, harden
     return knownPlayerIds.some(Element=> player.id.toString() === Element);
  }

 
  getPlayerImage(player: Player): string {
  
    const playerImageMap: { [id: string]: string } = {
      "34316462-3932-3061-2d62-3930302d3131": '../../../assets/players/lebron.webp',
      "34316461-6664-3538-2d62-3930302d3131": '../../../assets/players/curry.webp',
      "34316463-3161-3639-2d62-3930302d3131": '../../../assets/players/embiid.webp',
      "34316462-6536-6231-2d62-3930302d3131": '../../../assets/players/anteto.webp',
      "34316461-6562-6639-2d62-3930302d3131": '../../../assets/players/jokic.webp',
      "34316461-6466-6464-2d62-3930302d3131": '../../../assets/players/doncic.webp',
      "34316461-6236-6339-2d62-3930302d3131": '../../../assets/players/tatum.webp',
      "34316463-3233-6136-2d62-3930302d3131": '../../../assets/players/durant.webp',
      "34316462-6131-6431-2d62-3930302d3131": '../../../assets/players/butlerEmo.webp',
      "34316462-6661-3833-2d62-3930302d3131": '../../../assets/players/zion.webp',
      "34316461-6530-3861-2d62-3930302d3131": '../../../assets/players/irving.webp',
      "34316462-3838-6139-2d62-3930302d3131": '../../../assets/players/harden.webp',
      "34316464-3333-6133-2d62-3930302d3131": '../../../assets/players/kris.webp',
    };

  
    return this.isKnownPlayer(player) ? playerImageMap[player.id] : '../../../assets/players/imagenJugadores.webp';
  }


  showAtributes(player: Player){

    if(this.select===player){
      this.select=null;
      this.atribute=false;
    }
    else{
      this.select=player;
      this.atribute=true;
    }

  }

}