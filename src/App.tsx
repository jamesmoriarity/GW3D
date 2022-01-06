import { enablePatches } from '@reduxjs/toolkit/node_modules/immer';
import React, { Component, useState } from 'react';
import './App.css';
import { selectState } from './features/grid/State/Selectors/GridStateSelectors';
import { NameNotes } from './features/nameNotes/Components/NameNotes/NameNotes';
import {gsap} from 'gsap'

export class App extends Component{
  state:any = {cameraZ:0}
  tl:GSAPTimeline = gsap.timeline()
  constructor(props:any){
    super(props)
    this.state.cameraZ = 4
  }
  cameraOut = (event:React.MouseEvent) => {
    this.tl = gsap.timeline()
    let obj = {nextCameraZ:this.state.cameraZ}

    let tween = gsap.to(obj, {nextCameraZ:this.state.cameraZ + 5, onUpdate:()=>{this.setState({cameraZ:obj.nextCameraZ})}});
  }
  cameraIn = (event:React.MouseEvent) => {
    this.tl = gsap.timeline()
    let obj = {nextCameraZ:this.state.cameraZ}
    let tween = gsap.to(obj, {nextCameraZ:this.state.cameraZ -5, onUpdate:()=>{this.setState({cameraZ:obj.nextCameraZ})}});
  }
  render(){
    return (
      <div className="App">
      <a onClick={(event:any)=>{
        this.cameraOut(event);
        }}>camera out</a>
        <a onClick={(event:any)=>{
          this.cameraIn(event);
          }}>camera in</a>
        <header className="App-header">
          <NameNotes cameraZ={this.state.cameraZ} />
        </header>
      </div>
    );
  }
}

export default App;
