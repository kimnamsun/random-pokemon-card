import { getRandomPokemon } from "./api/getPokemon";
import PokemonCanvas from "./components/PokemonCanvas";

const Home = async () => {
  const pokemon = await getRandomPokemon();

  if (!pokemon) {
    return null;
  }

  return <PokemonCanvas pokemon={pokemon} />;
};

export default Home;
