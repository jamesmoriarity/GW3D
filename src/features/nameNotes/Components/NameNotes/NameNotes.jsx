
import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { setTimeout } from "timers";
import {gsap} from 'gsap'

export class NameNotes extends Component {
  scene = null
  camera = null
  cameraPos = {x:0, y:0, z:0}
  lookAtPos = null
  constructor(props){
    super(props)
    this.cameraY = props.cameraPos.y
    this.lookAtPos = props.lookAtPos
    this.cameraPos = props.cameraPos
  }
  componentDidUpdate(){
    if(this.props.cameraPos !== this.cameraPos || this.props.lookAtPos !== this.lookAtPos){
      this.animateCamera(this.props.cameraPos, this.props.lookAtPos)
    }
  }
  componentDidMount() {
    console.log('componentDidMount')
    this.loadModel()
    
  }
  loadModel = () => {
    // when model is loaded call rebuild
    this.rebuildAndRenderScene()
  }
  
  animateCamera = (targetPos, targetLookAtPos) => {
    let animationObject = {nextCameraX:this.cameraPos.x, nextCameraY:this.cameraPos.y, nextCameraZ:this.cameraPos.z, nextLAx:this.lookAtPos.x, nextLAy:this.lookAtPos.y, nextLAz:this.lookAtPos.z}
    let tween2 = gsap.to(animationObject, {
      nextCameraX:targetPos.x,
      nextCameraY:targetPos.y,
      nextCameraZ:targetPos.z,
      nextLAx:targetLookAtPos.x, 
      nextLAy:targetLookAtPos.y, 
      nextLAz:targetLookAtPos.z,
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
    this.scene.add( plane );
  }

  addLighting = () => {
    var light = new THREE.SpotLight(0xff0000, 1, 90, 120);
    light.position.set(-5, 20, 4);
    light.castShadow = true;
    this.scene.add(light);
    var light2 = new THREE.SpotLight(0x663399, 3, 90, 120);
    light2.position.set(-10, 20, 20);
    light2.castShadow = true;
    this.scene.add(light2);
    var light3 = new THREE.SpotLight(0x111199, 5, 100, 120);
    light3.castShadow = true;
    light3.position.set(15, 5, 25);
    this.scene.add(light3);
    this.scene.add( new THREE.AmbientLight(0x99ff99) );
  }

  addCube = (cubeX) => {
    var geometry = new THREE.BoxGeometry( 1, 1, 1,20,20,20 );
    var material = new THREE.MeshPhongMaterial({
      ambient: 0x333333,
      color: 0x333333,
      specular: 0xffffff,
      shininess: 10,
      shading: THREE.SmoothShading
    });
    var cube = new THREE.Mesh( geometry, material );
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.position.x = cubeX
    this.scene.add( cube );
  }

  addCubes = () => {
    for(let i = -3; i < 3; i++){
      this.addCube(i*1.5);
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

  buildScene = () => {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0x999999 );
    this.setCamera()
    this.addLighting()
    this.addCubes()
    this.addPlane()

  }

  renderScene = () => {
    var renderer = new THREE.WebGLRenderer();
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
    console.log('render')
    return (
      <div ref={ref => (this.mount = ref)} />
    )
  }
}