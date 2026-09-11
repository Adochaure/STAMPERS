"use client";

/* Three's declarations are bridged locally until @types/three is available. */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

type Page3Props = {
  modelUrl?: string;
};

const DEFAULT_MODEL_URL = "/stamp.glb";

type SphereStyle = {
  background: string;
};

const SPHERE_STYLES: Record<string, SphereStyle> = {
  Sphere_1: {
    background:
      "linear-gradient(135deg, #EC4920 0%, #403434 35%, #9E9898 65%, #5A1B09 100%)",
  },

  Sphere_2: {
    background:
      "linear-gradient(225deg, #5A1B09 0%, #9E9898 35%, #403434 65%, #EC4920 100%)",
  },

  Sphere_3: {
    background:
      "linear-gradient(45deg, #403434 0%, #EC4920 35%, #5A1B09 65%, #9E9898 100%)",
  },

  Sphere_4: {
    background:
      "linear-gradient(180deg, #9E9898 0%, #5A1B09 35%, #EC4920 65%, #403434 100%)",
  },

  Sphere_5: {
    background:
      "linear-gradient(90deg, #EC4920 0%, #9E9898 30%, #5A1B09 65%, #403434 100%)",
  },

  Sphere_6: {
    background:
      "linear-gradient(315deg, #403434 0%, #5A1B09 35%, #EC4920 65%, #9E9898 100%)",
  },

  Sphere_7: {
    background:
      "linear-gradient(135deg, #9E9898 0%, #EC4920 35%, #403434 65%, #5A1B09 100%)",
  },

  Sphere_8: {
    background:
      "linear-gradient(60deg, #5A1B09 0%, #EC4920 35%, #9E9898 65%, #403434 100%)",
  },

  Sphere_9: {
    background:
      "linear-gradient(240deg, #EC4920 0%, #5A1B09 35%, #403434 65%, #9E9898 100%)",
  },

  Sphere_10: {
    background:
      "linear-gradient(30deg, #403434 0%, #9E9898 35%, #EC4920 65%, #5A1B09 100%)",
  },
};

function createSphereGradientTexture(style: SphereStyle) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;

  const context = canvas.getContext("2d");
  if (!context) return null;

  const gradientMatch = style.background.match(
    /^linear-gradient\(([-\d.]+)deg, (.+)\)$/,
  );
  if (gradientMatch) {
    const angle = (Number(gradientMatch[1]) * Math.PI) / 180;
    const directionX = Math.sin(angle);
    const directionY = -Math.cos(angle);
    const halfDiagonal = Math.hypot(canvas.width, canvas.height) / 2;
    const gradient = context.createLinearGradient(
      canvas.width / 2 - directionX * halfDiagonal,
      canvas.height / 2 - directionY * halfDiagonal,
      canvas.width / 2 + directionX * halfDiagonal,
      canvas.height / 2 + directionY * halfDiagonal,
    );
    gradientMatch[2].split(/, (?=#|rgb|hsl)/i).forEach((stop) => {
      const stopMatch = stop.match(/(.+) (\d+)%$/);
      if (stopMatch) {
        gradient.addColorStop(Number(stopMatch[2]) / 100, stopMatch[1]);
      }
    });
    context.fillStyle = gradient;
  } else {
    context.fillStyle = style.background;
  }
  context.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

export default function Page3({ modelUrl = DEFAULT_MODEL_URL }: Page3Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const distanceLabelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#c8bfba");

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0.55, 2.929);

    let renderer: any;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const ambientLight = new THREE.HemisphereLight("#ffffff", "#17205f", 3);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight("#ffffff", 2.4);
    keyLight.position.set(3, 4, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.PointLight("#ffcf8a", 6, 12);
    fillLight.position.set(-4, 1, 3);
    scene.add(fillLight);

    const controls = new OrbitControls(camera, canvas);
    controls.enabled = false;
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = true;
    controls.minDistance = 2;
    controls.maxDistance = 9;
    controls.target.set(0, 0.2, 0);

    const modelRoot = new THREE.Group();
    scene.add(modelRoot);

    const clock = new THREE.Clock();
    let mixer: any = null;
    const gradientTextures: any[] = [];
    let isDisposed = false;

    const loader = new GLTFLoader();
    loader.load(
      modelUrl,
      (gltf: any) => {
        const model = gltf.scene;
        const bounds = new THREE.Box3().setFromObject(model);
        const size = bounds.getSize(new THREE.Vector3());
        const center = bounds.getCenter(new THREE.Vector3());
        const largestSide = Math.max(size.x, size.y, size.z) || 1;
        const scale = 1.6 / largestSide;

        model.scale.setScalar(scale);
        model.position.set(
          -center.x * scale,
          -center.y * scale,
          -center.z * scale,
        );

        modelRoot.add(model);
        modelRoot.updateMatrixWorld(true);

        model.traverse((object: any) => {
          if (object instanceof THREE.Mesh) {
            object.castShadow = true;
            object.receiveShadow = true;

            const sphereEntry = Object.entries(SPHERE_STYLES).find(
              ([meshName]) =>
                object.name === meshName ||
                object.name.startsWith(`${meshName}.`) ||
                object.name.startsWith(`${meshName}_`),
            );
            if (!sphereEntry) return;

            const [, style] = sphereEntry;
            const gradientTexture = createSphereGradientTexture(style);
            if (!gradientTexture) return;

            gradientTextures.push(gradientTexture);
            const materials = Array.isArray(object.material)
              ? object.material
              : [object.material];
            materials.forEach((material: any) => {
              material.map = gradientTexture;
              material.color?.set("#ffffff");
              material.needsUpdate = true;
            });
          }
        });

        if (gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          gltf.animations.forEach((clip: any) => {
            mixer.clipAction(clip).play();
          });
        }
      },
      undefined,
      (error: unknown) => {
        console.warn(`Unable to load GLB at ${modelUrl}`, error);
      },
    );

    const resize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    let animationFrame = 0;
    const animate = () => {
      mixer?.update(clock.getDelta());
      controls.update();
      if (distanceLabelRef.current) {
        distanceLabelRef.current.textContent = camera.position
          .distanceTo(controls.target)
          .toFixed(2);
      }
      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(animate);
    };
    animate();

    return () => {
      isDisposed = true;
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      controls.dispose();
      mixer?.stopAllAction();
      renderer.dispose();
      gradientTextures.forEach((texture) => texture.dispose());
      modelRoot.traverse((object: any) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();

        const materials = Array.isArray(object.material)
          ? object.material
          : [object.material];
        materials.forEach((material: any) => material.dispose());
      });
    };
  }, [modelUrl]);

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-[#101cf5] text-white">
      <canvas
        ref={canvasRef}
        aria-label="Interactive 3D model viewer"
        className="absolute inset-0 h-full w-full"
      />
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 sm:p-10">
        <div className="flex items-start justify-between gap-6 font-mono text-[10px] uppercase tracking-[0.25em] sm:text-xs">
          <span>Page 03 / Object Study</span>
          <span>
            Cam dist <span ref={distanceLabelRef}>5.00</span>
          </span>
        </div>
        <div className="max-w-sm">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em]">
            Three.js / GLB
          </p>
          <h2 className="text-5xl leading-[0.9] sm:text-7xl">A new impression.</h2>
        </div>
      </div>
    </section>
  );
}
