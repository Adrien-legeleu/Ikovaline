"use client";

import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

function PinModel() {
  const { scene } = useGLTF("/models/Banner.glb");
  return <primitive object={scene} scale={1} />;
}

export default function Pin3D() {
  return (
    <div className="w-[200px] h-[200px]">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight />
        <directionalLight position={[2, 2, 2]} />
        <Suspense fallback={null}>
          <PinModel />
          <OrbitControls enableZoom={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}
