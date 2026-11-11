import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const canvas = document.getElementById('velceria3d');
const stage = canvas?.closest('.hero-stage');
if (canvas && stage) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch (error) {
    console.warn('VECLÉRIA 3D scene unavailable; editorial fallback remains visible.', error);
    canvas.hidden = true;
  }

  if (renderer) {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.15, 8.7);

    scene.add(new THREE.HemisphereLight(0xe9ddc5, 0x10241d, 2.1));
    const key = new THREE.DirectionalLight(0xffe3b0, 4.4);
    key.position.set(-4, 5, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x9fc8b9, 3.2);
    rim.position.set(4, 2, -4);
    scene.add(rim);
    const front = new THREE.PointLight(0xffd9a0, 38, 12);
    front.position.set(2, -1, 5);
    scene.add(front);

    const product = new THREE.Group();
    scene.add(product);

    const bodyShape = new THREE.Shape();
    bodyShape.moveTo(-1.28, -0.92);
    bodyShape.lineTo(-1.18, 0.36);
    bodyShape.quadraticCurveTo(-1.12, 0.82, -0.66, 0.88);
    bodyShape.lineTo(0.66, 0.88);
    bodyShape.quadraticCurveTo(1.12, 0.82, 1.18, 0.36);
    bodyShape.lineTo(1.28, -0.92);
    bodyShape.quadraticCurveTo(1.28, -1.12, 1.06, -1.12);
    bodyShape.lineTo(-1.06, -1.12);
    bodyShape.quadraticCurveTo(-1.28, -1.12, -1.28, -0.92);

    const bodyGeometry = new THREE.ExtrudeGeometry(bodyShape, {
      depth: 0.58,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 1,
      bevelSize: 0.09,
      bevelThickness: 0.1,
      curveSegments: 18
    });
    bodyGeometry.center();
    const leather = new THREE.MeshPhysicalMaterial({
      color: 0x174337,
      metalness: 0.48,
      roughness: 0.24,
      clearcoat: 1,
      clearcoatRoughness: 0.16
    });
    const body = new THREE.Mesh(bodyGeometry, leather);
    product.add(body);

    const gold = new THREE.MeshPhysicalMaterial({
      color: 0xc9a66f,
      metalness: 0.92,
      roughness: 0.2,
      clearcoat: 1
    });

    const handleCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.72, 0.76, 0.02),
      new THREE.Vector3(-0.68, 1.55, 0.08),
      new THREE.Vector3(-0.28, 1.88, 0.1),
      new THREE.Vector3(0.28, 1.88, 0.1),
      new THREE.Vector3(0.68, 1.55, 0.08),
      new THREE.Vector3(0.72, 0.76, 0.02)
    ]);
    const handle = new THREE.Mesh(
      new THREE.TubeGeometry(handleCurve, 64, 0.075, 12, false),
      gold
    );
    product.add(handle);

    const flap = new THREE.Mesh(
      new THREE.BoxGeometry(1.52, 0.34, 0.12),
      new THREE.MeshPhysicalMaterial({ color: 0x0d2c24, metalness: 0.45, roughness: 0.26 })
    );
    flap.position.set(0, 0.38, 0.36);
    product.add(flap);

    const clasp = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.25, 0.12), gold);
    clasp.position.set(0, 0.16, 0.45);
    product.add(clasp);

    const emblem = new THREE.Mesh(
      new THREE.TorusGeometry(0.12, 0.018, 8, 36),
      gold
    );
    emblem.position.set(0, -0.35, 0.36);
    product.add(emblem);

    const pedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(1.85, 2.15, 0.12, 96),
      new THREE.MeshStandardMaterial({ color: 0x1c3029, metalness: 0.72, roughness: 0.32 })
    );
    pedestal.position.set(0, -1.78, -0.15);
    scene.add(pedestal);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.05, 0.012, 8, 120),
      new THREE.MeshBasicMaterial({ color: 0xc7a775, transparent: true, opacity: 0.55 })
    );
    ring.rotation.x = Math.PI / 2.25;
    ring.position.set(0, -1.66, -0.2);
    scene.add(ring);

    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(240 * 3);
    for (let i = 0; i < 240; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 7.5;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 5.8;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 2.2 - 1;
    }
    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dust = new THREE.Points(
      dustGeometry,
      new THREE.PointsMaterial({ color: 0xe5c895, size: 0.018, transparent: true, opacity: 0.7 })
    );
    scene.add(dust);

    product.position.y = 0.1;
    product.rotation.x = -0.04;
    product.rotation.y = -0.2;

    let pointerX = 0;
    let pointerY = 0;
    stage.addEventListener('pointermove', (event) => {
      const rect = stage.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.22;
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.12;
    }, { passive: true });
    stage.addEventListener('pointerleave', () => { pointerX = 0; pointerY = 0; });

    const resize = () => {
      const width = Math.max(1, stage.clientWidth);
      const height = Math.max(1, stage.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = width < 560 ? 10.1 : width < 900 ? 9.3 : 8.7;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(stage);
    resize();

    const fallback = stage.querySelector('.hero-garment');
    if (fallback) fallback.style.display = 'none';

    const clock = new THREE.Clock();
    const render = () => {
      const t = clock.getElapsedTime();
      if (!reducedMotion) {
        product.rotation.y = -0.2 + Math.sin(t * 0.34) * 0.28 + pointerX;
        product.rotation.x = -0.04 + Math.sin(t * 0.48) * 0.035 + pointerY;
        product.position.y = 0.1 + Math.sin(t * 0.72) * 0.075;
        ring.rotation.z = t * 0.06;
        dust.rotation.y = t * 0.012;
      }
      renderer.render(scene, camera);
      if (!reducedMotion) requestAnimationFrame(render);
    };
    render();
  }
}