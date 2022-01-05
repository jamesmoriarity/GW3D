import React, { useState } from "react";
import { CenterNotes } from "./CenterNotes/CenterNotes";
import { MouseTrap } from "./MouseTrap/MouseTrap";
import { PencilNotes } from "./PencilNotes/PencilNotes";
import { CellBackground } from "./CellBackground/CellBackground";
import { CellSDKValue } from "./CellSDKValue/CellSDKValue";
import { useAppSelector } from "../../../../app/hooks";
import { selectCellSDKValue } from "../../State/Selectors/CellSelectors";

export interface GridCellProps { index: number }
export function BaseGridCell(props: GridCellProps) {
  const sdkValue:number = useAppSelector((state) => {return selectCellSDKValue(state, props.index)})
  const hasOriginalValue:boolean = (sdkValue !== 0)
  const [isOriginal] = useState(hasOriginalValue)
  const hasValue:boolean = (sdkValue !== 0)
  return (
    <g>
      <CellBackground id={props.index} isOriginal={isOriginal} />
      { hasValue  && <CellSDKValue id={props.index} />}
      { !hasValue && <PencilNotes id={props.index} />}
      { !hasValue && <CenterNotes id={props.index} />}
      <MouseTrap id={props.index} />
    </g>
  )
}
export const GridCell = React.memo(BaseGridCell);
