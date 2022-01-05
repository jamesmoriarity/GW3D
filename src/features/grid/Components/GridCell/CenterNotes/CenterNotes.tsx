import { useAppSelector } from "../../../../../app/hooks";
import { selectCellCenterNotes } from "../../../State/Selectors/CellSelectors";
import { IdOnlyProps } from "../../../Interface/IdOnlyProps";


export const baseClassName:string = "cell-center-values"
export function CenterNotes(props: IdOnlyProps) {
  const centers: number[] = useAppSelector((state) => selectCellCenterNotes(state, props.id))
  if(centers.length === 0) 
    return null
    
  const convertedCenters: string = centers.join(""); 
  return <text className={baseClassName}>{convertedCenters}</text>;
}
