
import React, { Component, CSSProperties, createRef } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { setTimeout } from "timers";
import {gsap} from 'gsap'
import { Vector2, Vector3 } from "three";
import { pseudoRandomBytes } from "crypto";
import { SceneHelper} from './SceneHelper'

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
  lightColor = null
  gltf = null
  guitarRotation = null
  state = {gltf:null}
  cameraTween = null
  showGrid = false
  neck = null
  originalLookAtPosition = null
  ref = null
  indicatorRef = null
  sceneHelper = null
  constructor(props){
    super(props)
    this.lookAtPos = props.lookAtPos.clone()
    this.notePos = props.notePos.clone()
    this.targetLookAtPos = props.lookAtPos.clone()
    this.originalLookAtPosition = this.lookAtPos.clone()
    this.cameraPos = props.cameraPos
    this.lightIntensity = this.props.lightIntensity
    this.lightColor = this.props.lightColor
    this.cubeCount = this.props.cubeCount
    this.guitarRotation = this.props.guitarRotation
    this.indicatorRef = createRef()
    this.lights = []
    this.showGrid = this.props.showGrid
    this.sceneHelper = new SceneHelper(this)
    // props.notePos exists
  }
 
  componentDidUpdate(){
    if(!this.props.notePos.equals(this.notePos)){
      this.notePos = this.props.notePos.clone() // handle change in note position
      this.sceneHelper.updateAndRenderScene()
    }
    if(!this.props.cameraPos.equals(this.cameraPos) || !this.props.lookAtPos.equals(this.lookAtPos)){
      this.animateCamera(this.props.cameraPos.clone(), this.props.lookAtPos)
    }
    if(this.lightIntensity !== this.props.lightIntensity){
      this.animateLightIntensity(this.props.lightIntensity)
    }
    if(this.lightColor !== this.props.lightColor){
      this.lightColor = this.props.lightColor
      this.sceneHelper.updateAndRenderScene()
    }
    if(this.showGrid != this.props.showGrid){
      this.showGrid = this.props.showGrid
      this.sceneHelper.buildScene()
      this.sceneHelper.updateAndRenderScene()
    }
  }
  getProjectedPosition = () => {
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

  componentDidMount() {
    this.sceneHelper.buildScene()
    this.sceneHelper.loadModel()
  }
  animateLightIntensity = (targetIntensity) => {
    if(this.lightIntensityTween){
      this.lightIntensityTween.kill()
    }
    this.lightIntensityTween = gsap.to(
      this, 
      {
        lightIntensity:targetIntensity,
        onUpdate:()=>{
          this.sceneHelper.updateLighting()
          this.sceneHelper.renderScene()
        }
      }
    )
  }
  animateCamera = (targetPos, targetLookAtPos) => {
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
        this.sceneHelper.updateAndRenderScene()
      },
      onComplete:()=>{
        this.sceneHelper.updateAndRenderScene()
      }
    })
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