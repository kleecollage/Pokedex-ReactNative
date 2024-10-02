export interface Pokemon{
 id: number;
 name: string;
 types: string[];
 avatar: string;
 sprites: string[];
 
 color: string;

 games: string[];
 stats: Stat[];
 abilities: string[];
 moves: Moves[];
}

export interface Stat{
  name: string;
  value: number;
}

export interface Moves{
  name: string;
  level: number;
}