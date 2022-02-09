
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
          border: '1px solid red',
          display:'none'
      };
      const centerStyle = {
          position: 'absolute',
          left: this.state.centerCoordinates.x,
          top: this.state.centerCoordinates.y,
          border: '1px solid orange',
          display:'none'
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
    this.makeNewTimeline()
    // props.notePos exists
  }

  makeNewTimeline = () => {
    if(this.animationTimeline){
      this.animationTimeline.kill()
    }
    this.animationTimeline = gsap.timeline({
      autoRemoveChildren:true,
      callbackScope:this, 
      paused:true, 
      onComplete:this.onAnimationComplete, 
      smoothChildTiming:true
    })
  }
  onAnimationComplete = () =>{
    console.log('onAnimationComplete')
    console.log('number of children: ' + this.animationTimeline.getChildren().length)
    this.makeNewTimeline();
  }
  componentDidUpdate(){

    console.log('componentDidUpdate!!!')
    if(this.animationTimeline){
      this.animationTimeline.kill()
      this.makeNewTimeline()
    }
    let updateAndRender = false
    if(!this.props.notePos.equals(this.notePos)){
      this.notePos = this.props.notePos.clone() // handle change in note position
      updateAndRender = true
    }
    let cameraChange = (!this.props.cameraPos.equals(this.cameraPos) || !this.props.lookAtPos.equals(this.lookAtPos))
    if(cameraChange){ this.animateCamera(this.props.cameraPos.clone(), this.props.lookAtPos) }
    let lightingIntensityChange = (this.lightIntensity !== this.props.lightIntensity)
    if(lightingIntensityChange){this.animateLightIntensity(this.props.lightIntensity)}
    if(this.lightColor !== this.props.lightColor){
      this.lightColor = this.props.lightColor
      updateAndRender = true
    }
    if(this.showGrid !== this.props.showGrid){
      this.showGrid = this.props.showGrid
      this.sceneHelper.buildScene()
      updateAndRender = true
    }
    let hasAnimationsToRun = (this.animationTimeline.getChildren().length > 0)
    if(hasAnimationsToRun){
      this.animationTimeline.restart()
    }
    if(updateAndRender){
      this.sceneHelper.updateAndRenderScene()
    }
    // if the master timeline has something in it then run it and 
    // call an onComplete method that publishes updated 3D positions as 2D coordinate
    // 
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
    this.set2DCoordinates()
    this.sceneHelper.loadModel()
  }
  animateLightIntensity = (targetIntensity) => {
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
    this.animationTimeline.add(this.lightIntensityTween)
  }
  set2DCoordinates = () => {
    const [projectedCoordinates, centerCoordinates] = this.getProjectedPosition()
    this.indicatorRef.current.updateCoordinates(projectedCoordinates, centerCoordinates)
  }
  animateCamera = (targetPos, targetLookAtPos) => {
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
        this.set2DCoordinates()
      },
      onComplete:()=>{
        this.set2DCoordinates()
      }
    })
    this.animationTimeline.add(this.cameraTween)
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