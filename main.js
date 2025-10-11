        // 🔹 Escena, cámara, renderer
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 2, 5);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // 🔹 Luz ambiental + direccional
        const ambient = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambient);
        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(3, 5, 2);
        scene.add(dirLight);

        // 🔹 Controles orbitales
        const controls = new THREE.OrbitControls(camera, renderer.domElement);

        // 🔹 Cargamos el modelo GLB
        const loader = new THREE.GLTFLoader();
        loader.load(
          './escenario.glb',
          (gltf) => {
            const model = gltf.scene;
            model.scale.set(1, 1, 1);
            scene.add(model);
            console.log('Modelo cargado correctamente ✅');
          },
          undefined,
          (error) => {
            console.error('Error al cargar el modelo ❌', error);
          }
        );

        // 🔹 Cubo de prueba
        const cube = new THREE.Mesh(
          new THREE.BoxGeometry(1, 1, 1),
          new THREE.MeshStandardMaterial({ color: 0x00ff00 })
        );
        scene.add(cube);

        // 🔹 Ajuste del viewport al cambiar tamaño
        window.addEventListener('resize', () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // 🔹 Animación
        function animate() {
          requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        }
        animate();

        // 🔹 Botones de UI
        document.getElementById('editar').onclick = () => alert('Entrando en modo edición...');
        document.getElementById('mover').onclick = () => alert('Modo mover activado');
        document.getElementById('salir').onclick = () => alert('Saliendo de la interfaz');