import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import type { AboutImage } from "../lib/aboutImages";

interface About3DCarouselProps {
  images: AboutImage[];
  className?: string;
  onReady?: () => void;
}

interface PanelState {
  mesh: THREE.Mesh;
  baseScale: THREE.Vector3;
  targetScale: number;
  targetGlow: number;
  glow: number;
  index: number;
}

const RADIUS = 7.2;
const PANEL_WIDTH = 2.8;
const PANEL_HEIGHT = 1.85;
const BASE_ROTATION_SPEED = 0.18;
const DRAG_SENSITIVITY = 0.004;
const WHEEL_SENSITIVITY = 0.02;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function createStarPoints(count: number): THREE.Points {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const r = 40 + Math.random() * 120;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);

    const brightness = 0.35 + Math.random() * 0.65;
    colors[i * 3] = brightness;
    colors[i * 3 + 1] = brightness * 0.92;
    colors[i * 3 + 2] = brightness * 0.75;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.08,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  return new THREE.Points(geometry, material);
}

export default function About3DCarousel({ images, className, onReady }: About3DCarouselProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglFailed, setWebglFailed] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || images.length === 0) return;

    let disposed = false;
    let animationId = 0;
    const reduceMotion = prefersReducedMotion();

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030508, 0.028);
    scene.background = new THREE.Color(0x030508);

    const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 200);
    camera.position.set(0, 0.15, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    } catch {
      setWebglFailed(true);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.className = "about-carousel__canvas";
    mount.appendChild(renderer.domElement);

    const stars = createStarPoints(reduceMotion ? 900 : 1800);
    scene.add(stars);

    const ambient = new THREE.AmbientLight(0x9bb8ff, 0.35);
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.55);
    keyLight.position.set(4, 6, 2);
    const rimLight = new THREE.DirectionalLight(0xe6b450, 0.35);
    rimLight.position.set(-5, 2, -4);
    scene.add(ambient, keyLight, rimLight);

    const carousel = new THREE.Group();
    scene.add(carousel);

    const panels: PanelState[] = [];
    const textures: THREE.Texture[] = [];
    const loader = new THREE.TextureLoader();
    const count = images.length;

    const frameGeometry = new THREE.PlaneGeometry(PANEL_WIDTH + 0.12, PANEL_HEIGHT + 0.12);
    const frameMaterial = new THREE.MeshBasicMaterial({
      color: 0xe6b450,
      transparent: true,
      opacity: 0.22,
      side: THREE.DoubleSide,
    });

    images.forEach((image, index) => {
      const angle = (index / count) * Math.PI * 2;
      const yOffset = Math.sin(index * 1.15) * 0.35;

      const texture = loader.load(image.src);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      textures.push(texture);

      const material = new THREE.MeshStandardMaterial({
        map: texture,
        emissive: new THREE.Color(0x000000),
        emissiveIntensity: 0,
        roughness: 0.55,
        metalness: 0.08,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.96,
      });

      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(PANEL_WIDTH, PANEL_HEIGHT), material);
      mesh.position.set(Math.sin(angle) * RADIUS, yOffset, Math.cos(angle) * RADIUS);
      mesh.lookAt(0, yOffset, 0);
      mesh.userData.index = index;
      mesh.userData.alt = image.alt;

      const frame = new THREE.Mesh(frameGeometry, frameMaterial.clone());
      frame.position.z = -0.02;
      mesh.add(frame);

      carousel.add(mesh);
      panels.push({
        mesh,
        baseScale: new THREE.Vector3(1, 1, 1),
        targetScale: 1,
        targetGlow: 0,
        glow: 0,
        index,
      });
    });

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let hoveredIndex: number | null = null;
    let isDragging = false;
    let dragStartX = 0;
    let pointerDownX = 0;
    let dragRotation = 0;
    let autoSpeed = reduceMotion ? 0.04 : BASE_ROTATION_SPEED;
    let targetAutoSpeed = autoSpeed;
    let focusIndex: number | null = null;
    let focusTimer = 0;

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const setPointerFromEvent = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const pickPanel = (): number | null => {
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(
        panels.map((p) => p.mesh),
        false
      );
      if (hits.length === 0) return null;
      return (hits[0].object.userData.index as number) ?? null;
    };

    const focusPanel = (index: number) => {
      focusIndex = index;
      focusTimer = 1.4;
      setFocusedIndex(index);
      targetAutoSpeed = reduceMotion ? 0.02 : 0.06;
    };

    const onPointerMove = (event: PointerEvent) => {
      setPointerFromEvent(event);
      if (isDragging) {
        const delta = event.clientX - dragStartX;
        dragRotation += delta * DRAG_SENSITIVITY;
        dragStartX = event.clientX;
        return;
      }
      hoveredIndex = pickPanel();
      renderer.domElement.style.cursor = hoveredIndex !== null ? "pointer" : "grab";
    };

    const onPointerDown = (event: PointerEvent) => {
      setPointerFromEvent(event);
      isDragging = true;
      dragStartX = event.clientX;
      pointerDownX = event.clientX;
      renderer.domElement.setPointerCapture(event.pointerId);
      renderer.domElement.style.cursor = "grabbing";
    };

    const onPointerUp = (event: PointerEvent) => {
      if (isDragging) {
        const moved = Math.abs(event.clientX - pointerDownX);
        if (moved < 6) {
          const picked = pickPanel();
          if (picked !== null) focusPanel(picked);
        }
      }
      isDragging = false;
      if (renderer.domElement.hasPointerCapture(event.pointerId)) {
        renderer.domElement.releasePointerCapture(event.pointerId);
      }
      renderer.domElement.style.cursor = hoveredIndex !== null ? "pointer" : "grab";
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      targetAutoSpeed = THREE.MathUtils.clamp(
        targetAutoSpeed + event.deltaY * WHEEL_SENSITIVITY * (reduceMotion ? 0.35 : 1),
        reduceMotion ? 0.01 : 0.04,
        reduceMotion ? 0.12 : 0.55
      );
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        dragRotation -= 0.35;
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        dragRotation += 0.35;
      } else if (event.key === "Enter" || event.key === " ") {
        if (hoveredIndex !== null) {
          event.preventDefault();
          focusPanel(hoveredIndex);
        }
      }
    };

    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointerup", onPointerUp);
    renderer.domElement.addEventListener("pointerleave", onPointerUp);
    renderer.domElement.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", resize);

    resize();
    onReady?.();

    const clock = new THREE.Clock();

    const animate = () => {
      if (disposed) return;
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      autoSpeed = THREE.MathUtils.lerp(autoSpeed, targetAutoSpeed, 0.08);
      if (hoveredIndex !== null && !isDragging) {
        targetAutoSpeed = THREE.MathUtils.lerp(targetAutoSpeed, reduceMotion ? 0.02 : 0.05, 0.06);
      } else if (!isDragging && focusIndex === null) {
        targetAutoSpeed = THREE.MathUtils.lerp(
          targetAutoSpeed,
          reduceMotion ? 0.04 : BASE_ROTATION_SPEED,
          0.04
        );
      }

      if (focusIndex !== null) {
        focusTimer -= delta;
        const targetAngle = -(focusIndex / count) * Math.PI * 2;
        const current = carousel.rotation.y + dragRotation;
        const diff = Math.atan2(Math.sin(targetAngle - current), Math.cos(targetAngle - current));
        dragRotation += diff * Math.min(1, delta * 3.2);
        if (focusTimer <= 0) focusIndex = null;
      }

      carousel.rotation.y += autoSpeed * delta + dragRotation * 0.02;
      dragRotation *= 0.9;

      stars.rotation.y += delta * 0.015;
      stars.rotation.x += delta * 0.004;

      panels.forEach((panel) => {
        const isHovered = hoveredIndex === panel.index;
        const isFocused = focusIndex === panel.index;
        panel.targetScale = isFocused ? 1.18 : isHovered ? 1.1 : 1;
        panel.targetGlow = isFocused ? 0.55 : isHovered ? 0.35 : 0;

        panel.glow = THREE.MathUtils.lerp(panel.glow, panel.targetGlow, 0.12);
        const scale = THREE.MathUtils.lerp(panel.mesh.scale.x, panel.targetScale, 0.12);
        panel.mesh.scale.setScalar(scale);

        const material = panel.mesh.material as THREE.MeshStandardMaterial;
        material.emissive.setHex(0xe6b450);
        material.emissiveIntensity = panel.glow;
        material.opacity = THREE.MathUtils.lerp(material.opacity, isHovered || isFocused ? 1 : 0.92, 0.1);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(animationId);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      renderer.domElement.removeEventListener("pointerleave", onPointerUp);
      renderer.domElement.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", resize);

      panels.forEach((panel) => {
        panel.mesh.geometry.dispose();
        const material = panel.mesh.material as THREE.MeshStandardMaterial;
        material.map?.dispose();
        material.dispose();
        panel.mesh.children.forEach((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            (child.material as THREE.Material).dispose();
          }
        });
      });

      textures.forEach((texture) => texture.dispose());
      stars.geometry.dispose();
      (stars.material as THREE.Material).dispose();
      frameGeometry.dispose();
      frameMaterial.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [images, onReady]);

  if (webglFailed) {
    return (
      <div className={`about-carousel about-carousel--fallback ${className ?? ""}`}>
        <div className="about-carousel__fallback-grid">
          {images.map((image) => (
            <figure key={image.id} className="about-carousel__fallback-item">
              <img src={image.src} alt={image.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`about-carousel ${className ?? ""}`}
      ref={mountRef}
      role="region"
      aria-label="Interactive 3D image gallery. Drag to rotate, scroll to change speed, use arrow keys to navigate."
      tabIndex={0}
      data-focused-index={focusedIndex ?? undefined}
    />
  );
}
