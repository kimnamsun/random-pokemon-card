export const pokemonTypes = [
  "Normal",
  "Fighting",
  "Flying",
  "Poison",
  "Ground",
  "Rock",
  "Bug",
  "Ghost",
  "Steel",
  "Fire",
  "Water",
  "Grass",
  "Electric",
  "Psychic",
  "Ice",
  "Dragon",
  "Dark",
  "Fairy",
  "Unknown",
] as const;

export type PokemonType = (typeof pokemonTypes)[number];

export const colors: Record<PokemonType, string> = {
  Normal: "#A0A29F",
  Fighting: "#D3425F",
  Flying: "#A1BBEC",
  Poison: "#B763CF",
  Ground: "#DA7C4D",
  Rock: "#C9BB8A",
  Bug: "#9FA244",
  Ghost: "#5F6DBC",
  Steel: "#5695A3",
  Fire: "#FBA54C",
  Water: "#539DDF",
  Grass: "#5FBD58",
  Electric: "#F2D94E",
  Psychic: "#FA8581",
  Ice: "#75D0C1",
  Dragon: "#0C69C8",
  Dark: "#595761",
  Fairy: "#EE90E6",
  Unknown: "#d5ec6d",
};

export default colors;
