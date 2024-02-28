export interface Player {
    id: number;
    first_name: string;
    last_name: string;
    position: string;
    height: number;
    weight: number;
    team: {
      id: number;
      full_name: string;
      city: string;
      conference: string;
      division: string;
      name: string;
    };
    jersey_number: string;
    college: string;
    country: string;
    draft_year: number;
    draft_round: number;
    draft_number: number;
  }
  