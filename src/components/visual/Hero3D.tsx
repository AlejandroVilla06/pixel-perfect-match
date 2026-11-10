import { useEffect, useRef, useState } from "react";
import heroStructure from "@/assets/hero-structure.jpg";
import { cn } from "@/lib/utils";

const layerLabels = [
  { label: "Frontend", pos: "left-[4%] top-[18%]" },
  { label: "Backend", pos: "right-[2%] top-[34%]" },
  { label: "Full Stack", pos: "right-[8%] bottom-[22%]" },
  { label: "AI", pos: "left-[10%] bottom-[30%]" },
];

function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Interconnected floating layers (Frontend / Backend / Full Stack / AI).
 * Three.js is imported lazily after hydration on larger screens only; the static render is
 * shown first, on mobile, without WebGL and for reduced-motion users.
 */
export function Hero3D({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || window.innerWidth < 768 || !supportsWebGL()) return;

    let disposed = false;
    let cleanup = () => {};

    import("three").then((THREE) => {
      if (disposed || !mountRef.current) return;
      const css = getComputedStyle(document.documentElement);
      const violet = new THREE.Color("#8B5CF6");
      const cyan = new THREE.Color("#22D3EE");
      void css;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
      camera.position.set(6.5, 5.2, 8.5);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);
      renderer.domElement.setAttribute("aria-hidden", "true");
      renderer.domElement.className = "absolute inset-0 size-full";

      scene.add(new THREE.AmbientLight(0xffffff, 0.35));
      const l1 = new THREE.PointLight(violet, 40, 30);
      l1.position.set(-4, 3, 4);
      const l2 = new THREE.PointLight(cyan, 30, 30);
      l2.position.set(4, -1, 3);
      scene.add(l1, l2);

      const root = new THREE.Group();
      scene.add(root);

      const layers: THREE.Group[] = [];
      const geos: THREE.BufferGeometry[] = [];
      const mats: THREE.Material[] = [];
      const levels = [1.35, 0.45, -0.45, -1.35];

      levels.forEach((y, i) => {
        const t = i / (levels.length - 1);
        const color = violet.clone().lerp(cyan, t);
        const g = new THREE.Group();
        const size = 2.6 - i * 0.12;
        const box = new THREE.BoxGeometry(size, 0.08, size);
        const mat = new THREE.MeshStandardMaterial({
          color,
          transparent: true,
          opacity: 0.16,
          metalness: 0.3,
          roughness: 0.15,
          emissive: color,
          emissiveIntensity: 0.12,
        });
        const mesh = new THREE.Mesh(box, mat);
        const edges = new THREE.EdgesGeometry(box);
        const lineMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.9 });
        const lines = new THREE.LineSegments(edges, lineMat);
        // Inner grid on each layer
        const grid = new THREE.GridHelper(size * 0.92, 6, color, color);
        (grid.material as THREE.Material).transparent = true;
        (grid.material as THREE.Material).opacity = 0.18;
        grid.position.y = 0.045;
        g.add(mesh, lines, grid);
        g.position.y = y;
        root.add(g);
        layers.push(g);
        geos.push(box, edges);
        mats.push(mat, lineMat, grid.material as THREE.Material);
      });

      // Connectors + nodes between layers
      const nodeGeo = new THREE.SphereGeometry(0.045, 12, 12);
      const nodeMat = new THREE.MeshBasicMaterial({ color: 0xf5f7ff });
      geos.push(nodeGeo);
      mats.push(nodeMat);
      const corners = [
        [1, 1],
        [-1, 1],
        [1, -1],
        [-1, -1],
        [0, 0],
      ];
      const pts: number[] = [];
      corners.forEach(([x, z]) => {
        const s = 1.1;
        pts.push(x * s, levels[0], z * s, x * s, levels[3], z * s);
        levels.forEach((y) => {
          const n = new THREE.Mesh(nodeGeo, nodeMat);
          n.position.set(x * s, y, z * s);
          root.add(n);
        });
      });
      const connGeo = new THREE.BufferGeometry();
      connGeo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
      const connMat = new THREE.LineBasicMaterial({ color: 0xf5f7ff, transparent: true, opacity: 0.25 });
      root.add(new THREE.LineSegments(connGeo, connMat));
      geos.push(connGeo);
      mats.push(connMat);

      const pointer = { x: 0, y: 0 };
      const onPointer = (e: PointerEvent) => {
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener("pointermove", onPointer, { passive: true });

      const resize = () => {
        const { clientWidth: w, clientHeight: h } = mount;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      const ro = new ResizeObserver(resize);
      ro.observe(mount);
      resize();

      let visible = true;
      const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
      io.observe(mount);

      let raf = 0;
      const clock = new THREE.Clock();
      const tick = () => {
        raf = requestAnimationFrame(tick);
        if (!visible || document.hidden) return;
        const t = clock.getElapsedTime();
        root.rotation.y = t * 0.12 + pointer.x * 0.25;
        root.rotation.x += (pointer.y * 0.12 - root.rotation.x) * 0.05;
        layers.forEach((g, i) => {
          g.position.y = levels[i] + Math.sin(t * 0.8 + i * 0.9) * 0.07;
          g.rotation.y = Math.sin(t * 0.3 + i) * 0.12;
        });
        renderer.render(scene, camera);
      };
      tick();
      setLive(true);

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        window.removeEventListener("pointermove", onPointer);
        geos.forEach((g) => g.dispose());
        mats.forEach((m) => m.dispose());
        renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div className={cn("relative aspect-square w-full", className)}>
      <div aria-hidden="true" className="glow-violet absolute inset-[8%] opacity-80" />
      <div aria-hidden="true" className="glow-cyan absolute inset-[25%] translate-x-[15%] translate-y-[10%] opacity-70" />
      <img
        src={heroStructure}
        alt=""
        width={1280}
        height={1280}
        fetchPriority="high"
        className={cn(
          "absolute inset-0 size-full object-contain mix-blend-screen transition-opacity duration-1000",
          live ? "opacity-0" : "opacity-100 animate-float",
        )}
      />
      <div ref={mountRef} className="absolute inset-0" />
      <ul aria-label="Layers of the stack" className="pointer-events-none absolute inset-0">
        {layerLabels.map((l) => (
          <li
            key={l.label}
            className={cn(
              "absolute flex items-center gap-2 rounded-full border border-line-strong bg-background/60 px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-foreground/85 backdrop-blur-md",
              l.pos,
            )}
          >
            <span className="size-1.5 rounded-full bg-cyan" aria-hidden="true" />
            {l.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
