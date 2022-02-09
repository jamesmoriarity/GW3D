import * as THREE from "three";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

export class SceneHelper{
    client
    constructor(client){
      this.client = client
    }
    updateAndRenderScene = () => {
        this.updateScene();
        this.renderScene()
      }  
    onModelLoaded = (gltf) => {
        this.client.gltf = gltf
        this.client.state.gltf = gltf // debugging
        const scaleFactor = 2
        this.client.gltf.scene.scale.set(scaleFactor, scaleFactor, scaleFactor)
        this.client.gltf.scene.position.set(0,-1,0)   
        this.client.gltf.scene.rotateY(Math.PI/-2)   
        this.client.gltf.scene.rotateX(Math.PI/-.9)  
        this.client.scene.add(this.client.gltf.scene)
        this.renderScene()
      }
    loadModel = (comp) => {
        const loader = new GLTFLoader();
        loader.load(
          'models/explorer/scene.gltf',
          this.onModelLoaded,
          function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
          },
          function ( error ) {
            console.log( 'An error happened' );
          }
        );
    }
      addGrid = () => {
        if(!this.client.props.showGrid){return}
        var green = new THREE.Color(0x00ff00)
        var red = new THREE.Color(0x990000)
        var blue = new THREE.Color(0x004466)
        var dkblue = new THREE.Color(0x000011)
        var grey = new THREE.Color(0xaaaaaa)
        var gridXY = new THREE.GridHelper(20, 80, green, blue);
        gridXY.rotation.x = Math.PI/2;
        gridXY.position.set(0,0,0);
        this.client.scene.add(gridXY);
    
        var gridXY2 = new THREE.GridHelper(20, 20, green, dkblue);
        gridXY2.rotation.x = Math.PI/2;
        gridXY2.position.set(0,0,0);
        this.client.scene.add(gridXY2);
    
        const size = 50;
        const divisions = 50;
        const gridHelper = new THREE.GridHelper( size, divisions, red, grey );
        this.client.scene.add( gridHelper );
        var axes = new THREE.AxisHelper(6);
        this.client.scene.add(axes);
      }
      setRenderer = () => {
       this.client.renderer = new THREE.WebGLRenderer();
       this.client.renderer.outputEncoding = THREE.sRGBEncoding;
       this.client.renderer.shadowMap.enabled = true;
       this.client.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
       this.client.renderer.setSize( window.innerWidth, window.innerHeight );
      }
      renderScene = () => {
        while(this.client.mount && this.client.mount.childElementCount > 0){
            this.client.mount.removeChild(this.client.mount.firstChild)
        }
        this.client.mount.appendChild( this.client.renderer.domElement );
        this.client.renderer.render( this.client.scene, this.client.camera );
      }
  updateScene(){
    this.updateCamera()
    this.updateSphere()
    this.updateLighting()
  }
  buildScene = () => {
    this.client.scene = new THREE.Scene();
    this.client.scene.background = new THREE.Color( 0xcccccc );
    this.setRenderer()
    this.buildCamera()
    this.buildSphere()
    this.buildLighting()
    this.addGrid()
    if(this.client.gltf && this.client.gltf.scene){
        this.client.scene.add(this.client.gltf.scene)
    }
    this.updateScene()
  }
  buildCamera = () => {
    this.client.camera = new THREE.PerspectiveCamera(14, window.innerWidth/window.innerHeight, 1, 1000 );
    this.client.scene.add(this.client.camera)
    this.updateCamera()
  }
  updateCamera = () => {
    this.client.camera.position.set(this.client.cameraPos.x, this.client.cameraPos.y, this.client.cameraPos.z)
    this.client.camera.lookAt(this.client.lookAtPos)
    this.client.camera.updateProjectionMatrix()
  }
  updateSphere = () => {
    this.client.sphere.position.set(this.client.notePos.x, this.client.notePos.y, this.client.notePos.z)
  }
  buildSphere = () => {
    var geometry = new THREE.SphereGeometry( .025, 160, 160 );
    var material = new THREE.MeshPhongMaterial({
      ambient: 0xffffff,
      color: 0x999966,
      specular: 0xffffff,
      shininess: 8,
      flatShading:true
    });
    this.client.sphere = new THREE.Mesh( geometry, material );
    this.client.scene.add( this.client.sphere );
    this.updateSphere()
  }
  updateLighting = () => {
    this.client.lights.forEach((element)=>{
      element.intensity = this.client.lightIntensity
      element.color = new THREE.Color(this.client.lightColor)
    })
  }
  buildLighting = () => {
/*     var light2 = new THREE.SpotLight(0xFFCC00, this.client.lightIntensity, 100, 40);
    light2.position.set(10, -20, 20);
    light2.castShadow = true;
    this.client.scene.add(light2);
    this.client.lights[0] = light2 */

var light3 = new THREE.SpotLight(0x333333, this.client.lightIntensity, 100, 40);
    light3.castShadow = true;
    light3.position.set(15, 20, 25);
    this.client.scene.add(light3);
    this.client.lights[1] = light3

/*     const ambientLight = new THREE.AmbientLight(0xffffff, this.lightIntensity)
    this.client.scene.add(ambientLight);
    this.client.lights[2] = ambientLight */

    const lightH = new THREE.HemisphereLight( 0xffffff, 0xffffff, this.lightIntensity );
    this.client.scene.add( lightH );
    this.client.lights[3] = lightH
  }
}