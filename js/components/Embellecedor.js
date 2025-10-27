// Embellecedor.js
function resaltarMesh(mesh) {
  if (!mesh) return;
  mesh.material.emissive.setHex(0xff0000); // ejemplo: brillo rojo
}

function resetMesh(mesh, originalColor) {
  if (!mesh) return;
  mesh.material.color.setHex(originalColor);
}
