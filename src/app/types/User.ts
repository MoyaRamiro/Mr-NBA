import { Player } from "./Players";
import { Team } from "./Teams";

export class User {
    userId? : number;
    userName? : string;
    password? : string;
    email? : string;
    dni? : string;
    teamFavouriteList? : Array<Team> | null = null;
    playersFavouriteList? : Array<Player> | null = null;
}