import { useAppSelector } from "../../../../../app/hooks";
import { selectCellSDKValue } from "../../../State/Selectors/CellSelectors";
import { IdOnlyProps } from "../../../Interfaces/IdOnlyProps";

export function CellSDKValue(props: IdOnlyProps) {
  const cellValue: number = useAppSelector((state) => selectCellSDKValue(state, props.id) );
  if(cellValue === 0) return null
  return <text className="cell-value">{cellValue}</text>
}