/WebProject/
├─ index.html
├─ js/
│ ├─ main.js
│ └─ components/
│ ├─ clickable.js
│ ├─ mirrormaterial.js
│ ├─ scroll-fly-smooth.js
│ └─ smooth-wasd.js
└─ assets/
└─ escenario.glb
└─ environment.hdr

1️⃣ Versiones

A-Frame 1.5.0 → Correcto, reciente y estable.

Three.js 0.158.0 → A-Frame todavía no usa la última r169. No es crítico, pero hay que tenerlo en cuenta para usar funcionalidades muy nuevas de Three.js.

WebVR Polyfill 0.10.12 → Solo relevante si pruebas con navegadores que no soporten WebXR nativamente.

2️⃣ Imp! raycaster:
objects: [data-raycastable] → solo los objetos que tengan este atributo serán “clicables”.

cursor="rayOrigin: mouse" → usa el ratón para pruebas en desktop; en VR, el ray se proyecta desde la mano/control.

Esto hará que solo los objetos marcados sean detectados por el raycaster, mejorando rendimiento y evitando errores de intersección.

3️⃣ Nos apoyamos de Three.js para el HDR environment map.

Solución práctica:

Asegúrate que el <a-scene> tenga embedded y renderer="antialias:true".

Carga GLB o HDR con eventos model-loaded o material-texture-loaded.

Ignorable si tu escena finalmente se ve bien, pero conviene revisarlo si notas artefactos.

4️⃣ Warning: useLegacyLights (por revisar)
THREE.WebGLRenderer: The property .useLegacyLights has been deprecated.
Migrate your lighting according to the following guide:
https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733.

Significa que A-Frame todavía usa internamente useLegacyLights = true.

No afecta la escena usando luces básicas (<a-light>), pero si usamos PBR o GLB con materiales estándar, conviene revisar la iluminación según la guía de Three.js r155+.



Nota: Ignorar los warnings de framebuffer si la escena se ve correcta; si notas errores gráficos, revisar tamaños de canvas y skybox.
