import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamsService } from 'src/app/Servicios/Teams/teams.service';
import { TeamDetalle } from 'src/app/types/TeamDetalle';
import { FavouriteListService } from 'src/app/Servicios/FavouriteListTeam/favourite-list-team.service';

@Component({
  selector: 'app-detalle-team',
  templateUrl: './detalle-team.component.html',
  styleUrls: ['./detalle-team.component.css']
})
export class DetalleTeamComponent {
  public id: number = -1;
  public team : TeamDetalle = {} as TeamDetalle;

  constructor(private route: ActivatedRoute, private service : TeamsService, private router : Router, private favoriteListService : FavouriteListService){}

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id')!;

    try {
      this.service.getTeam(this.id).subscribe((response: any) => {
        if (response) {
          this.team = response;
          console.log("EQUIPOOOOOOOOOO")
          console.log(this.team);
        } else {
          console.error('No se encontró ningún equipo con el ID especificado.');
        }
      });
    } catch (error) {
      console.log("Error al traer el equipo " + error);
    }
  
  }

  verifyFavourite(team : TeamDetalle): boolean {

    const favoriteTeams = this.favoriteListService.getData();

    if(favoriteTeams){
      return favoriteTeams.some(favoriteTeam => favoriteTeam.id === team.data.id);
    }

    

    return false;
  }

  loadImage(){
    if(this.id < 31){
      return `../../../assets/teams/${this.id}.webp`
    } else {
      return `../../../assets/teams/100.webp`
    }
    
  }

  goBack() {
    window.history.back();
  }

}
