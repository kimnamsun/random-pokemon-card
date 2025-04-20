import { PokemonType } from "@/app/constants/type";

export type Pokemon = {
  id: number;
  name: string;
  description: string;
  types: string[];
  enTypes: PokemonType[];
  image: string;
};
