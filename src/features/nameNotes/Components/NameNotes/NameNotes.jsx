
import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { setTimeout } from "timers";
import {gsap} from 'gsap'

let cube, renderer, scene

export class NameNotes extends Component {
  camera = null
  cameraY = 0
  lookAtPos = null
  constructor(props){
    super(props)
    this.cameraY = props.cameraY
    this.lookAtPos = props.lookAtPos
  }
  componentDidUpdate(){
    if(this.props.cameraY !== this.cameraY || this.props.lookAtPos !== this.lookAtPos){
      this.animateCamera(this.props.cameraY, this.props.lookAtPos)
    }
  }

  componentDidMount() {
    console.log('componentDidMount')
    this.renderScene()
  }

  animateCamera = (targetY, targetLookAtPos) => {
    console.log('animateCamera')
    let animationObject = {nextCameraY:this.cameraY, nextLAx:this.lookAtPos.x, nextLAy:this.lookAtPos.y, nextLAz:this.lookAtPos.z}
    let tween = gsap.to(animationObject, {
      nextCameraY:targetY, nextLAx:targetLookAtPos.x, nextLAy:targetLookAtPos.y, nextLAz:targetLookAtPos.z,
      onUpdate:()=>{
        this.cameraY = animationObject.nextCameraY;
        this.lookAtPos.x = animationObject.nextLAx
        this.lookAtPos.y = animationObject.nextLAy
        this.lookAtPos.z = animationObject.nextLAz
        this.renderScene()
      }
    })
  }

  renderScene = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x999999 );
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 1000 );
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    if(this.mount.childElementCount > 0){
      this.mount.removeChild(this.mount.firstChild)
    }
    this.mount.appendChild( renderer.domElement );
    scene.add( new THREE.AmbientLight(0xff0000) );

    var light = new THREE.PointLight(0xff9999, 10, 40);
    light.position.set(20, 20, 20);
    scene.add(light);

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshPhongMaterial({
      ambient: 0x555555,
      color: 0x555555,
      specular: 0xffffff,
      shininess: 50,
      shading: THREE.SmoothShading
    });
    var material2 = new THREE.MeshPhongMaterial({
      ambient: 0x333333,
      color: 0x333333,
      specular: 0xffffff,
      shininess: 20,
      shading: THREE.SmoothShading
    });
    cube = new THREE.Mesh( geometry, material );
    cube.rotation.x = 0.5
    scene.add( cube );

    var cube2 = new THREE.Mesh( geometry, material2 );
    cube2.rotation.x = 0.5
    cube2.position.x = 2
    scene.add( cube2 );
    this.camera.position.y = this.cameraY;
    this.camera.position.z = 6
    this.camera.lookAt(this.lookAtPos)
    this.camera.updateMatrix()
    renderer.render( scene, this.camera );
  }

  render() {
    console.log('render')
    return (
      <div ref={ref => (this.mount = ref)} />
    )
  }
}