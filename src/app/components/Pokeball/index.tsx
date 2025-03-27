"use client";

import { useEffect, useRef, useState } from "react";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type Props = {
  onAnimationComplete: () => void;
};

const Pokeball = ({ onAnimationComplete }: Props) => {
  const group = useRef<THREE.Group | null>(null);
  const mixer = useRef<THREE.AnimationMixer>(null);

  const { scene, animations } = useGLTF("/pokeball_loader.glb");
  // const { scene, animations } = useGLTF("/pokeball_animated.glb");
  // const { scene, animations } = useGLTF("/pokemon_ball.glb");

  const [isAnimating, setIsAnimating] = useState(false);

  const [opacity, setOpacity] = useState(1);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material.transparent = true;
        child.material.opacity = opacity;
        child.material.emissive = new THREE.Color(0xffffff);
        child.material.emissiveIntensity = 0;
        child.material.needsUpdate = true;
      }
    });

    if (animations && animations.length) {
      mixer.current = new THREE.AnimationMixer(scene);
      const action = mixer.current.clipAction(animations[0]);

      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
      action.play();

      setIsAnimating(true);

      const timer = setTimeout(() => {
        setIsAnimating(false);
        setFadeOut(true);
        scene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material.emissiveIntensity = 0;
          }
        });
      }, 4500);

      return () => clearTimeout(timer);
    }
  }, [scene, animations]);

  useFrame((_, delta) => {
    if (mixer.current && isAnimating) {
      mixer.current.update(delta);
    }

    if (fadeOut && opacity > 0) {
      setOpacity((prev) => {
        const newOpacity = prev - delta * 1;

        scene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material.opacity = newOpacity;
          }
        });

        if (newOpacity <= 0) {
          onAnimationComplete();
        }
        return newOpacity < 0 ? 0 : newOpacity;
      });
    }
  });
  return (
    <>
      <pointLight intensity={1.5} />
      <group
        ref={group}
        position={[0, -1, 0]}
        scale={[22, 21, 22]}
        rotation={[0.1, 0.1, 0]}
        // scale={[5, 5, 5]}
        // rotation={[0, Math.PI + -(Math.PI / 8), 0]}
        // onClick={handleClick}
      >
        <primitive object={scene} />
      </group>
      <Environment preset="city" />
      <ContactShadows position={[0, -3.5, 0]} scale={20} blur={2} far={4.5} />
      <OrbitControls />
    </>
  );
};

export default Pokeball;
