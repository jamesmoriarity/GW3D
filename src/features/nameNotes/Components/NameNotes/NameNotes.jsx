
import React, { Component, CSSProperties, createRef } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { setTimeout } from "timers";
import {gsap} from 'gsap'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { Vector2, Vector3 } from "three";
import { pseudoRandomBytes } from "crypto";

export class Indicator extends Component {

  state = {}
  constructor(props){
      super(props)
      this.state.projectedCoordinates = this.props.projectedCoordinates
      this.state.centerCoordinates = this.props.centerCoordinates
  }
  updateCoordinates = (projectedCoordinates, centerCoordinates) => {
    if(projectedCoordinates !== undefined)
      this.setState({projectedCoordinates:projectedCoordinates, centerCoordinates:centerCoordinates})
  }
  componentDidUpdate(){
    console.log('Indicator.componentDidUpdate')
  }

  render(){
      let x = this.state.projectedCoordinates.x
      const projectedStyle = {
          position: 'absolute',
          left: this.state.projectedCoordinates.x,
          top: this.state.projectedCoordinates.y,
          border: '1px solid red'
      };
      const centerStyle = {
          position: 'absolute',
          left: this.state.centerCoordinates.x,
          top: this.state.centerCoordinates.y,
          border: '1px solid orange'
      };
      return  <div>
                <div style={projectedStyle}>
                  coordinates : {this.state.projectedCoordinates.x}, {this.state.projectedCoordinates.y}
                </div>
                <div style={centerStyle}>
                  coordinates : {this.state.centerCoordinates.x}, {this.state.centerCoordinates.y}
                </div>
              </div>
  }
}
export class NameNotes extends Component {
  scene = null
  camera = null
  cameraPos = {x:0, y:0, z:12}
  lookAtPos = null
  notePos = null
  targetLookAtPos = null
  lightIntensity = 2
  lightIntensityTween = null
  gltf = null
  guitarRotation = null
  state = {gltf:null}
  cameraTween = null
  showGrid = true
  neck = null
  originalLookAtPosition = null
  ref = null
  indicatorRef = null
  constructor(props){
    super(props)
    this.lookAtPos = props.lookAtPos.clone()
    this.notePos = props.notePos.clone()
    this.targetLookAtPos = props.lookAtPos.clone()
    this.originalLookAtPosition = this.lookAtPos.clone()
    this.cameraPos = props.cameraPos
    this.lightIntensity = this.props.lightIntensity
    this.cubeCount = this.props.cubeCount
    this.guitarRotation = this.props.guitarRotation
    this.indicatorRef = createRef()
    // props.notePos exists
  }
  componentDidUpdate(){
    console.log('componentDidUpdate')
    if(!this.props.notePos.equals(this.notePos)){
      this.notePos = this.props.notePos.clone() // handle change in note position
      this.rebuildAndRenderScene()
    }
    if(!this.props.cameraPos.equals(this.cameraPos) || !this.props.lookAtPos.equals(this.lookAtPos)){
      this.animateCamera(this.props.cameraPos.clone(), this.props.lookAtPos)
    }
    if(this.lightIntensity !== this.props.lightIntensity){
      this.animateLightIntensity(this.props.lightIntensity)
    }
    if(this.cubeCount !== this.props.cubeCount){
      this.rebuildAndRenderScene()
    }
  }
  getProjectedPosition = () => {
    console.log('getProjectedPosition')
    if(!this.camera){
      return [ new Vector2(0,0), new Vector2(0,0) ]
    }
    var width = window.innerWidth, height = window.innerHeight;
    var widthHalf = width / 2, heightHalf = height / 2;
    let pos = this.notePos.clone()
    pos.project(this.camera)
    pos.x = ( pos.x/2 * width ) + widthHalf;
    pos.y = -( pos.y/2 * height ) + heightHalf;
    return ([new Vector2(Math.floor(pos.x), Math.floor(pos.y)), new Vector2(widthHalf, heightHalf)])
  }
  onModelLoaded = (gltf) => {
    this.gltf = gltf
    this.state.gltf = gltf // debugging
    const scaleFactor = 2
    this.gltf.scene.scale.set(scaleFactor, scaleFactor, scaleFactor)
    this.gltf.scene.position.set(0,-1,0)   
    this.gltf.scene.rotateY(Math.PI/-2)   
    this.gltf.scene.rotateX(Math.PI/-.9) 
    this.gltf.scene.traverse(function(obj){
/*       if(obj.type === 'Mesh'){
        const material = new THREE.MeshLambertMaterial( {
						color: new THREE.Color().setHSL( .15, 0.25, 0.25 ),
						side: THREE.DoubleSide,
            castShadow: true,
            receiveShadow: true
					} 
        ); 
        // obj.material = material;
        //obj.castShadow = true
      }*/
    }); 
    this.rebuildAndRenderScene()
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
  componentDidMount() {
    console.log('componentDidMount')
    this.loadModel(this)
  }

  animateLightIntensity = (targetIntensity) => {
    console.log('animateLightIntensity')
    if(this.lightIntensityTween){
      this.lightIntensityTween.kill()
    }
    this.lightIntensityTween = gsap.to(
      this, 
      {
        lightIntensity:targetIntensity,
        onUpdate:()=>{
          this.rebuildAndRenderScene()
        }
      }
    )
  }

  animateCamera = (targetPos, targetLookAtPos) => {
    console.log('animateCamera')
/*     this.cameraPos.x = targetPos.x;
    this.cameraPos.y = targetPos.y;
    this.cameraPos.z = targetPos.z
    this.lookAtPos.x = targetLookAtPos.x
    this.lookAtPos.y = targetLookAtPos.y
    this.lookAtPos.z = targetLookAtPos.z 
    this.rebuildAndRenderScene()  
    return  
    
    
    this.props.cameraPos.clone(), this.targetLookAtPos
*/
    if(this.cameraTween){this.cameraTween.kill()}
    let animationObject = {nextCameraX:this.cameraPos.x, nextCameraY:this.cameraPos.y, nextCameraZ:this.cameraPos.z, nextLAx:this.lookAtPos.x, nextLAy:this.lookAtPos.y, nextLAz:this.lookAtPos.z}
    this.cameraTween = gsap.to(animationObject, {
      nextCameraX:targetPos.x,
      nextCameraY:targetPos.y,
      nextCameraZ:targetPos.z,
      nextLAx:targetLookAtPos.x, 
      nextLAy:targetLookAtPos.y, 
      nextLAz:targetLookAtPos.z,
      duration:0.5,
      onUpdate:()=>{
        this.cameraPos.x = animationObject.nextCameraX;
        this.cameraPos.y = animationObject.nextCameraY;
        this.cameraPos.z = animationObject.nextCameraZ;         
        this.lookAtPos.x = animationObject.nextLAx
        this.lookAtPos.y = animationObject.nextLAy
        this.lookAtPos.z = animationObject.nextLAz
        this.rebuildAndRenderScene()
      },
      onComplete:()=>{
        this.rebuildAndRenderScene()
      }
    })
  }

  rebuildAndRenderScene = () => {
    this.buildScene();
    this.renderScene()
  }

  addPlane = () => {
    return 
    const geometry = new THREE.PlaneGeometry( 300, 300);
    //const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );    
    var material = new THREE.MeshPhongMaterial({
      ambient: 0x222299,
      color: 0x222299,
      specular: 0xffffff,
      shininess: 0,
      shading: THREE.SmoothShading
    });
    var plane = new THREE.Mesh( geometry, material );
    plane.receiveShadow = true
    plane.castShadow = true
    plane.position.y = -0.1
    plane.rotateX( - Math.PI / 2);
    this.scene.add( plane );
  }

  addLighting = () => {
    var light2 = new THREE.SpotLight(0xFFCC00, this.lightIntensity, 100, 40);
    light2.position.set(10, -20, 20);
    light2.castShadow = true;
    this.scene.add(light2);
    var light3 = new THREE.SpotLight(0x333333, this.lightIntensity, 100, 40);
    light3.castShadow = true;
    light3.position.set(15, 20, 25);
    this.scene.add(light3);
    this.scene.add( new THREE.AmbientLight(0xffffff, this.lightIntensity) );
    const lighth = new THREE.HemisphereLight( 0xffffff, 0x000066, this.lightIntensity );
    this.scene.add( lighth );
  }

  addCube = () => {
    var geometry = new THREE.SphereGeometry( .025, 100, 100 );
    var material = new THREE.MeshPhongMaterial({
      ambient: 0x663333,
      color: 0x336633,
      specular: 0xffffff,
      shininess: 10,
      flatShading:true
    });
    this.cube = new THREE.Mesh( geometry, material );
    
    this.cube.position.set(this.notePos.x, this.notePos.y, this.notePos.z)
    this.scene.add( this.cube );
  }

  addCubes = () => {
    const cc = this.props.cubeCount
    for(let i = 0; i < 1; i++){
      this.addCube();
    }
  }

  setCamera = () => {
    this.camera = new THREE.PerspectiveCamera(14, window.innerWidth/window.innerHeight, 1, 1000 );
    this.scene.add(this.camera)
    this.camera.position.set(this.cameraPos.x, this.cameraPos.y, this.cameraPos.z)
    this.camera.lookAt(this.lookAtPos)
    this.camera.updateProjectionMatrix()
  }
  addModel = () => {
    if(this.gltf){
      this.scene.add(this.gltf.scene)
    }
  }

  addGrid = () => {
    // return
    var green = new THREE.Color(0x00ff00)
    var red = new THREE.Color(0x990000)
    var blue = new THREE.Color(0x004466)
    var dkblue = new THREE.Color(0x000011)
    var grey = new THREE.Color(0xaaaaaa)
    var gridXY = new THREE.GridHelper(20, 80, green, blue);
    gridXY.rotation.x = Math.PI/2;
    gridXY.position.set(0,0,0);
    this.scene.add(gridXY);

    var gridXY = new THREE.GridHelper(20, 20, green, dkblue);
    gridXY.rotation.x = Math.PI/2;
    gridXY.position.set(0,0,0);
    this.scene.add(gridXY);

    const size = 50;
    const divisions = 50;
    const gridHelper = new THREE.GridHelper( size, divisions, red, grey );
    this.scene.add( gridHelper );
    var axes = new THREE.AxisHelper(6);
    this.scene.add(axes);
  }

  buildScene = () => {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0x9999bb );
    this.addCubes()
    this.setCamera()
    this.addLighting()
    this.addPlane()
    this.addModel()
    this.addGrid()

  }

  renderScene = () => {
    var renderer = new THREE.WebGLRenderer();
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize( window.innerWidth, window.innerHeight );
    while(this.mount && this.mount.childElementCount > 0){
      this.mount.removeChild(this.mount.firstChild)
    }
    this.mount.appendChild( renderer.domElement );
    renderer.render( this.scene, this.camera );
    const [projectedCoordinates, centerCoordinates] = this.getProjectedPosition()
    this.indicatorRef.current.updateCoordinates(projectedCoordinates, centerCoordinates)
  }

  render() {
    const [projectedCoordinates, centerCoordinates] = this.getProjectedPosition()
    return (
      <>
        <div ref={ref => (this.mount = ref)} />
        <Indicator ref={this.indicatorRef} projectedCoordinates={projectedCoordinates} centerCoordinates={centerCoordinates} />
      </>
    )
  }
}