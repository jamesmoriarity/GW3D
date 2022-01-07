import { enablePatches } from '@reduxjs/toolkit/node_modules/immer';
import React, { Component, useState } from 'react';
import './App.css';
import { selectState } from './features/grid/State/Selectors/GridStateSelectors';
import { NameNotes } from './features/nameNotes/Components/NameNotes/NameNotes';
import {gsap} from 'gsap'
import { Vector3 } from 'three';

export class App extends Component{
  
  state:any = {cameraY:0, lookAtPos:new Vector3()}
  constructor(props:any){
    super(props)
  }
  cameraOut = () => {
    const nextCameraY = this.state.cameraY
    let newLookAtPos = new Vector3(this.state.lookAtPos.x + 2, this.state.lookAtPos.y, this.state.lookAtPos.z)
    this.setState({cameraY:nextCameraY, lookAtPos:newLookAtPos})
  }
  cameraIn = () => {
    const nextCameraY = this.state.cameraY
    let newLookAtPos = new Vector3(this.state.lookAtPos.x - 2, this.state.lookAtPos.y, this.state.lookAtPos.z)
    this.setState({cameraY:nextCameraY, lookAtPos:newLookAtPos})
  }
  render(){
    return (
      <div className="App">
        camera: 
        <span onClick={(event:any)=>{this.cameraOut()}}>out </span>
        <span onClick={(event:any)=>{this.cameraIn()}}> in</span>
        <header className="App-header">
          <NameNotes cameraY={this.state.cameraY} lookAtPos={this.state.lookAtPos} />
        </header>
      </div>
    );
  }
}
export default App;
