import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";

const gradientProps = {
  animate: "on",
  axesHelper: "off",
  bgColor1: "#000000",
  bgColor2: "#000000",
  brightness: 1,
  cAzimuthAngle: 180,
  cDistance: 2.83,
  cPolarAngle: 80,
  cameraZoom: 9.1,
  color1: "#606080",
  color2: "#8d7dca",
  color3: "#212121",
  destination: "onCanvas",
  embedMode: "off",
  envPreset: "city",
  format: "gif",
  frameRate: 10,
  gizmoHelper: "hide",
  grain: "on",
  lightType: "3d",
  positionX: 0,
  positionY: 0,
  positionZ: 0,
  range: "disabled",
  rangeEnd: 40,
  rangeStart: 0,
  reflection: 0.1,
  rotationX: 50,
  rotationY: 0,
  rotationZ: -60,
  shader: "defaults",
  type: "waterPlane",
  uAmplitude: 0,
  uDensity: 1.5,
  uFrequency: 0,
  uSpeed: 0.3,
  uStrength: 1.5,
  uTime: 8,
  wireframe: false,
};

export default function ShaderHero() {
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    return <div className="shader-fallback" aria-hidden="true" />;
  }

  return (
    <ShaderGradientCanvas
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
      pixelDensity={2.6}
      fov={45}
    >
      <ShaderGradient {...gradientProps} fov={45} pixelDensity={2.6} />
    </ShaderGradientCanvas>
  );
}
