"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Pokemon } from "@/@types/pokemon";
import { Canvas } from "@react-three/fiber";

import { getRandomPokemon } from "@/app/api/getPokemon";

const Pokeball = React.lazy(() => import("@/app/components/Pokeball"));
const PokemonCard = React.lazy(() => import("@/app/components/PokemonCard"));

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showPokeball, setShowPokeball] = useState(true);
  const [showCard, setShowCard] = useState(false);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      const data = await getRandomPokemon();
      setPokemon(data);
    };
    fetchPokemon();
  }, []);

  useEffect(() => {
    const duration = 3000;
    const increment = 100 / (duration / 100);
    let currentProgress = 0;

    const interval = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 100) {
        setProgress(100);
        setLoading(false);
        clearInterval(interval);
      } else {
        setProgress(currentProgress);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleAnimationComplete = useCallback(() => {
    setShowPokeball(false);
    setShowCard(true);
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <Image
            width={96}
            height={96}
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
          {showCard && pokemon && <PokemonCard pokemon={pokemon} />}
        </>
      )}
    </>
  );
};

export default Home;
