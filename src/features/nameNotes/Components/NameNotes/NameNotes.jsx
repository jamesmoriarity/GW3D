
import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { setTimeout } from "timers";

let cube, renderer, scene, camera

export class NameNotes extends Component {
  constructor(props){
    super(props)
  }
  componentDidUpdate(){
    this.renderScene()
  }

  componentDidMount() {
    this.renderScene()
  }

  renderScene = () => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    if(this.mount.childElementCount > 0){
      this.mount.removeChild(this.mount.firstChild)
    }
    this.mount.appendChild( renderer.domElement );
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    camera.position.z = this.props.cameraZ;
    camera.updateMatrix()
    renderer.render( scene, camera );
  }


  render() {
    return (
      <div ref={ref => (this.mount = ref)} />
    )
  }
}