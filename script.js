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
    container.appendChild(renderer.domElement);

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
