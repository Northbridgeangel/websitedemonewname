AFRAME.registerComponent("clickable", {
  init: function () {
    this.el.addEventListener("click", (evt) => {
      const intersected = evt.detail.intersectedEl;
      if (intersected) {
        console.log(
          "Objeto clicado:",
          intersected.id || intersected.tagName,
          intersected
        );
      }
    });
  },
});
