import { enablePatches } from '@reduxjs/toolkit/node_modules/immer';
import React, { Component, useState } from 'react';
import './App.css';
import { selectState } from './features/grid/State/Selectors/GridStateSelectors';
import { NameNotes } from './features/nameNotes/Components/NameNotes/NameNotes';
import {gsap} from 'gsap'
import { Vector3 } from 'three';

export class App extends Component{
  
  state:any = {lookAtPos:new Vector3(), cameraPos:new Vector3(0,2.75,7)}
  constructor(props:any){
    super(props)
  }
  cameraPan = (direction:number) => {
    let newCameraPos = this.state.cameraPos.clone()
    newCameraPos.x += (1.5  * direction)
    newCameraPos.y += (2.25  * direction)
    newCameraPos.z += (1.25  * direction)
    let newLookAtPos = this.state.lookAtPos.clone()
    newLookAtPos.x += direction
    this.setState({lookAtPos:newLookAtPos, cameraPos:newCameraPos})
  }
  render(){
    return (
      <div className="App">
        camera look: 
        <span onClick={(event:any)=>{this.cameraPan(-1)}}> left</span>  -  <span onClick={(event:any)=>{this.cameraPan(1)}}>right </span>
        <header className="App-header">
          <NameNotes cameraY={this.state.cameraPos.y} lookAtPos={this.state.lookAtPos} cameraPos={this.state.cameraPos} />
        </header>
      </div>
    );
  }
}
export default App;
