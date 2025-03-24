import { useRef } from "react";
import { Pokemon } from "@/@types/pokemon";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

import colors from "@/app/constants/typeColor";

type Props = {
  pokemon: Pokemon;
};

const PokemonCard = ({ pokemon }: Props) => {
  const meshRef = useRef<Mesh>(null);

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

  useFrame(() => {
    if (!meshRef.current) {
      return;
    }
    meshRef.current.rotation.y += 0.001;
  });

  return (
    <mesh ref={meshRef}>
      <Html
        transform
        position={[0, 0, 0.03]}
        center={false}
        zIndexRange={[200, 100]}
        occlude
      >
        <div
          className="h-[67px] w-[45px] rounded-[0.1rem] p-[2px] sm:h-[90px] sm:w-[60px] md:h-[134px] md:w-[90px]"
          style={{
            background: getGradient("bottom"),
          }}
        >
          <div className="flex h-full flex-col items-center justify-between rounded-[0.05rem] bg-white/95 p-[0.2rem] shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center">
                {pokemon.enTypes.map((type, index) => (
                  <div
                    key={index}
                    className="mr-[0.1rem] flex items-center justify-center rounded-full px-[0.1rem] text-[0.1rem] text-white sm:text-[0.15rem] md:text-[0.2rem]"
                    style={{
                      backgroundColor:
                        colors[
                          type.toLocaleLowerCase() as keyof typeof colors
                        ] || colors.unknown,
                    }}
                  >
                    {pokemon.types[index]}
                  </div>
                ))}
              </div>
              <span className="text-[0.2rem] text-gray-500 sm:text-[0.3rem] md:text-[0.4rem]">
                No.{pokemon.id}
              </span>
            </div>

            <h1 className="text-center text-[0.4rem] font-bold sm:text-[0.6rem] md:text-[0.8rem]">
              {pokemon.name}
            </h1>

            <div
              className="flex h-[25px] w-[25px] items-center justify-center rounded-full sm:h-[35px] sm:w-[35px] md:h-[50px] md:w-[50px]"
              style={{
                background: "radial-gradient(circle, #E0E0E0, #FFFFFF)",
                border: `2px solid ${primaryColor}`,
              }}
            >
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="h-[15px] w-[15px] object-contain sm:h-[20px] sm:w-[20px] md:h-[30px] md:w-[30px]"
              />
            </div>
            <div className="mt-[2px] w-full text-center text-[2px] text-[#666] sm:text-[3px] md:text-[4px]">
              <span>{pokemon.description}</span>
              <div
                className="mt-[5px] h-[0.5px] sm:h-[0.75px] md:h-[1px]"
                style={{
                  background: getGradient("right"),
                }}
              />
            </div>
          </div>
        </div>
      </Html>
    </mesh>
  );
};

export default PokemonCard;
