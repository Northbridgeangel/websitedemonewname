AFRAME.registerComponent("arrow-fly-smooth", {
  schema: {
    step: { type: "number", default: 0.05 }, // distancia por pulsación
    speed: { type: "number", default: 0.1 }, // suavidad del movimiento
  },

  init: function () {
    this.targetPos = this.el.object3D.position.clone();

    this.keys = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
    };

    // Registrar pulsaciones de teclas
    window.addEventListener("keydown", (e) => {
      if (this.keys[e.key] !== undefined) this.keys[e.key] = true;
    });

    window.addEventListener("keyup", (e) => {
      if (this.keys[e.key] !== undefined) this.keys[e.key] = false;
    });
  },

  tick: function () {
    const camera = this.el.object3D;
    const pos = this.targetPos.clone();

    // Obtener dirección "forward" y "right" basadas en la rotación actual
    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    const right = new THREE.Vector3();
    right.crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();

    // Calcular movimiento según teclas
    const move = new THREE.Vector3();
    if (this.keys.ArrowUp) move.add(forward.multiplyScalar(-this.data.step));
    if (this.keys.ArrowDown) move.add(forward.multiplyScalar(this.data.step));
    if (this.keys.ArrowLeft) move.add(right.multiplyScalar(this.data.step));
    if (this.keys.ArrowRight) move.add(right.multiplyScalar(-this.data.step));

    // Actualizar target
    pos.add(move);
    this.targetPos.copy(pos);

    // Interpolación suave (no afecta Y)
    const currentPos = camera.position;
    currentPos.x += (this.targetPos.x - currentPos.x) * this.data.speed;
    currentPos.z += (this.targetPos.z - currentPos.z) * this.data.speed;
  },
});
