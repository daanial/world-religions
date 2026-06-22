import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { SITES, latLngToVec3, type SacredSite } from "../data/sites";

interface GlobeProps {
  selectedId: string | null;
  onSelect: (site: SacredSite) => void;
}

/**
 * Rotatable Earth with glowing pins. Clicking a pin (or calling flyTo)
 * animates the camera to that location via GSAP.
 *
 * Country borders come from Natural Earth 110m (GeoJSON in /public).
 */
export default function Globe({ selectedId, onSelect }: GlobeProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<{
    flyTo: (id: string) => void;
    setSelected: (id: string | null) => void;
  } | null>(null);

  // expose flyTo when external selection changes
  useEffect(() => {
    if (selectedId && stateRef.current) stateRef.current.flyTo(selectedId);
    else if (!selectedId && stateRef.current) stateRef.current.setSelected(null);
  }, [selectedId]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 3.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const RADIUS = 1;

    // ---- Globe: dark sphere with fresnel glow ----
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS, 64, 64),
      new THREE.MeshPhongMaterial({
        color: 0x0b1424,
        emissive: 0x050a14,
        shininess: 8,
        transparent: true,
        opacity: 0.92,
      })
    );
    globeGroup.add(sphere);

    // country borders — loaded from Natural Earth 110m GeoJSON
    let borders: THREE.LineSegments | null = null;
    const borderAbort = new AbortController();
    fetch("/world-borders-110m.geojson", { signal: borderAbort.signal })
      .then((res) => res.json())
      .then((geojson: BordersGeoJSON) => {
        const positions = borderLinesFromGeoJSON(geojson, RADIUS * 1.004);
        const borderGeo = new THREE.BufferGeometry();
        borderGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        borders = new THREE.LineSegments(
          borderGeo,
          new THREE.LineBasicMaterial({
            color: 0x5ec4bc,
            transparent: true,
            opacity: 0.72,
          })
        );
        globeGroup.add(borders);
      })
      .catch(() => {
        /* offline or missing asset — globe still works without borders */
      });

    // latitude/longitude grid
    const grid = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.SphereGeometry(RADIUS * 1.001, 24, 16)),
      new THREE.LineBasicMaterial({ color: 0x2a4560, transparent: true, opacity: 0.55 })
    );
    globeGroup.add(grid);

    // visible sphere rim — defines the globe edge against the dark stage
    const rim = new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS * 1.008, 72, 72),
      new THREE.MeshBasicMaterial({
        color: 0x3fb8af,
        transparent: true,
        opacity: 0.22,
        wireframe: true,
      })
    );
    globeGroup.add(rim);

    // atmosphere fresnel
    const atmosphereMat = new THREE.ShaderMaterial({
      uniforms: { c: { value: 0.72 }, p: { value: 3.2 }, glowColor: { value: new THREE.Color(0x3fb8af) } },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        uniform float c;
        uniform float p;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(c - dot(vNormal, vec3(0.0, 0.0, 1.0)), p);
          gl_FragColor = vec4(glowColor, 1.0) * intensity;
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS * 1.14, 48, 48),
      atmosphereMat
    );
    globeGroup.add(atmosphere);

    // ---- Lighting ----
    scene.add(new THREE.AmbientLight(0x404a66, 1.2));
    const dirLight = new THREE.DirectionalLight(0xfff0d0, 1.0);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);

    // ---- Pins ----
    const pins: { site: SacredSite; mesh: THREE.Group; beam: THREE.Mesh; ring: THREE.Mesh }[] = [];
    SITES.forEach((site) => {
      const pinGroup = new THREE.Group();
      const [x, y, z] = latLngToVec3(site.lat, site.lng, RADIUS);
      const pos = new THREE.Vector3(x, y, z);
      pinGroup.position.copy(pos);
      // orient outward
      pinGroup.lookAt(pos.clone().multiplyScalar(2));

      // glowing dot
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.018, 16, 16),
        new THREE.MeshBasicMaterial({ color: new THREE.Color(site.accent) })
      );
      pinGroup.add(dot);

      // vertical beam
      const beam = new THREE.Mesh(
        new THREE.CylinderGeometry(0.004, 0.004, 0.16, 8),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(site.accent),
          transparent: true,
          opacity: 0.7,
        })
      );
      beam.position.copy(new THREE.Vector3(0, 0, 0.08));
      beam.rotation.x = Math.PI / 2;
      pinGroup.add(beam);

      // pulse ring (faces outward)
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.025, 0.05, 24),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(site.accent),
          transparent: true,
          opacity: 0.5,
          side: THREE.DoubleSide,
        })
      );
      pinGroup.add(ring);

      globeGroup.add(pinGroup);
      pins.push({ site, mesh: pinGroup, beam, ring });
    });

    // ---- Interaction: drag to rotate, click to select ----
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const rotation = { x: 0.15, y: 0 };
    const targetRotation = { x: 0.15, y: 0 };
    let autoRotate = true;
    let isDragging = false;
    let dragStart = { x: 0, y: 0 };
    let dragMoved = false;
    let downTime = 0;

    const dom = renderer.domElement;
    dom.style.cursor = "grab";

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      dragMoved = false;
      dragStart = { x: e.clientX, y: e.clientY };
      downTime = performance.now();
      autoRotate = false;
      dom.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      // update pointer for hover detection
      const rect = dom.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;
        if (Math.abs(dx) + Math.abs(dy) > 4) dragMoved = true;
        targetRotation.y += dx * 0.005;
        targetRotation.x += dy * 0.005;
        targetRotation.x = Math.max(-1.2, Math.min(1.2, targetRotation.x));
        dragStart = { x: e.clientX, y: e.clientY };
      } else {
        // hover detection
        raycaster.setFromCamera(pointer, camera);
        const hits = raycaster.intersectObjects(pins.map((p) => p.mesh), true);
        dom.style.cursor = hits.length ? "pointer" : "grab";
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      isDragging = false;
      dom.style.cursor = "grab";
      // treat as click if not dragged
      if (!dragMoved && performance.now() - downTime < 350) {
        const rect = dom.getBoundingClientRect();
        pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        const hits = raycaster.intersectObjects(pins.map((p) => p.mesh), true);
        if (hits.length) {
          const pin = pins.find((p) => p.mesh === hits[0].object.parent);
          if (pin) {
            onSelect(pin.site);
          }
        }
      }
      // resume auto-rotate after a pause
      window.setTimeout(() => {
        if (!isDragging) autoRotate = true;
      }, 4000);
    };

    dom.addEventListener("pointerdown", onPointerDown);
    dom.addEventListener("pointermove", onPointerMove);
    dom.addEventListener("pointerup", onPointerUp);
    dom.addEventListener("pointerleave", onPointerUp);

    // ---- Fly-to: rotate globe so the site faces camera ----
    const flyTo = (id: string) => {
      const pin = pins.find((p) => p.site.id === id);
      if (!pin) return;
      autoRotate = false;
      const [x, y, z] = latLngToVec3(pin.site.lat, pin.site.lng, 1);
      // We want the site to face +Z (toward camera). Compute required rotation.
      // current world position of pin = globeGroup.rotation applied to (x,y,z)
      // Target rotation.y such that longitude faces front; rotation.x for latitude.
      const targetLng = Math.atan2(-x, z); // rough
      const targetLat = Math.asin(y);
      gsap.to(targetRotation, {
        y: targetLng,
        x: targetLat,
        duration: 1.4,
        ease: "power3.inOut",
        onComplete: () => {
          window.setTimeout(() => {
            autoRotate = true;
          }, 5000);
        },
      });
      // zoom in slightly then out
      gsap.to(camera.position, {
        z: 2.4,
        duration: 0.9,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 1,
      });
      // pulse the pin
      gsap.fromTo(
        pin.ring.scale,
        { x: 1, y: 1, z: 1 },
        { x: 3, y: 3, z: 3, duration: 1.2, ease: "power2.out", repeat: 3 }
      );
    };

    const setSelected = (id: string | null) => {
      pins.forEach((p) => {
        const isSelected = p.site.id === id;
        gsap.to(p.mesh.scale, {
          x: isSelected ? 1.5 : 1,
          y: isSelected ? 1.5 : 1,
          z: isSelected ? 1.5 : 1,
          duration: 0.4,
        });
      });
    };

    stateRef.current = { flyTo, setSelected };

    // ---- Animation loop ----
    let rafId = 0;
    const clock = new THREE.Clock();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (autoRotate && !reduceMotion) {
        targetRotation.y += 0.0015;
      }
      // smooth toward target
      rotation.x += (targetRotation.x - rotation.x) * 0.08;
      rotation.y += (targetRotation.y - rotation.y) * 0.08;
      globeGroup.rotation.x = rotation.x;
      globeGroup.rotation.y = rotation.y;

      // pulse rings
      pins.forEach((p, i) => {
        const phase = (t * 1.2 + i * 0.7) % 2;
        const s = 1 + phase * 0.8;
        p.ring.scale.set(s, s, s);
        (p.ring.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.6 - phase * 0.3);
      });

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
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    return () => {
      borderAbort.abort();
      cancelAnimationFrame(rafId);
      ro.disconnect();
      dom.removeEventListener("pointerdown", onPointerDown);
      dom.removeEventListener("pointermove", onPointerMove);
      dom.removeEventListener("pointerup", onPointerUp);
      dom.removeEventListener("pointerleave", onPointerUp);
      sphere.geometry.dispose();
      (sphere.material as THREE.Material).dispose();
      if (borders) {
        borders.geometry.dispose();
        (borders.material as THREE.Material).dispose();
      }
      grid.geometry.dispose();
      (grid.material as THREE.Material).dispose();
      rim.geometry.dispose();
      (rim.material as THREE.Material).dispose();
      atmosphereMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
      stateRef.current = null;
    };
  }, [onSelect]);

  return <div ref={mountRef} className="globe-mount" />;
}

