AFRAME.registerComponent("scroll-fly-smooth", {
  schema: {
    speed: { type: "number", default: 0.02 }, // suavidad de interpolación
    step: { type: "number", default: 0.25 }, // cuánto se mueve por tick (metros)
    minY: { type: "number", default: 0 },
    maxY: { type: "number", default: 10 },
  },

  init: function () {
    this.targetY = this.el.getAttribute("position").y;

    window.addEventListener(
      "wheel",
      (event) => {
        event.preventDefault();
        // Normaliza deltaY y limita el desplazamiento
        let delta = Math.sign(event.deltaY) * this.data.step;
        this.targetY = THREE.MathUtils.clamp(
          this.targetY - delta,
          this.data.minY,
          this.data.maxY
        );
      },
      { passive: false }
    );
  },

  tick: function () {
    const pos = this.el.getAttribute("position");
    pos.y += (this.targetY - pos.y) * this.data.speed; // interpolación smooth
    this.el.setAttribute("position", pos);
  },
});
