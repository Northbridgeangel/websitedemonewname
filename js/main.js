//main.js (solo carga de GLB y clicables)
document.addEventListener("DOMContentLoaded", () => {
  const escenario = document.querySelector("#escenario");

  escenario.addEventListener("model-loaded", () => {
    const sceneObject = escenario.getObject3D("mesh");

    sceneObject.traverse((child) => {
      if (child.isMesh) {
        // Marcar todos los meshes como clicables
        child.el = document.createElement("a-entity"); // proxy
        child.el.setAttribute("data-raycastable", "");
        console.log("Mesh marcado como clicable:", child.name);
      }
    });
    console.log("GLB cargado y meshes marcados correctamente");
  });
});
