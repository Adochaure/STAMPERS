/* eslint-disable @typescript-eslint/no-explicit-any */

declare module "three" {
  const THREE: any;
  export = THREE;
}

declare module "three/examples/jsm/loaders/GLTFLoader.js" {
  export const GLTFLoader: any;
}

declare module "three/examples/jsm/geometries/DecalGeometry.js" {
  export const DecalGeometry: any;
}

declare module "three/examples/jsm/controls/OrbitControls.js" {
  export const OrbitControls: any;
}
