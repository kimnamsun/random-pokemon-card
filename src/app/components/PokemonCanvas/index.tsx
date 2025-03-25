"use client";

import { useEffect, useState } from "react";
import { Pokemon } from "@/@types/pokemon";
import { Canvas } from "@react-three/fiber";

import Pokeball from "../Pokeball";
import PokemonCard from "../PokemonCard";

type Props = {
  pokemon: Pokemon;
};

const PokemonCanvas = ({ pokemon }: Props) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showPokeball, setShowPokeball] = useState(true);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          return 100;
        }
        return prev + 200 / 30;
      });
    }, 100);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleAnimationComplete = () => {
    setShowPokeball(false);
    setShowCard(true);
  };

  return (
    <>
      {loading ? (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <img
            src="/loading.gif"
            alt="loading"
            className="h-15 w-16 sm:h-24 sm:w-24"
          />
          <h1 className="mb-4 mt-6 text-xl font-bold sm:text-2xl">
            잠시만 기다려주세요...
          </h1>

          <div className="flex w-full justify-center">
            <div className="h-3 w-full max-w-xs overflow-hidden rounded-full bg-gray-200 sm:h-4 sm:max-w-md">
              <div
                className="mr-2 h-full bg-green-500 transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          {showPokeball && (
            <Canvas>
              <Pokeball onAnimationComplete={handleAnimationComplete} />
            </Canvas>
          )}
          {showCard && <PokemonCard pokemon={pokemon} />}
        </>
      )}
    </>
  );
};

export default PokemonCanvas;
