import { Component, createRef, CSSProperties, useRef } from 'react';
import './App.css';
import { NameNotes } from './features/nameNotes/Components/NameNotes/NameNotes';
import { Vector2, Vector3 } from 'three';
import DatGui, { DatFolder, DatNumber} from 'react-dat-gui';
import { objectTraps } from '@reduxjs/toolkit/node_modules/immer/dist/internal';
import React from 'react';

export interface DatSettingsProps{
  data:any,
  handleUpdate:any
}
export class DatSettings extends Component{
  props!:DatSettingsProps
  constructor(props:DatSettingsProps){
    super(props)
  }
  render(){
    const smallStep = 0.01
    const bigStep = 0.5
    const xlStep = 4
    return  <DatGui data={this.props.data} onUpdate={this.props.handleUpdate}>
              <DatNumber path='lightIntensity' label='Light Intensity' min={0} max={10} step={bigStep} />
              <DatNumber path='cubeCount' label='Number of Cubes' min={0} max={10} step={1} />
              <DatFolder title='Camera Position' closed={true}>
                <DatNumber path='cameraPos.x' label='Camera X' min={-40} max={40} step={xlStep} />
                <DatNumber path='cameraPos.y' label='Camera Y' min={-40} max={40} step={xlStep} />
                <DatNumber path='cameraPos.z' label='Camera Z' min={-40} max={40} step={xlStep} />
              </DatFolder>
              <DatFolder title='Camera Look At' closed={true}>
                <DatNumber path='lookAtPos.x' label='X' min={-10} max={10} step={smallStep} />
                <DatNumber path='lookAtPos.y' label='Y' min={-100} max={40} step={smallStep} />
                <DatNumber path='lookAtPos.z' label='Z' min={-10} max={40} step={smallStep} />
              </DatFolder>
              <DatFolder title='Note Position' closed={true}>
                <DatNumber path='notePos.x' label='X' min={-10} max={10} step={smallStep} />
                <DatNumber path='notePos.y' label='Y' min={-100} max={40} step={smallStep} />
                <DatNumber path='notePos.z' label='Z' min={-10} max={10} step={smallStep} />
              </DatFolder>
            </DatGui>
  }
}
export class App extends Component{
  ref:any = null
  state:any = { 
    cameraPos:new Vector3(0, 0, 8),
    lookAtPos:new Vector3(.555, -.10, 0.35),
    notePos:new Vector3(0,0,0.28),
    guitarRotation:new Vector3(0,0,16),
    lightIntensity:1,
    cubeCount:1
  }
  constructor(props:any){
    super(props)
  }

  handleUpdate = (newData:any) => {
    this.setState(
      {
        lightIntensity:newData.lightIntensity, 
        cubeCount:newData.cubeCount, 
        cameraPos:newData.cameraPos,
        lookAtPos:newData.lookAtPos,
        notePos:newData.notePos
      })
  }
  render(){
    return (
      <div className="App">
        <DatSettings data={{...this.state}} handleUpdate={this.handleUpdate}/>
        <NameNotes
          cubeCount={this.state.cubeCount} 
          lightIntensity={this.state.lightIntensity} 
          lookAtPos={this.state.lookAtPos} 
          cameraPos={this.state.cameraPos}
          notePos={this.state.notePos}
          guitarRotation={this.state.guitarRotation}
        />
      </div>
    );
  }
}
export default App;
