import * as THREE from 'https://unpkg.com/three@0.148.0/build/three.module.js'

class App{
	constructor(){
		const container = document.createElement( 'div' );
		document.body.appendChild( container );

		this.mCamera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 100);
		this.mCamera.position.set(0,1,50);

		this.mScene = new THREE.Scene();
		this.mScene.background = new THREE.Color(0x444444);

		this.mRenderer = new THREE.WebGLRenderer({antialias: true, outputEncoding: THREE.SRGBColorSpace });
		this.mRenderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
		this.mRenderer.setSize(window.innerWidth, window.innerHeight);
		this.mRenderer.physicallyCorrectLights = true; 

		container.appendChild(this.mRenderer.domElement);

		this.SetupWorld();

        window.addEventListener('resize', this.Resize.bind(this) );
	}	

    SetupWorld(){

		this.mRenderer.setAnimationLoop( this.Render.bind(this) );

		const ambient = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.2);
		this.mScene.add(ambient);

		const light = new THREE.DirectionalLight(0xeeeeee, 1.5);
		light.position.set(0, 1, 1);
		this.mScene.add(light);


		const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 ); 
		const material = new THREE.MeshStandardMaterial({ color: 0xFF0000, roughness: 0.1, metalness: 0.1 });

		this.mMesh = new THREE.Mesh(geometry, material);
		this.mScene.add(this.mMesh);

	}
    
    Resize(){
		this.mCamera.aspect = window.innerWidth / window.innerHeight;
		this.mCamera.updateProjectionMatrix();
		this.mRenderer.setSize(window.innerWidth, window.innerHeight);
    }
    
	Render( ) {   
		this.mRenderer.render(this.mScene, this.mCamera);
    }

	
}

export { App };