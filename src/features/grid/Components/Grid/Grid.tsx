import { useAppSelector } from "../../../../app/hooks";
import { selectIsPuzzleValid} from "../../State/Selectors/GridStateSelectors";
import { GridCell } from "../GridCell/GridCell";
import { GridOutlines } from "../GridOutlines/GridOutlines";
import { InvalidGridShapes } from "../InvalidGridShapes/InvalidGridShapes";
import './grid.css';

export function GridCells(){
  function buildGridCells(): JSX.Element[] {
    let gridCells: JSX.Element[] = [];
    for (let i = 0; i < 81; i++) {
      gridCells.push(<GridCell index={i} key={i} />);
    }
    return gridCells;
  }
  return <g className="cells-group">{buildGridCells()}</g>
}

export function Grid() {
  const isValid:boolean = useAppSelector(selectIsPuzzleValid)
  const validityClassName:string = (isValid)?'valid':'invalid'
  return (
    <div className={"grid-container " + validityClassName}>
        <svg className="grid" viewBox="0 0 720 720" width="80%">
          <GridCells />
          <GridOutlines />
          <InvalidGridShapes />
        </svg>
    </div>
  );
}
