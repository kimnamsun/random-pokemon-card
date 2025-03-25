import { useRef } from "react";
import { Pokemon } from "@/@types/pokemon";

import colors from "@/app/constants/typeColor";

type Props = {
  pokemon: Pokemon;
};

const PokemonCard = ({ pokemon }: Props) => {
  const cardRef = useRef(null);

  const typeColors = pokemon.enTypes.map(
    (type) =>
      colors[type.toLocaleLowerCase() as keyof typeof colors] || colors.unknown
  );

  const primaryColor = typeColors[0] || colors.unknown;
  const secondaryColor = typeColors[1] || null;

  const getGradient = (direction: "right" | "bottom") => {
    return secondaryColor
      ? `linear-gradient(to ${direction}, ${primaryColor}, ${secondaryColor})`
      : primaryColor;
  };

  return (
    <div className="pointer-events-none flex h-screen items-center justify-center">
      <div
        ref={cardRef}
        className="animate-float h-96 w-72 rounded-md p-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-all duration-100 ease-in-out"
        style={{
          background: getGradient("bottom"),
          animationDelay: "0.2s",
        }}
      >
        <div className="flex h-full flex-col items-center justify-between rounded-md bg-white p-2 shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center">
              {pokemon.enTypes.map((type, index) => (
                <div
                  key={index}
                  className="mr-2 flex items-center justify-center rounded-full px-2 text-base text-white transition-all duration-200 hover:bg-opacity-80"
                  style={{
                    backgroundColor:
                      colors[type.toLocaleLowerCase() as keyof typeof colors] ||
                      colors.unknown,
                  }}
                >
                  {pokemon.types[index]}
                </div>
              ))}
            </div>
            <span className="text-base text-gray-500">No.{pokemon.id}</span>
          </div>

          <h1 className="text-center text-2xl font-bold">{pokemon.name}</h1>

          <div
            className="flex h-32 w-32 items-center justify-center rounded-full"
            style={{
              background: "radial-gradient(circle, #E0E0E0, #FFFFFF)",
              border: `0.5rem solid ${primaryColor}`,
            }}
          >
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="h-20 w-20 object-contain"
            />
          </div>

          <div className="mt-2 w-full text-center text-sm text-[#666]">
            <span>
              {pokemon.description !== ""
                ? pokemon.description
                : pokemon.types.join(", ") + "타입의 포켓몬 " + pokemon.name}
            </span>
            <div
              className="mt-5 h-2"
              style={{
                background: getGradient("right"),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
