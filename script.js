document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('glb-container');

    // Crear la escena
    const scene = new THREE.Scene();

    // Crear una cámara
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 5);

    // Crear el renderizador
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff); // Establecer el color de fondo a blanco
    container.appendChild(renderer.domElement);

    // Añadir controles de órbita
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Habilitar amortiguación (inercia)
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.minDistance = 1; // Distancia mínima de zoom
    controls.maxDistance = 10; // Distancia máxima de zoom

    // Añadir iluminación
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    // Cargar el modelo GLB
    const loader = new THREE.GLTFLoader();
    loader.load('models/model.glb', (gltf) => {
        scene.add(gltf.scene);
    }, undefined, (error) => {
        console.error('An error happened', error);
    });

    // Bucle de animación
    const animate = () => {
        requestAnimationFrame(animate);
        controls.update(); // Actualizar controles
        renderer.render(scene, camera);
    };
    animate();

    // Manejar el cambio de tamaño de la ventana
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});