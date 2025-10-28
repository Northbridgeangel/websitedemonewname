// DetectorClickHover.js
document.addEventListener("DOMContentLoaded", () => {
  const { escenario, sceneEl } = OpenCentralGlobals; // asegura que ya están cargados
  if (!escenario || !sceneEl) {
    console.error("❌ OpenCentralGlobals no cargado correctamente");
    return;
  }

  escenario.addEventListener("model-loaded", (ev) => {
    const modelRoot = escenario.getObject3D("mesh") || ev.detail.model;
    if (!modelRoot) {
      console.error("❌ No se encontró modelRoot en #escenario");
      return;
    }

    console.log("✅ DetectorClickHover activo — esperando interacciones.");

    // Reunir todos los meshes válidos y guardar su material original
    const interactiveMeshes = [];
    modelRoot.traverse((child) => {
      if (child.isMesh && !child.name.startsWith("Escena")) {
        // 🔹 Evitamos que el suelo transparente se pueda clicar
        if (
          child.name.toLowerCase().includes("transparentfloor") ||
          child.name.toLowerCase().includes("floor") ||
          child.name.toLowerCase().includes("ground")
        ) {
          console.log(`🟡 Ignorando mesh del suelo: ${child.name}`);
          child.userData.clickable = false; // sigue siendo detectado por raycaster, pero no clicable
          return; // lo saltamos
        }
        child.originalMaterial = child.material.clone(); // <-- Para controlar el material original
        interactiveMeshes.push(child);
      }
    });
    selectedMesh = null; //<- limpieza importante, cada vez que regeneres, limpies buffers o recargues el modelo, resetea selectedMesh = null; justo después del traverse, para evitar referencias fantasma

    if (interactiveMeshes.length === 0) {
      console.warn("⚠️ No se encontraron meshes interactivos (sin 'Escena').");
    } else {
      console.log(
        `🎨 Meshes detectados (${interactiveMeshes.length}):`,
        interactiveMeshes.map((m) => m.name)
      );
    }

    // Raycaster y mouse
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let mouseDownPos = { x: 0, y: 0 };
    const CLICK_THRESHOLD = 5;
    let hoveredMesh = null;

    // Hover
    function onPointerMove(event) {
      if (!sceneEl.camera) return;
      const rect = sceneEl.canvas.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, sceneEl.camera);
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

    function onPointerDown(event) {
      mouseDownPos.x = event.clientX;
      mouseDownPos.y = event.clientY;
    }

    function onPointerUp(event) {
      const dx = Math.abs(event.clientX - mouseDownPos.x);
      const dy = Math.abs(event.clientY - mouseDownPos.y);
      if (dx > CLICK_THRESHOLD || dy > CLICK_THRESHOLD) return;

      if (!sceneEl.camera) return;
      const rect = sceneEl.canvas.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, sceneEl.camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes, true);

      if (intersects.length > 0) {
        const mesh = intersects[0].object;
        console.log(`🔴 CLICK REAL: ${mesh.name}`);

        handleClick(mesh); // Pasamos el mesh clicado
      }
    }

    function attachPointerEvents() {
      const attach = () => {
        sceneEl.canvas.addEventListener("pointermove", onPointerMove);
        sceneEl.canvas.addEventListener("pointerdown", onPointerDown);
        sceneEl.canvas.addEventListener("pointerup", onPointerUp);
      };
      if (!sceneEl.canvas) {
        sceneEl.addEventListener("renderstart", attach, { once: true });
      } else attach();
    }

    attachPointerEvents();
  });
});
