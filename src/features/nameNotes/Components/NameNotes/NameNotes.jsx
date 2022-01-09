
import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { setTimeout } from "timers";
import {gsap} from 'gsap'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { Vector3 } from "three";
export class NameNotes extends Component {
  scene = null
  camera = null
  cameraPos = {x:0, y:0, z:0}
  lookAtPos = null
  lightIntensity = 2
  lightIntensityTween = null
  gltf = null
  guitarRotation = null
  constructor(props){
    super(props)
    this.cameraY = props.cameraPos.y
    this.lookAtPos = props.lookAtPos
    this.cameraPos = props.cameraPos
    this.lightIntensity = this.props.lightIntensity
    this.cubeCount = this.props.cubeCount
    this.guitarRotation = this.props.guitarRotation
  }

  onModelLoaded = (gltf) => {
    this.gltf = gltf
    const scaleFactor = .1
    this.gltf.scene.scale.set(scaleFactor, scaleFactor, scaleFactor)
    this.gltf.scene.castShadow = true
    this.gltf.scene.position.set(0,0,0)
    this.gltf.scene.children[0].castShadow = true      
    this.rebuildAndRenderScene()
  }

  loadModel = (comp) => {
    const loader = new GLTFLoader();
    loader.load(
      'models/gibson/scene.gltf',
      this.onModelLoaded,
      function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
      },
      function ( error ) {
        console.log( 'An error happened' );
      }
    );
  }

  componentDidUpdate(){
    if(!this.props.cameraPos.equals(this.cameraPos) || !this.props.lookAtPos.equals(this.lookAtPos)){
      this.animateCamera(this.props.cameraPos, this.props.lookAtPos)
    }
    if(this.lightIntensity !== this.props.lightIntensity){
      this.animateLightIntensity(this.props.lightIntensity)
    }
    this.rebuildAndRenderScene()
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
    return */
    let animationObject = {nextCameraX:this.cameraPos.x, nextCameraY:this.cameraPos.y, nextCameraZ:this.cameraPos.z, nextLAx:this.lookAtPos.x, nextLAy:this.lookAtPos.y, nextLAz:this.lookAtPos.z}
    let tween2 = gsap.to(animationObject, {
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
      }
    })
  }

  rebuildAndRenderScene = () => {
    this.buildScene();
    this.renderScene()
  }

  addPlane = () => {
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
    plane.position.y = -0.5
    plane.rotateX( - Math.PI / 2);
    // this.scene.add( plane );
  }

  addLighting = () => {
    var light2 = new THREE.SpotLight(0xffffff, this.lightIntensity, 90, 40);
    light2.position.set(-10, 20, 20);
    light2.castShadow = true;
    //this.scene.add(light2);
    var light3 = new THREE.SpotLight(0xffffff, this.lightIntensity, 100, 40);
    light3.castShadow = true;
    light3.position.set(15, 20, 25);
    //this.scene.add(light3);
    this.scene.add( new THREE.AmbientLight(0xffffff, 0.5) );
    const lighth = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    this.scene.add( lighth );
  }

  addCube = (cubeX) => {
    var geometry = new THREE.BoxGeometry( 1, 15, 1,20,20,20 );
    var material = new THREE.MeshPhongMaterial({
      ambient: 0x333333,
      color: 0x333333,
      specular: 0xffffff,
      shininess: 10,
      flatShading:true
    });
    var cube = new THREE.Mesh( geometry, material );
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.position.x = cubeX
    cube.position.z = -5
    this.scene.add( cube );
  }

  addCubes = () => {
    const cc = this.props.cubeCount
    for(let i = 0; i < cc; i++){
      const offsetX = (cc * 1.5)/-2
      const cubeX = (i * 1.5) + offsetX
      this.addCube( cubeX );
    }
  }

  setCamera = () => {
    if(!this.camera){
      this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 1000 );
    }
    this.camera.position.set(this.cameraPos.x, this.cameraPos.y, this.cameraPos.z)
    this.camera.lookAt(this.lookAtPos)
    this.camera.updateMatrix()
  }

  addModel = () => {
    if(this.gltf){
      this.scene.add(this.gltf.scene)
    }
  }

  buildScene = () => {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0x999999 );
    this.setCamera()
    this.addLighting()
    this.addCubes()
    this.addPlane()
    this.addModel()
  }

  renderScene = () => {
    var renderer = new THREE.WebGLRenderer();
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize( window.innerWidth, window.innerHeight );
    if(this.mount && this.mount.childElementCount > 0){
      this.mount.removeChild(this.mount.firstChild)
    }
    this.mount.appendChild( renderer.domElement );
    renderer.render( this.scene, this.camera );
  }

  render() {
    return (
      <div ref={ref => (this.mount = ref)} />
    )
  }
}