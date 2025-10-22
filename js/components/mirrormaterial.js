AFRAME.registerComponent("mirror-material", {
  schema: { target: { type: "selector" } },
  init: function () {
    const targetEl = this.data.target;
    if (!targetEl) return;

    targetEl.addEventListener("model-loaded", () => {
      const mesh = targetEl.getObject3D("mesh");

      // Cargar textura de entorno
      const loader = new THREE.TextureLoader();
      loader.setPath("./assets/");
      loader.load("environment.png", (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;

        mesh.traverse((child) => {
          if (
            child.isMesh &&
            child.material &&
            child.material.name === "Espejo"
          ) {
            // Reemplazar solo el material
            child.material = new THREE.MeshStandardMaterial({
              color: 0xffffff,
              metalness: 1.0,
              roughness: 0.0,
              envMap: texture,
            });
          }
        });

        console.log("✅ Material espejo aplicado correctamente con PNG");
      });
    });
  },
});
