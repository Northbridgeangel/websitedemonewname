// main.js — crea y llena el namespace
window.OpenCentralGlobals = {
  escenario: document.querySelector("#escenario"),
  sceneEl: document.querySelector("a-scene"),
};

if (!OpenCentralGlobals.escenario)
  console.error("❌ No se encontró #escenario");
else console.log("✅ Escenario global disponible");

if (!OpenCentralGlobals.sceneEl) console.error("❌ No se encontró <a-scene>");
else console.log("✅ Scene global disponible");
