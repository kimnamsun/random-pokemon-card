"use client";

import { useEffect, useState } from "react";
import { Pokemon } from "@/@types/pokemon";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import PokemonCard from "../PokemonCard";

type Props = {
  pokemon: Pokemon;
};

const PokemonCanvas = ({ pokemon }: Props) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

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

  return (
    <>
      {loading ? (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <h1 className="mb-4 text-xl font-bold sm:text-2xl">
            포켓몬 카드를 뽑는 중입니다...
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
        <div className="h-screen w-screen">
          <Canvas>
            <PokemonCard pokemon={pokemon} />
            <OrbitControls
              maxAzimuthAngle={Math.PI}
              dampingFactor={0.1}
              rotateSpeed={1}
            />
          </Canvas>
        </div>
      )}
    </>
  );
};

export default PokemonCanvas;
