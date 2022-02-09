import { Component} from 'react';
import './App.css';
import { NameNotes } from './features/nameNotes/Components/NameNotes/NameNotes';
import { Vector3 } from 'three';
import DatGui, { DatBoolean, DatColor, DatFolder, DatNumber} from 'react-dat-gui';
import { Tester } from './features/nameNotes/Components/Tester';

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
    const xlStep = 2.5
    return  <DatGui data={this.props.data} onUpdate={this.props.handleUpdate}>
              <DatFolder title='Lighting' closed={true}>
                <DatColor path='lightColor' label='Color'/>
                <DatNumber path='lightIntensity' label='Intensity' min={0} max={10} step={0.2} />
              </DatFolder>
              <DatFolder title='Camera Position' closed={true}>
                <DatNumber path='cameraPos.x' label='Camera X' min={-40} max={40} step={xlStep} />
                <DatNumber path='cameraPos.y' label='Camera Y' min={-40} max={40} step={xlStep} />
                <DatNumber path='cameraPos.z' label='Camera Z' min={-40} max={40} step={xlStep} />
              </DatFolder>
              <DatFolder title='Camera Look At' closed={true}>
                <DatNumber path='lookAtPos.x' label='X' min={-10} max={10} step={bigStep} />
                <DatNumber path='lookAtPos.y' label='Y' min={-100} max={40} step={bigStep} />
                <DatNumber path='lookAtPos.z' label='Z' min={-10} max={40} step={bigStep} />
              </DatFolder>
              <DatFolder title='Note Position' closed={true}>
                <DatNumber path='notePos.x' label='X' min={-10} max={10} step={smallStep} />
                <DatNumber path='notePos.y' label='Y' min={-100} max={40} step={smallStep} />
              </DatFolder>
              <DatBoolean path='showGrid' label='Show Grid'/>
            </DatGui>
  }
}
export class App extends Component{
  state:any = { 
    cameraPos:new Vector3(-2.5, 0, 2.5),
    lookAtPos:new Vector3(0, 0, 0.5),
    notePos:new Vector3(-0.05,0.23,0.32),
    guitarRotation:new Vector3(0,0,16),
    showGrid:false,
    lightIntensity:1.5,
    lightColor:'#C57917',
    cubeCount:1
  }
  constructor(props:any){
    super(props)
  }

  handleUpdate = (newData:any) => {
    this.setState(
      {
        lightIntensity:newData.lightIntensity,  
        cameraPos:newData.cameraPos,
        lookAtPos:newData.lookAtPos,
        notePos:newData.notePos,
        showGrid:newData.showGrid,
        lightColor:newData.lightColor
      })
  }
  render(){
    return (
      <div className="App">
        <Tester/>
        <DatSettings data={{...this.state}} handleUpdate={this.handleUpdate}/>
        <NameNotes
          showGrid={this.state.showGrid} 
          lightIntensity={this.state.lightIntensity} 
          lightColor={this.state.lightColor}
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
