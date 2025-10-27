// DetectorClickHover.js
document.addEventListener("DOMContentLoaded", () => {
  const { escenario, sceneEl } = OpenCentralGlobals; // asegura que ya están cargados
  escenario.addEventListener("model-loaded", (ev) => {
    const modelRoot = escenario.getObject3D("mesh") || ev.detail.model;
    if (!modelRoot) {
      console.error("❌ No se encontró modelRoot en #escenario");
      return;
    }
    console.log("✅ DetectorClickHover activo — esperando interacciones.");
    // Reunir todos los meshes válidos
    const interactiveMeshes = [];
    modelRoot.traverse((child) => {
      if (child.isMesh && !child.name.startsWith("Escena")) {
        interactiveMeshes.push(child);
      }
    });
    if (interactiveMeshes.length === 0) {
      console.warn("⚠️ No se encontraron meshes interactivos (sin 'Escena').");
    } else {
      console.log(
        `🎨 Meshes detectados (${interactiveMeshes.length}):`,
        interactiveMeshes.map((m) => m.name)
      );
    }
    // Raycaster manual + ratón
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    // Variables para distinguir click real
    let mouseDownPos = { x: 0, y: 0 };
    const CLICK_THRESHOLD = 5; // píxeles de tolerancia
    let hoveredMesh = null;
    // Detectar hover (desactivado de momento). // Detectar hover manteniendo click al mover. Detallar solo si luego queremos hacer algo más controlado (por ejemplo, “gaze hover” o “hover estable”).
    function onPointerMove(event) {
      const rect = sceneEl.canvas.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      const camera = sceneEl.camera;
      if (!camera) return;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes, true);

      if (intersects.length > 0) {
        const mesh = intersects[0].object;
        if (mesh !== hoveredMesh) {
          hoveredMesh = mesh;
          //console.log(`🟢 MESH HOVER: ${mesh.name}`);
        }
      } else {
        hoveredMesh = null;
      }
    }
    // Guardar posición al presionar
    function onPointerDown(event) {
      mouseDownPos.x = event.clientX;
      mouseDownPos.y = event.clientY;
    }
    // Detectar click solo si no hubo movimiento
    function onPointerUp(event) {
      const dx = Math.abs(event.clientX - mouseDownPos.x);
      const dy = Math.abs(event.clientY - mouseDownPos.y);
      const movedTooMuch = dx > CLICK_THRESHOLD || dy > CLICK_THRESHOLD;
      if (movedTooMuch) return; // No es click, fue movimiento
      const rect = sceneEl.canvas.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      const camera = sceneEl.camera;
      if (!camera) return;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes, true);
      if (intersects.length > 0) {
        const mesh = intersects[0].object;
        console.log(`🔴 CLICK REAL: ${mesh.name}`);
        resaltarMesh(mesh);
      }
    }

    // Conectar eventos
    function attachPointerEvents() {
      const attach = () => {
        sceneEl.canvas.addEventListener("pointermove", onPointerMove);
        sceneEl.canvas.addEventListener("pointerdown", onPointerDown);
        sceneEl.canvas.addEventListener("pointerup", onPointerUp);
      };

      if (!sceneEl.canvas) {
        sceneEl.addEventListener("renderstart", attach, { once: true });
      } else {
        attach();
      }
    }

    attachPointerEvents();
  });
});
