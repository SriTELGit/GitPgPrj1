import * as THREE from 'https://unpkg.com/three@0.148.0/build/three.module.js'

class App{
	constructor(){
		const container = document.createElement( 'div' );
		document.body.appendChild( container );

		this.clock = new THREE.Clock();

		this.camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 100);
		this.camera.position.set(0,1,50);

		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(0x444444);

		const ambient = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.3);
		this.scene.add(ambient);

		const light = new THREE.DirectionalLight(0xffffff, 1.5);
		light.position.set(0, 1, 1);
		this.scene.add(light);

		this.renderer = new THREE.WebGLRenderer({antialias: true, outputEncoding: THREE.SRGBColorSpace });
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		//this.renderer.outputEncoding - THREE.sRGBEncoding; //deprecated 
		this.renderer.physicallyCorrectLights = true; //check this
		container.appendChild(this.renderer.domElement);


		this.setEnvironment1();
		

        window.addEventListener('resize', this.resize.bind(this) );
	}	
    
    resize(){
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);

    }
    
	render( ) {   
		const dt = this.clock.getDelta();
		
		this.renderer.render(this.scene, this.camera);
    }


	setEnvironment1(){

		this.renderer.setAnimationLoop( this.render.bind(this) );

		const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 ); 
		const material = new THREE.MeshStandardMaterial({ color: 0xFF0000, roughness: 0.1, metalness: 0.1 });

		this.mesh = new THREE.Mesh(geometry, material);
		this.scene.add(this.mesh);

	}

	
}

export { App };