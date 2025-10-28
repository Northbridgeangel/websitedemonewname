// handleClick.js
let selectedMesh = null; // mesh actualmente activo

function handleClick(mesh) {
  // Caso 1: el mesh que clicamos ya está seleccionado
  if (selectedMesh === mesh) {
    resetMesh(mesh); // deseleccionamos
    selectedMesh = null;
    console.log(`Mesh ${mesh.name} deseleccionado`);
    return;
  }

  // Caso 2: hay otro mesh seleccionado distinto
  if (selectedMesh && selectedMesh !== mesh) {
    console.log(
      `⚠️ Otro mesh (${selectedMesh.name}) está activo, no se puede clicar hasta desactivarlo.`
    );
    return; // prohibido clicar otro mesh
    
  }

  // Caso 3: ningún mesh seleccionado
  selectedMesh = mesh; // marcamos este mesh como seleccionado
  resaltarMesh(mesh); // aplicamos resalte
  console.log(`Mesh ${mesh.name} seleccionado`);
}






//Y por si acaso limpiamos los meshes que no son el seleccionado, se restablecen los materiales originales y se limpia cualquier función que estuviera en proceso.
//También se añade un contador de clicks para evitar múltiples clicks rápidos que puedan causar problemas.