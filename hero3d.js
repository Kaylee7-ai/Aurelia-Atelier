/* hero3d.js: cinematic gold sculpture for the VECLÉRIA hero (Three.js r128).
   If WebGL or Three.js is unavailable, the hero simply keeps its green gradient. */
(function () {
  var canvas = document.getElementById("hero3d");
  if (!canvas || typeof THREE === "undefined") return;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true }); } catch (e) { return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 7;
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  var warm = new THREE.PointLight(0xf0dfb4, 2.4, 40); warm.position.set(4, 4, 6); scene.add(warm);
  var cool = new THREE.PointLight(0x5fd8a8, 1.3, 40); cool.position.set(-5, -2, 4); scene.add(cool);

  var gold = new THREE.MeshStandardMaterial({ color: 0xc9a96e, metalness: 0.75, roughness: 0.28, emissive: 0x3a2a0c, emissiveIntensity: 0.4 });
  var group = new THREE.Group(); scene.add(group);
  var knot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.95, 0.26, 180, 24, 2, 3), gold); group.add(knot);
  var ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.9, 0.025, 16, 160), gold); ring1.rotation.x = 1.2; group.add(ring1);
  var ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.45, 0.02, 16, 160), gold); ring2.rotation.y = 1.1; group.add(ring2);

  var N = 180, pos = new Float32Array(N * 3);
  for (var i = 0; i < N; i++) {
    var r = 3 + Math.random() * 3, a = Math.random() * Math.PI * 2, b = Math.acos(2 * Math.random() - 1);
    pos[i * 3] = r * Math.sin(b) * Math.cos(a); pos[i * 3 + 1] = r * Math.sin(b) * Math.sin(a); pos[i * 3 + 2] = r * Math.cos(b);
  }
  var geo = new THREE.BufferGeometry(); geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  var dust = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xe7d3a4, size: 0.04, transparent: true, opacity: 0.8 }));
  scene.add(dust);

  function resize() {
    var w = canvas.clientWidth, h = canvas.clientHeight; if (!w || !h) return;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
    group.position.x = w > 900 ? 2.4 : 0; group.scale.setScalar(w > 900 ? 1 : 0.7);
  }
  window.addEventListener("resize", resize); resize();

  var mx = 0, my = 0;
  window.addEventListener("pointermove", function (e) { mx = (e.clientX / window.innerWidth - 0.5); my = (e.clientY / window.innerHeight - 0.5); }, { passive: true });

  var visible = true;
  if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }).observe(canvas);

  var t = 0;
  function frame() {
    requestAnimationFrame(frame);
    if (!visible) return;
    t += reduce ? 0 : 0.006;
    knot.rotation.x = t * 0.9; knot.rotation.y = t * 1.3;
    ring1.rotation.z = t * 0.7; ring2.rotation.x = t * 0.5;
    dust.rotation.y = t * 0.15;
    group.position.y = Math.sin(t * 2) * 0.12;
    group.rotation.y += (mx * 0.8 - group.rotation.y) * 0.04;
    group.rotation.x += (my * 0.5 - group.rotation.x) * 0.04;
    renderer.render(scene, camera);
  }
  frame();
})();