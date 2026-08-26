import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";
import { RELIGIONS } from "../data/religions";
import { usePageSeo } from "../lib/seo";
import { withLocale, useLocale } from "../lib/locale";

const FAMILY_COLORS: Record<string, number> = {
  Abrahamic: 0xe6b450,
  Indian: 0x5fbf8f,
  Iranian: 0x9b7de0,
  "East Asian": 0xd8485b,
  "Indo-European": 0x3fb8af,
  Indigenous: 0xf0933b,
  African: 0xe0708e,
  Modern: 0x6a7bd8,
};

export default function Sky() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    stars: THREE.Points;
    raycaster: THREE.Raycaster;
    mouse: THREE.Vector2;
    traditions: Array<{ position: THREE.Vector3; religion: typeof RELIGIONS[0]; sprite: THREE.Sprite }>;
  } | null>(null);
  const animationRef = useRef<number>();
  const [hoveredTradition, setHoveredTradition] = useState<(typeof RELIGIONS)[0] | null>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const locale = useLocale();

  usePageSeo({
    title: "Sky — World Religions Explorer",
    description: "An interactive constellation of 44 religious traditions across time and culture.",
    path: "/sky",
  });

  useEffect(() => {
    if (reducedMotion || !containerRef.current) {
      return;
    }

    // Check WebGL support
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080b11, 0.015);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Background starfield
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.7,
      transparent: true,
      opacity: 0.6,
    });
    const starVertices = [];
    for (let i = 0; i < 2000; i++) {
      const x = (Math.random() - 0.5) * 200;
      const y = (Math.random() - 0.5) * 200;
      const z = (Math.random() - 0.5) * 200;
      starVertices.push(x, y, z);
    }
    starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Create tradition nodes clustered by family
    const traditions: Array<{ position: THREE.Vector3; religion: (typeof RELIGIONS)[0]; sprite: THREE.Sprite }> = [];
    const familyGroups = RELIGIONS.reduce((acc, r) => {
      if (!acc[r.family]) acc[r.family] = [];
      acc[r.family].push(r);
      return acc;
    }, {} as Record<string, typeof RELIGIONS>);

    let clusterIndex = 0;
    Object.entries(familyGroups).forEach(([family, rels]) => {
      const angle = (clusterIndex / Object.keys(familyGroups).length) * Math.PI * 2;
      const clusterRadius = 25;
      const clusterX = Math.cos(angle) * clusterRadius;
      const clusterY = Math.sin(angle) * clusterRadius;

      rels.forEach((religion, idx) => {
        const localAngle = (idx / rels.length) * Math.PI * 2;
        const localRadius = 3 + Math.random() * 2;
        const x = clusterX + Math.cos(localAngle) * localRadius;
        const y = clusterY + Math.sin(localAngle) * localRadius;
        const z = (Math.random() - 0.5) * 10;

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d")!;
        canvas.width = 128;
        canvas.height = 128;
        const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
        gradient.addColorStop(0, `rgba(${(FAMILY_COLORS[family] >> 16) & 0xff}, ${(FAMILY_COLORS[family] >> 8) & 0xff}, ${FAMILY_COLORS[family] & 0xff}, 1)`);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        context.fillStyle = gradient;
        context.fillRect(0, 0, 128, 128);

        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.position.set(x, y, z);
        sprite.scale.set(1.5, 1.5, 1);
        sprite.userData = { religion };
        scene.add(sprite);

        traditions.push({ position: new THREE.Vector3(x, y, z), religion, sprite });
      });

      clusterIndex++;
    });

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    sceneRef.current = {
      scene,
      camera,
      renderer,
      stars,
      raycaster,
      mouse,
      traditions,
    };

    // Animation loop
    let time = 0;
    const animate = () => {
      time += 0.001;
      stars.rotation.y = time * 0.05;
      camera.position.x = Math.sin(time * 0.1) * 2;
      camera.position.y = Math.cos(time * 0.15) * 1.5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Mouse interaction
    const onMouseMove = (event: MouseEvent) => {
      const ref = sceneRef.current;
      if (!ref) return;
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      const { raycaster, camera } = ref;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        ref.traditions.map((t) => t.sprite)
      );

      if (intersects.length > 0) {
        const hovered = intersects[0].object.userData.religion;
        setHoveredTradition(hovered);
        document.body.style.cursor = "pointer";
      } else {
        setHoveredTradition(null);
        document.body.style.cursor = "default";
      }
    };

    const onClick = () => {
      if (!sceneRef.current || !hoveredTradition) return;
      window.location.href = withLocale(locale, `/religion/${hoveredTradition.id}`);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onClick);

    const onResize = () => {
      if (!sceneRef.current) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (sceneRef.current) {
        sceneRef.current.renderer.dispose();
        containerRef.current?.removeChild(sceneRef.current.renderer.domElement);
      }
    };
  }, [hoveredTradition, locale]);

  if (reducedMotion || !webglSupported) {
    return (
      <div className="sky-fallback">
        <div className="sky-fallback__content">
          <h1 className="sky-fallback__title">World Religions Explorer</h1>
          <p className="sky-fallback__lead">
            A constellation of 44 religious traditions across time and culture.
          </p>
          <div className="sky-fallback__grid">
            {Object.entries(
              RELIGIONS.reduce((acc, r) => {
                if (!acc[r.family]) acc[r.family] = [];
                acc[r.family].push(r);
                return acc;
              }, {} as Record<string, typeof RELIGIONS>)
            ).map(([family, rels]) => (
              <div key={family} className="sky-fallback__family">
                <h2 className="sky-fallback__family-name">{family}</h2>
                <ul className="sky-fallback__list">
                  {rels.map((r) => (
                    <li key={r.id}>
                      <Link to={withLocale(locale, `/religion/${r.id}`)}>{r.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="sky-fallback__actions">
            <Link to={withLocale(locale, "/traditions")} className="btn btn--primary">
              Browse All Traditions
            </Link>
            <Link to={withLocale(locale, "/timeline")} className="btn btn--ghost">
              View Timeline
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sky">
      <div ref={containerRef} className="sky__canvas" />
      <div className="sky__hud">
        <h1 className="sky__title">World Religions Explorer</h1>
        <p className="sky__premise">A constellation of 44 traditions across time and culture</p>
        <div className="sky__actions">
          <Link to={withLocale(locale, "/traditions")} className="btn btn--primary btn--sm">
            Browse All
          </Link>
          <Link to={withLocale(locale, "/timeline")} className="btn btn--ghost btn--sm">
            Timeline
          </Link>
        </div>
      </div>
      {hoveredTradition && (
        <div className="sky__tooltip">
          <div className="sky__tooltip-name">{hoveredTradition.name}</div>
          <div className="sky__tooltip-meta">
            {hoveredTradition.family} · {hoveredTradition.origin < 0 ? `${Math.abs(hoveredTradition.origin)} BCE` : `${hoveredTradition.origin} CE`}
          </div>
        </div>
      )}
    </div>
  );
}