/* ---------------- Country borders (Natural Earth 110m) ---------------- */

interface BordersGeoJSON {
  features: Array<{
    geometry: {
      type: string;
      coordinates: unknown;
    };
  }>;
}

function borderLinesFromGeoJSON(geojson: BordersGeoJSON, radius: number): Float32Array {
  const verts: number[] = [];

  const addRing = (coords: number[][]) => {
    for (let i = 0; i < coords.length - 1; i++) {
      const [lng1, lat1] = coords[i];
      const [lng2, lat2] = coords[i + 1];
      if (!Number.isFinite(lat1) || !Number.isFinite(lat2)) continue;
      const [x1, y1, z1] = latLngToVec3(lat1, lng1, radius);
      const [x2, y2, z2] = latLngToVec3(lat2, lng2, radius);
      verts.push(x1, y1, z1, x2, y2, z2);
    }
  };

  const walk = (geom: BordersGeoJSON["features"][0]["geometry"]) => {
    const { type, coordinates } = geom;
    if (type === "LineString") addRing(coordinates as number[][]);
    else if (type === "MultiLineString")
      (coordinates as number[][][]).forEach(addRing);
    else if (type === "Polygon")
      (coordinates as number[][][]).forEach(addRing);
    else if (type === "MultiPolygon")
      (coordinates as number[][][][]).forEach((poly) => poly.forEach(addRing));
  };

  geojson.features.forEach((f) => walk(f.geometry));
  return new Float32Array(verts);
}
