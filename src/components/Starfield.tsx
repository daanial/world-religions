import { useEffect, useRef } from "react";
import * as THREE from "three";

interface StarfieldProps {
  /** Slower density for hero; denser for compact sections */
  density?: "calm" | "dense";
  /** A subtle accent tint applied to a fraction of stars */
  accent?: string;
  /** Gentle camera drift */
  drift?: boolean;
  className?: string;
}

/**
 * Full-viewport Three.js starfield with slow camera drift.
 * Renders behind page content (fixed, -1 z-index).
 */
export default function Starfield({
  density = "calm",
  accent = "#e6b450",
  drift = true,
  className,
}: StarfieldProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070b, 0.0009);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000);
    camera.position.set(0, 0, 1);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ---- Stars ----
    const count = density === "dense" ? 4200 : 2600;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const accentColor = new THREE.Color(accent);
    const white = new THREE.Color(0xffffff);
    const blue = new THREE.Color(0x9bb8ff);

    for (let i = 0; i < count; i++) {
      // Distribute in a sphere shell for depth
      const r = 80 + Math.random() * 700;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const tint = Math.random();
      let c: THREE.Color;
      if (tint > 0.93) c = accentColor;
      else if (tint > 0.78) c = blue;
      else c = white;
      const brightness = 0.4 + Math.random() * 0.6;
      colors[i * 3] = c.r * brightness;
      colors[i * 3 + 1] = c.g * brightness;
      colors[i * 3 + 2] = c.b * brightness;

      sizes[i] = Math.random() * 1.6 + 0.3;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // Soft round sprite via canvas texture
    const sprite = makeStarSprite();

    const material = new THREE.PointsMaterial({
      size: 2.4,
      map: sprite,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // ---- A faint nebula plane far behind ----
    const nebulaMat = new THREE.MeshBasicMaterial({
      map: makeNebulaSprite(accent),
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const nebula = new THREE.Mesh(new THREE.PlaneGeometry(1400, 1400), nebulaMat);
    nebula.position.set(0, 0, -500);
    scene.add(nebula);

    // ---- Animation ----
    let rafId = 0;
    const clock = new THREE.Clock();

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      if (!reduceMotion) {
        points.rotation.y = t * 0.01;
        points.rotation.x = Math.sin(t * 0.03) * 0.05;
        if (drift) {
          camera.position.x = Math.sin(t * 0.04) * 2;
          camera.position.y = Math.cos(t * 0.05) * 1.5;
          camera.lookAt(0, 0, 0);
        }
        nebula.rotation.z = t * 0.005;
      }
      renderer.render(scene, camera);
    };
    animate();

    // ---- Resize ----
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      nebulaMat.dispose();
      sprite.dispose();
      nebulaMat.map?.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [density, accent, drift]);

  return <div ref={mountRef} className={className} style={starfieldStyle} />;
}

const starfieldStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  width: "100%",
  height: "100%",
  zIndex: -1,
  pointerEvents: "none",
};

// Soft circular sprite
function makeStarSprite(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.3, "rgba(255,255,255,0.7)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

// Faint colored nebula glow
function makeNebulaSprite(accent: string): THREE.Texture {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, `${accent}33`);
  grad.addColorStop(0.4, `${accent}11`);
  grad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}
