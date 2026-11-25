"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type PointerProxy = { current: { x: number; y: number } };

function ParticleCloud({
  pointer,
  count,
  color,
  spread,
  size,
  opacity,
}: {
  pointer: PointerProxy;
  count: number;
  color: string;
  spread: number;
  size: number;
  opacity: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const base = new THREE.Color(color);
    const warm = new THREE.Color("#ffb25c");
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * spread * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 1.3;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
      const c = Math.random() > 0.65 ? warm : base;
      colors[i * 3 + 0] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count, color, spread]);

  useFrame((state, delta) => {
    const points = pointsRef.current;
    if (!points) return;
    points.rotation.y += delta * 0.03;
    const t = state.clock.elapsedTime;
    points.position.y = Math.sin(t * 0.35) * 0.18;
    // gentle mouse parallax, tracked on window (canvas is pointer-events-none)
    points.position.x += (pointer.current.x * 0.45 - points.position.x) * 0.03;
    points.position.y +=
      (pointer.current.y * 0.3 + Math.sin(t * 0.35) * 0.18 - points.position.y) *
      0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        vertexColors
        transparent
        opacity={opacity}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/**
 * Warm orange/pink particle field rendered behind the hero.
 * Lazy-loaded (ssr: false) and only mounted on desktop with no
 * prefers-reduced-motion — see Hero.
 */
export default function ParticleField() {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-[1] overflow-hidden"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        style={{ pointerEvents: "none" }}
      >
        <ParticleCloud
          pointer={pointer}
          count={420}
          color="#ff5c00"
          spread={7}
          size={0.055}
          opacity={0.8}
        />
        <ParticleCloud
          pointer={pointer}
          count={240}
          color="#ffd6c0"
          spread={9}
          size={0.04}
          opacity={0.55}
        />
      </Canvas>
    </div>
  );
}
