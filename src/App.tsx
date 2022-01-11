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
    return  <DatGui data={this.props.data} onUpdate={this.props.handleUpdate}>
              <DatNumber path='lightIntensity' label='Light Intensity' min={0} max={10} step={0.25} />
              <DatNumber path='cubeCount' label='Number of Cubes' min={0} max={10} step={1} />
              <DatFolder title='Camera Position' closed={true}>
                <DatNumber path='cameraPos.x' label='Camera X' min={-40} max={40} step={4} />
                <DatNumber path='cameraPos.y' label='Camera Y' min={-40} max={40} step={4} />
                <DatNumber path='cameraPos.z' label='Camera Z' min={-40} max={40} step={4} />
              </DatFolder>
              <DatFolder title='Camera Look At' closed={true}>
                <DatNumber path='lookAtPos.x' label='X' min={-10} max={10} step={0.5} />
                <DatNumber path='lookAtPos.y' label='Y' min={-100} max={40} step={0.5} />
                <DatNumber path='lookAtPos.z' label='Z' min={-10} max={10} step={0.5} />
              </DatFolder>
            </DatGui>
  }
}
export class App extends Component{
  ref:any = null
  state:any = { 
    cameraPos:new Vector3(0.5, 0, 12),
    lookAtPos:new Vector3(0, 0, 0.3),
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
        lookAtPos:newData.lookAtPos
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
          guitarRotation={this.state.guitarRotation}
        />
      </div>
    );
  }
}
export default App;
