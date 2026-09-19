"use client";

import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

type MotionRef = { current: { p: number } };

const CARD_W = 1.56;
const CARD_H = 3.4;
const PAD = 0.09;

function ImageCard({ dark }: { dark: boolean }) {
  const texture = useMemo(() => {
    const t = new THREE.TextureLoader().load("/images/portrait.jpg");
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    t.needsUpdate = true;
    return t;
  }, []);

  const frameColor = dark ? "#0b1020" : "#ffffff";
  const borderColor = dark ? "#60a5fa" : "#3b82f6";

  return (
    <group>
      <mesh position={[0, 0, -0.03]}>
        <planeGeometry args={[CARD_W + PAD, CARD_H + PAD]} />
        <meshBasicMaterial color={frameColor} />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[CARD_W, CARD_H]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      <lineSegments position={[0, 0, 0.02]}>
        <edgesGeometry args={[new THREE.PlaneGeometry(CARD_W, CARD_H)]} />
        <lineBasicMaterial color={borderColor} transparent opacity={0.7} />
      </lineSegments>
    </group>
  );
}

function makePositions(count: number) {
  const positions = new Float32Array(count * 3);
  const golden = 2.39996322972865332;
  for (let i = 0; i < count; i++) {
    const r = Math.sqrt((i + 1) / count) * (7 + Math.sin(i) * 0.4);
    const theta = i * golden;
    positions[i * 3] = Math.cos(theta) * r;
    positions[i * 3 + 1] = Math.sin(theta) * r * 0.62;
    positions[i * 3 + 2] = (Math.cos(i * 1.7) * 3.5) - 1;
  }
  return positions;
}

function ParticleField({
  count,
  dark,
}: {
  count: number;
  dark: boolean;
}) {
  const points = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(makePositions(count), 3));
    return g;
  }, [count]);

  const color = dark ? "#60a5fa" : "#3b82f6";

  useFrame((state) => {
    if (!points.current) return;
    const t = state.clock.elapsedTime;
    points.current.rotation.y = t * 0.02;
    const pos = points.current.geometry.attributes.position as THREE.BufferAttribute;
    const origin = geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos.array[i * 3 + 1] = origin[i * 3 + 1] + Math.sin(t * 0.5 + i * 0.25) * 0.22;
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={points} position={[0, 0, -1]}>
      <primitive object={geometry} attach="geometry" />
      <pointsMaterial
        size={0.035}
        color={color}
        transparent
        opacity={dark ? 0.7 : 0.4}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function OrbitRings({ dark }: { dark: boolean }) {
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const color = dark ? "#a78bfa" : "#818cf8";

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ringA.current) {
      ringA.current.rotation.z = t * 0.25;
      ringA.current.position.y = Math.sin(t * 0.5) * 0.12;
    }
    if (ringB.current) {
      ringB.current.rotation.z = -t * 0.18;
      ringB.current.position.y = Math.cos(t * 0.4) * 0.12;
    }
  });

  return (
    <group>
      <mesh ref={ringA} rotation={[Math.PI / 2, 0.4, 0]}>
        <torusGeometry args={[1.95, 0.015, 16, 120]} />
        <meshBasicMaterial color={color} transparent opacity={0.55} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 2, -0.45, 0.6]}>
        <torusGeometry args={[2.35, 0.01, 16, 120]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

export function HeroScene({
  dark,
  motionRef,
}: {
  dark: boolean;
  motionRef: MotionRef;
}) {
  const dock = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const isMobile = useMemo(
    () => typeof window !== "undefined" && window.innerWidth < 768,
    []
  );

  const particleCount = isMobile ? 160 : 420;

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = e.clientX / window.innerWidth - 0.5;
      mouse.current.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state) => {
    if (!dock.current) return;

    const p = motionRef.current.p;
    const t = state.clock.elapsedTime;

    dock.current.rotation.y = THREE.MathUtils.lerp(
      dock.current.rotation.y,
      mouse.current.x * 0.4,
      0.06
    );
    dock.current.rotation.x = THREE.MathUtils.lerp(
      dock.current.rotation.x,
      -mouse.current.y * 0.25,
      0.06
    );

    const targetY = Math.sin(t * 0.6) * 0.1 - p * 1.6;
    dock.current.position.y = THREE.MathUtils.lerp(
      dock.current.position.y,
      targetY,
      0.08
    );
    dock.current.position.x = THREE.MathUtils.lerp(
      dock.current.position.x,
      mouse.current.x * 0.25,
      0.06
    );

    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      6 + p * 3.5,
      0.08
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      p * 1.2,
      0.08
    );
    state.camera.lookAt(0, dock.current.position.y * 0.6, 0);
  });

  return (
    <group ref={dock}>
      <ambientLight intensity={dark ? 0.4 : 1.1} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} />
      <ImageCard dark={dark} />
      <OrbitRings dark={dark} />
      <ParticleField count={particleCount} dark={dark} />
    </group>
  );
}